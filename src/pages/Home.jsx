import React, { useState, useEffect } from 'react'
import '../App.scss'
import { summer } from '../helpers/helper'

import callIcon from '../assets/images/call-icon.svg'
import menuIcon from '../assets/images/menu.svg'
import mentor from '../assets/images/mentor.png'
import arrowDown from '../assets/images/arrow-down.svg'
import Sidebar from '../components/Sidebar'

import ConsultationButton from '../components/ConsultationButton'


const Home = () => {

    const [sidebarActive, setSidebarActive] = useState(false);
    const [charCode, setCarCode] = useState(0);
    const [sumOfDate, setSumOfDate] = useState(0);

    const setSumOfDateFnc = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const sum = summer(year) + summer(month) + summer(day);

        setSumOfDate(sum);

    }

    const sidebarOpenHandler = () => {
        !sidebarActive && setSidebarActive(true)
    }

    useEffect(() => {
        (async function () {
            const data = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
            const exchangeRates = await data.json();

            const valutes = Object.entries(exchangeRates.Valute);

            for (const valute of valutes) {
                valute[0] == 'GBP' && setCarCode(valute[1].Value)
            }
            setSumOfDateFnc();
        })()
    }, [])

    return (
        <div className="home">
            <div
                className="container"
                style={{ filter: sidebarActive && 'blur(5px)' }}
            >
                <span className="grid-center-left-lines"></span>
                <span className="grid-center-right-lines"></span>
                <header className="header">
                    <div tabIndex={0} className="image-wrapper">
                        <div className="horizontal-line"></div>
                        <span>ALEX. SHEVTSOV</span>
                        <div className="horizontal-line"></div>
                    </div>
                    <nav className="navigation-menu">
                        <ul className="nav-list">
                            <li className="list-item"><a href="#">Обо мне</a></li>
                            <li className="list-item"><a href="#">Наставничество</a></li>
                            <li className="list-item"><a href="#">Мероприятия</a></li>
                            <li className="list-item"><a href="#">Кейсы</a></li>
                            <li className="list-item"><a href="#">Отзывы</a></li>
                        </ul>
                    </nav>
                    <div className="burger-menu">
                        <img src={menuIcon} alt="navbar" />
                    </div>
                    <div className="call-wrapper">
                        <div className="call-icon">
                            <img src={callIcon} alt="call" />
                        </div>
                        8-345-123-34-45
                    </div>
                </header>
                <main className="main">
                    <h1 className="headline">
                        Создаю условия
                        <br />
                        для вашего успеха
                    </h1>
                    <section className="description">
                        <div className="horizontal-line"></div>
                        <p>
                            Когда ваше время и энергия лучше сфокусированы, стремление к новым возможностям становится реальностью, ваш успех зависит от ваших действий
                        </p>
                    </section>
                    <div className="mentor-image">
                        <img src={mentor} alt="" />
                    </div>

                    <section className="consultation-buttons">
                        <ConsultationButton
                            className="consultation-button signup-consultation"
                            text={'Записаться на консультацию'}
                            buttonClickHandler={sidebarOpenHandler}
                        />
                        <ConsultationButton
                            className="consultation-button free-consultation"
                            text={'Бесплатная консультация'}
                            buttonClickHandler={sidebarOpenHandler}
                        />
                    </section>
                    <section className="statistics">
                        <div className="statistic-item">
                            {/* <div className="vertical-line"></div> */}
                            <div className="count">{sumOfDate}</div>
                            <div className="item-description">техник для достижения целей</div>
                        </div>
                        <div className="statistic-item">
                            {/* <div className="vertical-line"></div> */}
                            <div className="count">{Math.round(charCode)}</div>
                            <div className="item-description">увеличение личной продуктивности</div>
                        </div>
                    </section>
                </main>
            </div>
            <Sidebar
                sidebarActive={sidebarActive}
                setSidebarActive={setSidebarActive}
            />

        </div>
    )
}

export default Home