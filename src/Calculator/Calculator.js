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
    const columns = [t('stage'), t('monthly payment'), t('main debt'), t('percently part'), t('remaning amount')];

    useEffect(()=>{
        setCreditSum(housePrice - initialFee);
        setMonthlyRate(percents / 12 / 100);
    }, [housePrice, initialFee, percents]);

    useEffect(()=>{
        setMonthlyDebtRepayment(creditSum / months);
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
        const monthlyPayment = creditSum * monthlyRate * totalRate / (totalRate - 1);
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
            startMonthPayment: monthlyDebtRepayment + calculatePercentagePart(creditSum),
            endMonthPayment: monthlyDebtRepayment,
            overPayment: calculateDifferentiatedOverPayment()
        }
    }

    const calculateDifferentiatedOverPayment = () => {
        const rows = [];
        let sum = 0;
        let balanceOwed = creditSum;
        let i = 1;
        while(balanceOwed > 0) {
            const percentagePart = calculatePercentagePart(balanceOwed);
            const monthlyPayment = percentagePart + monthlyDebtRepayment;
            sum += monthlyPayment;
            balanceOwed -= monthlyDebtRepayment;
            rows.push([i, monthlyPayment, monthlyDebtRepayment, percentagePart, balanceOwed]);
        
            i ++;
        }
        setRows(rows);
        return sum;
    }

    const calculateAnnuityTable = () => {
        const rows = [];
        let balanceOwed = creditSum;
        let i = 1;
        const monthlyPayment = calculateAnnuityPayment().monthlyPayment;
        while(balanceOwed > 0) {
            const percentagePart = calculatePercentagePart(balanceOwed);
            const monthlyDebtPayment = monthlyPayment - percentagePart;
            balanceOwed -= monthlyDebtPayment;
            rows.push([i, monthlyPayment, monthlyDebtPayment, percentagePart, balanceOwed]);
            //setRows([...rows, [i, monthlyPayment, monthlyDebtPayment, percentagePart, balanceOwed]])
            i ++;
        }
        setRows(rows);
    }

    const calculatePercentagePart = (balanceOwed) => {
        return balanceOwed * monthlyRate;
    }

    return (
        <div>
            <Header/>
            <div>
                <CalculatorTitle
                    title={'Расчет ипотеки'}
                    isCalculatorVisible={isCalculatorVisible}
                    setIsCalculatorVisible={setIsCalculatorVisible}
                    color={'svbr'} />
                <br />
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
            </div>
            <Table rows={rows} columns={columns} />
        </div>
    );
};

export default Calculator;
