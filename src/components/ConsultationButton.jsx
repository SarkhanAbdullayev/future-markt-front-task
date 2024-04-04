import React from 'react'
import '../assets/styles/consultationButton.scss'

import arrowDown from '../assets/images/arrow-down.svg'

const ConsultationButton = ({ className, text, buttonClickHandler }) => {
    return (
        <div tabIndex={0} className={className} onClick={buttonClickHandler}>
            <div className="button-text">{text}</div>
            <div className="button-img-wrapper">
                <img loading="lazy" src={arrowDown} />
            </div>
        </div>
    )
}

export default ConsultationButton