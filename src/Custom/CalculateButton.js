import React from 'react';
import { useTranslation } from 'react-i18next';

const CalculateButton = ({ calculate, text, color }) => {
    const { t } = useTranslation();

    return (
        <div className="btn-block">
            <button
                className={`calculate text bold ${color}-btn`}
                onClick={calculate}
            >
                {`${t("calculate")} ${text ? text : ''}`}
            </button>
        </div>
    );
}

export default CalculateButton;
