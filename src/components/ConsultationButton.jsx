import React from 'react'
import '../assets/styles/consultationButton.scss'

import arrowDown from '../assets/images/arrow-down.svg'

const ConsultationButton = ({ className, desktopText, mobileText, buttonClickHandler }) => {
    return (
        <div tabIndex={0} className={className} onClick={buttonClickHandler}>
            <div className="button-text desktop-text">{desktopText}</div>
            <div className="button-text mobile-text">{mobileText}</div>
            <div className="button-img-wrapper">
                <img loading="lazy" src={arrowDown} alt='coslt-button'/>
            </div>
        </div>
    )
}

export default ConsultationButton