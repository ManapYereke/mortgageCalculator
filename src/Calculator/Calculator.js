import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './../style/style.css';
import MonthSlider from '../Custom/MonthSlider';
import CalculateButton from '../Custom/CalculateButton';
import CalculateResult from '../Custom/CalculateResult';
import CalculatorTitle from '../Custom/CalculatorTitle';
import CustomRadio from '../Custom/CustomRadio';
import CustomInput from '../Custom/CustomInput';
import Tooltip from '../Tooltip/Tooltip';
import Header from '../Components/Header/Header';
import Table from '../Components/Table/Table';
import Article from '../Components/Article/Article';

const Calculator = () => {
    const { t } = useTranslation();

    const [isCalculatorVisible, setIsCalculatorVisible] = useState(true);

    const [months, setMonths] = useState(12);
    const [percents, setPercents] = useState(0);
    const [paymentType, setPaymentType] = useState("annuity");
    const [result, setResult] = useState(null);
    const [housePrice, setHousePrice] = useState(0);
    const [initialFee, setInitialFee] = useState(0);

    const [creditSum, setCreditSum] = useState(0);
    const [monthlyRate, setMonthlyRate] = useState(0);
    const [monthlyDebtRepayment, setMonthlyDebtRepayment] = useState(0);

    const [rows, setRows] = useState([]);
    const [tfoot, setTfoot] = useState([]);
    const columns = [t('stage'), t('monthly payment'), t('main debt'), t('percently part'), t('remaning amount')];

    useEffect(()=>{
        setCreditSum(housePrice - initialFee);
        setMonthlyRate(percents / 12 / 100);
    }, [housePrice, initialFee, percents]);

    useEffect(()=>{
        setMonthlyDebtRepayment(Math.round(creditSum / months));
    }, [creditSum, months]);

    const calculate = () => {
        if(paymentType === "annuity") {
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
        return{
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
        while(balanceOwed > 0) {
            const percentagePart = Math.round(calculatePercentagePart(balanceOwed));
            if(monthlyDebtPayment > balanceOwed)
                monthlyDebtPayment = balanceOwed;
            const monthlyPayment = percentagePart + monthlyDebtPayment;
            sum += monthlyPayment;
            balanceOwed -= monthlyDebtPayment;
            rows.push([i, monthlyPayment.toLocaleString(), monthlyDebtPayment.toLocaleString(), percentagePart.toLocaleString(), balanceOwed.toLocaleString()]);
            i ++;
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
        while(balanceOwed > 0) {
            const percentagePart = Math.round(calculatePercentagePart(balanceOwed));
            if(monthlyPayment - percentagePart > balanceOwed)
                monthlyPayment = balanceOwed + percentagePart;
            const monthlyDebtPayment = monthlyPayment - percentagePart;
            balanceOwed -= monthlyDebtPayment;
            rows.push([i, monthlyPayment.toLocaleString(), monthlyDebtPayment.toLocaleString(), percentagePart.toLocaleString(), balanceOwed.toLocaleString()]);
            i ++;
        }
        setTfoot([t('total'), annuityPayment.overPayment.toLocaleString(), creditSum.toLocaleString(), (annuityPayment.overPayment - creditSum).toLocaleString(), '-'])
        setRows(rows);
    }

    const calculatePercentagePart = (balanceOwed) => {
        return balanceOwed * monthlyRate;
    }

    return (
        <div>
            <Header/>
            <div className="container-fluid">
                <Article article={t("article")} title={t('title')}/>
                {isCalculatorVisible === true && (
                    <div className='calculator'>
                        <div className="background container svbr"></div>
                        <div className="main container">
                            <div className="data">
                                <CustomInput
                                    label={t('price')}
                                    value={housePrice}
                                    onChange={setHousePrice}
                                />
                                <br/>
                                <CustomInput
                                    label={t('initialFee')}
                                    value={initialFee}
                                    onChange={setInitialFee}
                                />
                                <MonthSlider
                                    months={months}
                                    setMonths={setMonths}
                                    type={'svbr'}
                                    label={t('term')}
                                />
                                <br/>
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
                                <br/>
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
                )}
            {rows.length > 0 &&(
                <Table rows={rows} columns={columns} tfoot={tfoot}/>
            )}
            </div>
        </div>
    );
};

export default Calculator;
