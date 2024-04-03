import React from 'react';
import { useTranslation } from 'react-i18next';

const CalculateResult = ({ result}) => {

    const { t } = useTranslation();

    return (
        <div className="result">
            <div className="big-text">
                <div className="bold">
                    {t("result")}
                </div>
                <br />
                {result !== null &&  (
                    <div>
                        <div>
                            <div className="semibold">{t("credit sum")}</div>
                            <div className="normal">{result.creditSum.toLocaleString()} {t("tenge")}</div>
                            <br/>
                            <div className="semibold">{t("monthly payment")}:</div>
                            <div className="normal">{result.monthlyPayment ? result.monthlyPayment.toLocaleString() : `от ${result.startMonthPayment.toLocaleString()} до ${result.endMonthPayment.toLocaleString()}`} {t("tenge")}</div>
                            <br />
                            <div className="semibold">{t("to return")}</div>
                            <div className="normal">{result.overPayment.toLocaleString()} {t("tenge")}</div>
                            <br/>
                            <div className="bold">{t("over payment")}<br />{(result.overPayment - result.creditSum).toLocaleString()} {t("tenge")}</div>
                        </div>
                    </div>
                )}
                <br />
                <div className="normal warning">{t("warning")}</div>
            </div>
        </div>
    );
}

export default CalculateResult;
