import React from 'react';
const RetentionOPV = ({ retentionOPV, setRetentionOPV, color, label }) => {

    return (
        <div className="opv-block">
            <div
                className="custom-radio"
                onClick={() => setRetentionOPV(!retentionOPV)}
            >
                <div className={`radio-circle ${retentionOPV === false ? `selected ${color}-brd` : ''}`}>
                </div>
            </div>
            <label className={`text ${label ? 'normal' : 'bold'}`}>
                {label ? label : 'Без удержания 10% ОПВ'}
            </label>
        </div>
    );
}

export default RetentionOPV;
