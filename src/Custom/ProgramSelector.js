import React from 'react';
import { useTranslation } from 'react-i18next';

const ProgramSelector = ({ program, setProgram, programs }) => {

    const { t } = useTranslation();

    return (
        <div className="block">
            <label className="big-text bold">{t("programm")}
            </label>
            <p>
                <select className='number-input big-text normal'
                    value={program.code}
                    onChange={(e) => setProgram(e.target.value)}>
                    {programs.map((program) =>
                    (<option
                        key={program.code}
                        value={program.code}>
                        {t(program.code)}
                    </option>)
                    )
                    }
                </select>
            </p>
        </div>
    );
}

export default ProgramSelector;
