import React from 'react';

const CalculatorTitle = ({ title, isCalculatorVisible, setIsCalculatorVisible, color }) => {

    return (
        <div className="title">
            <div className="big-text bold title">{title}</div>
            {/* <div
                className={`title-circle ${color}-btn ${isCalculatorVisible === true ? 'rotated' : ''}`}
                onClick={() => setIsCalculatorVisible(!isCalculatorVisible)}>
                <img src="/img/godown.png" alt="godown" className="godown" />
            </div> */}
        </div>
    );
}

export default CalculatorTitle;
