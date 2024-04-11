import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const MonthSlider = ({ label, months, 
    setMonths, type, warning }) => {
    const { t } = useTranslation();
    const rangeTrackRef = useRef(null);
    const rangeThumbRef = useRef(null);
    const maxMonths = 360;
    const minMonths = 12;

    const handleThumbClick = (event) => {
        const moveEvent = 'ontouchmove' in window ? 'touchmove' : 'mousemove';
        const endEvent = 'ontouchend' in window ? 'touchend' : 'mouseup';
        let isDragging = false;
        event.preventDefault();
        isDragging = true;
        rangeThumbRef.current.style.transition = 'none';
        const initialX = event.touches ? event.touches[0].clientX : event.clientX;
        let thumbLeft = rangeThumbRef.current.style.left;
        if (!parseFloat(thumbLeft))
            thumbLeft = 0;
        else
            thumbLeft = parseFloat(thumbLeft);
        const handleThumbMove = (event) => {
            if (!isDragging) return;
            const newX = event.touches ? event.touches[0].clientX : event.clientX;
            const offsetX = newX - initialX;
            const newLeft = thumbLeft + offsetX;
            if (newLeft >= 0 && newLeft <= rangeThumbRef.current.parentElement.offsetWidth - 20) {
                rangeThumbRef.current.style.left = newLeft + 'px';
                rangeTrackRef.current.style.width = newLeft + 3 + 'px';
                const pxValue = (maxMonths - minMonths) / parseFloat(rangeThumbRef.current.parentElement.offsetWidth - 20);
                const salary = Math.round(pxValue * newLeft) + minMonths;
                setMonths(salary);
            }
        };

        const handleThumbUp = () => {
            isDragging = false;
            rangeThumbRef.current.style.transition = '';
            document.removeEventListener(moveEvent, handleThumbMove);
            document.removeEventListener(endEvent, handleThumbUp);
        };

        document.addEventListener(moveEvent, handleThumbMove);
        document.addEventListener(endEvent, handleThumbUp);
    };

    return (
        <div className="salary-block">
            <label className='big-text bold'>
                {label}
            </label>
            <p className='text bold underlined'>{months.toLocaleString()} {t("month")}</p>
            <div className="range-container">
                <div className={`range-track ${type}`} id="range-track" ref={rangeTrackRef}></div>
                <div
                    id="range-thumb"
                    className={`range-thumb ${type}-brd`}
                    ref={rangeThumbRef}
                    onMouseDown={handleThumbClick}
                    onTouchStart={handleThumbClick}
                ></div>
            </div>
            <div className="slahes">
                <div className="first">|</div>
                <div className="second">|</div>
                <div className="third">|</div>
                <div className="fourth">|</div>
                <div className="fivth">|</div>
            </div>
            <div className="small-text normal labels-tg">
                <div className="label-tg">5 {t("year")}</div>
                <div className="label-tg">10 {t("year")}</div>
                <div className="label-tg">15 {t("year")}</div>
                <div className="label-tg">20 {t("year")}</div>
                <div className="label-tg">25 {t("year")}</div>
            </div>
            <div className="error">
                {warning ? warning : <br/>}
            </div>
        </div>
    );
}

export default MonthSlider;
