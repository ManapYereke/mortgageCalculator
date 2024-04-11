import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './../style/style.css';
import MonthSlider from '../Custom/MonthSlider';
import CalculateButton from '../Custom/CalculateButton';
import CalculateResult from '../Custom/CalculateResult';
import ProgramSelector from '../Custom/ProgramSelector';
//import CalculatorTitle from '../Custom/CalculatorTitle';
import CustomRadio from '../Custom/CustomRadio';
import CustomInput from '../Custom/CustomInput';
//import Tooltip from '../Tooltip/Tooltip';
import Header from '../Components/Header/Header';
import Table from '../Components/Table/Table';
import Article from '../Components/Article/Article';

const Calculator = () => {
    const { t } = useTranslation();

    const [months, setMonths] = useState(12);
    const [percents, setPercents] = useState(0);
    const [paymentType, setPaymentType] = useState("annuity");
    const [result, setResult] = useState(null);
    const [housePrice, setHousePrice] = useState(0);
    const [initialFee, setInitialFee] = useState(0);
    const [programm, setProgram] = useState("without_programm");

    const [minInitialFeePercent, setMinInitialFeePercent] = useState(0);
    const [minMonth, setMinMonth] = useState(12);
    const [maxMonth, setMaxMonth] = useState(360);
    const [maxCreditSum, setMaxCreditSum] = useState(2000000000);

    const [initialFeeWarning, setInitialFeeWarning] = useState('');
    const [monthWarning, setMonthWarning] = useState('');

    const [creditSum, setCreditSum] = useState(0);
    const [monthlyRate, setMonthlyRate] = useState(0);
    const [monthlyDebtRepayment, setMonthlyDebtRepayment] = useState(0);

    const [rows, setRows] = useState([]);
    const [tfoot, setTfoot] = useState([]);
    const columns = [t('stage'), t('monthly payment'), t('main debt'), t('percently part'), t('remaning amount')];

    const programs = [
        {
            code: "without_programm",
            percents: 0,
            minInitialFee: 0,
            minMonth: 12,
            maxMonth: 360,
            maxCreditSum: 2000000000
        },
        {
            code: "jastar",
            percents: 5,
            minInitialFee: 10,
            minMonth: 228,
            maxMonth: 300,
            maxCreditSum: 20000000
        },
        {
            code: "jas_otbasy",
            percents: 6,
            minInitialFee: 50,
            minMonth: 72,
            maxMonth: 108,
            maxCreditSum: 100000000
        },
        {
            code: "otau",
            percents: 9,
            minInitialFee: 20,
            minMonth: 0,
            maxMonth: 228,
            maxCreditSum: 30000000
        }
    ]

    const onProgramChange = () => {
        const program = programs.filter(p => p.code === programm)[0];
        setPercents(program.percents);
        setMinInitialFeePercent(program.minInitialFee);
        setMinMonth(program.minMonth);
        setMaxMonth(program.maxMonth);
        setMaxCreditSum(program.maxCreditSum);
    }

    useEffect(() => {
        setCreditSum(housePrice - initialFee);
        setMonthlyRate(percents / 12 / 100);
        if(housePrice - initialFee > maxCreditSum){
            setInitialFeeWarning(t('credit_warning {{programm}} {{maxCreditSum}}', {programm: t(programm), maxCreditSum}));
        }
        else if(initialFee / housePrice * 100 < minInitialFeePercent){
            setInitialFeeWarning(t('percent_warning {{programm}} {{minInitialFeePercent}}', {programm: t(programm), minInitialFeePercent}));
        }
        else
            setInitialFeeWarning('');
        // eslint-disable-next-line
    }, [housePrice, initialFee, percents, maxCreditSum, minInitialFeePercent]);

    useEffect(() => {
        setMonthlyDebtRepayment(Math.round(creditSum / months));
        if(months > maxMonth || months < minMonth)
            setMonthWarning(t('month_warning {{programm}} {{minMonth}} {{maxMonth}}', {programm: t(programm), minMonth, maxMonth}))
        else
            setMonthWarning('');
        // eslint-disable-next-line
    }, [creditSum, months, maxMonth, minMonth]);

    useEffect(() => {
        onProgramChange();
        // eslint-disable-next-line
    }, [programm]);

    const calculate = () => {
        if (paymentType === "annuity") {
            setResult(calculateAnnuityPayment());
            calculateAnnuityTable();
        }
        else
            setResult(calculateDifferentiatedPayment());
    }

    const calculateAnnuityPayment = () => {
        const totalRate = Math.pow(1 + monthlyRate, months);
        const monthlyPayment = Math.round(creditSum * monthlyRate * totalRate / (totalRate - 1));
        const overPayment = monthlyPayment * months;
        return {
            creditSum,
            monthlyPayment,
            overPayment
        }
    }

    const calculateDifferentiatedPayment = () => {
        return {
            creditSum,
            startMonthPayment: Math.round(monthlyDebtRepayment + calculatePercentagePart(creditSum)),
            endMonthPayment: Math.round(monthlyDebtRepayment),
            overPayment: calculateDifferentiatedOverPayment()
        }
    }

    const calculateDifferentiatedOverPayment = () => {
        const rows = [];
        let sum = 0;
        let balanceOwed = creditSum;
        let i = 1;
        let monthlyDebtPayment = monthlyDebtRepayment;
        while (balanceOwed > 0) {
            const percentagePart = Math.round(calculatePercentagePart(balanceOwed));
            if (monthlyDebtPayment > balanceOwed)
                monthlyDebtPayment = balanceOwed;
            const monthlyPayment = percentagePart + monthlyDebtPayment;
            sum += monthlyPayment;
            balanceOwed -= monthlyDebtPayment;
            rows.push([i, monthlyPayment.toLocaleString(), monthlyDebtPayment.toLocaleString(), percentagePart.toLocaleString(), balanceOwed.toLocaleString()]);
            i++;
        }
        setTfoot([t('total'), sum.toLocaleString(), creditSum.toLocaleString(), (sum - creditSum).toLocaleString(), '-'])
        setRows(rows);
        return sum;
    }

    const calculateAnnuityTable = () => {
        const rows = [];
        let balanceOwed = creditSum;
        let i = 1;
        const annuityPayment = calculateAnnuityPayment();
        let monthlyPayment = annuityPayment.monthlyPayment;
        while (balanceOwed > 0) {
            const percentagePart = Math.round(calculatePercentagePart(balanceOwed));
            if (monthlyPayment - percentagePart > balanceOwed)
                monthlyPayment = balanceOwed + percentagePart;
            const monthlyDebtPayment = monthlyPayment - percentagePart;
            balanceOwed -= monthlyDebtPayment;
            rows.push([i, monthlyPayment.toLocaleString(), monthlyDebtPayment.toLocaleString(), percentagePart.toLocaleString(), balanceOwed.toLocaleString()]);
            i++;
        }
        setTfoot([t('total'), annuityPayment.overPayment.toLocaleString(), creditSum.toLocaleString(), (annuityPayment.overPayment - creditSum).toLocaleString(), '-'])
        setRows(rows);
    }

    const calculatePercentagePart = (balanceOwed) => {
        return balanceOwed * monthlyRate;
    }

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <Article article={t("article")} title={t('title')} />
                <div className='calculator'>
                    <div className="background container svbr"></div>
                    <div className="main container">
                        <div className="data">
                            <CustomInput
                                label={t('price')}
                                value={housePrice}
                                onChange={setHousePrice}
                            />
                            <ProgramSelector
                                program={programm}
                                setProgram={setProgram}
                                programs={programs}
                            />
                            <CustomInput
                                label={t('initialFee')}
                                value={initialFee}
                                onChange={setInitialFee}
                                warning={initialFeeWarning}
                            />
                            <MonthSlider
                                months={months}
                                setMonths={setMonths}
                                type={'svbr'}
                                label={t('term')}
                                warning={monthWarning}
                            />
                            <div className="paymentType-block">
                                <label className="big-text bold">{t("payment type")}
                                </label>
                                <p className="text bold underlined">{t(paymentType)}</p>
                                <div className="small-text normal days-radio">
                                    <CustomRadio
                                        color="svbr"
                                        value={"annuity"}
                                        selectedValue={paymentType}
                                        label={t("annuity")}
                                        onClick={setPaymentType}
                                    />
                                    <div className="bufer"></div>
                                    <CustomRadio
                                        color="svbr"
                                        value={"differentiated"}
                                        selectedValue={paymentType}
                                        label={t("differentiated")}
                                        onClick={setPaymentType}
                                    />
                                </div>
                            </div>
                            <br/>
                            <CustomInput
                                label={t('interest rate')}
                                value={percents}
                                onChange={setPercents}
                            />
                            <CalculateButton
                                calculate={calculate}
                                color={'svbr'}
                            />
                        </div>
                        <CalculateResult
                            result={result}
                        />
                    </div>
                </div>
                {rows.length > 0 && (
                    <Table rows={rows} columns={columns} tfoot={tfoot} />
                )}
            </div>
        </div>
    );
};

export default Calculator;
