import React from 'react';

const CustomRadio = ({ color, selectedValue, value, onClick, label }) => {

    return (
        <div
            className="custom-radio"
            onClick={() => onClick(value)}
        >
            <div className={`radio-circle ${selectedValue === value ? `selected ${color}-brd` : ''}`}>
            </div>
            <div className="radiolabel">
                {label ? label : value}
            </div>

        </div>
    );
}

export default CustomRadio;
