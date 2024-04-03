import React from 'react';

//import parse from 'html-react-parser';

const CustomInput = ({ label, value, onChange }) => {

    const formatNumberWithSpaces = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const handleChange = (event) => {
        // Удаляем пробелы из введенного числа перед его сохранением в состояние
        const newValue = event.target.value.replace(/\s/g, '');
        if(!newValue)
            onChange(parseInt(0));
        else
            onChange(parseInt(newValue));
    };

    return (
        <div className="block">
            <label className="big-text bold">{label}
            </label>
            <p>
                <input
                    type="text"
                    className="number-input big-text normal"
                    value={formatNumberWithSpaces(value)}
                    onChange={handleChange} />
            </p>
        </div>
    );
}

export default CustomInput;
