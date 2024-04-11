import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import '../assets/styles/sidebar.scss'

import checked from '../assets/images/checked.svg'
import ConsultationButton from './ConsultationButton'

const Sidebar = ({ sidebarActive, setSidebarActive }) => {

    const [applicationSubmitted, setApplicationSubmitted] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const sidebarRef = useRef();
    const formRef = useRef();

    const sidebarCloserHandler = (e) => {
        !sidebarRef.current.contains(e.target) && setSidebarActive(false);
    }

    function onSubmit(data) {
        console.log(data, 'data');
        console.log(errors, 'errors');
        localStorage.setItem('data', JSON.stringify(data));
        setApplicationSubmitted(true);
    }

    const storageData = JSON.parse(localStorage.getItem('data'));

    const FormContent = () => (
        <div className="form-content">
            <h2 className='headline'>Закажите <br /> обратный звонок</h2>
            <form
                className='callback-form'
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    defaultValue={storageData?.name}
                    className='input'
                    type="text"
                    placeholder="ИМЯ"
                    {...register("name", { required: "Please enter your name" })}
                />
                {errors.name && <p className='error-message'>{errors.name.message}</p>}
                <input
                    defaultValue={storageData?.phone}
                    className='input phone-input'
                    type="number"
                    placeholder="ТЕЛЕФОН"
                    {...register("phone", { required: "Please enter your phone number" })}
                />
                {errors.phone && <p className='error-message'>{errors.phone.message}</p>}
                <div className="check-box">
                    <label htmlFor="check">Согласен на сохранение и обработку персональных данных</label>
                    <input
                        defaultChecked={storageData?.check}
                        type="checkbox"
                        id="check"
                        {...register("check", { required: "Сonsent to the storage and processing of your data" })}
                    />
                    <div className="checked-wrapper" >
                        <img className='checked-icon' src={checked} alt="checked" />
                    </div>
                </div>
                {errors.check && <p className='error-message'>{errors.check.message}</p>}
                <button
                    className='inputWrapper'
                    type="submit"
                >
                    <ConsultationButton
                        className='consultation-button free-consultation'
                        desktopText={'Заказать обратный звонок'}
                        mobileText={'Заказать обратный звонок'}
                        buttonClickHandler={null}
                    />
                </button>
            </form>
        </div>
    )

    const SubmittedContent = () => (
        <div className="submited-content">
            <h2 className='headline'>Спасибо <br/> за заявку</h2>
            <p className='submited-text'>Я обязательно свяжусь с вами в ближайшее время.</p>
        </div>
    )


    return (
        <div
            className="sidebar-wrapper"
            style={{ transform: sidebarActive ? 'translateX(0)' : 'translateX(-100%)' }}
            onClick={sidebarCloserHandler}
        >
            <div className='sidebar' ref={sidebarRef} style={{ boxShadow: sidebarActive ? '1px 1px 1px 9999px rgba(15, 29, 69, 0.6)' : 'none' }}>
                <div className="close-icon" onClick={() => setSidebarActive(false)}>
                    <svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="1.70711" y1="1.69853" x2="32.1127" y2="32.1041" stroke="white" strokeOpacity="0.8" strokeWidth="2" />
                        <line x1="1.29289" y1="31.6984" x2="31.6985" y2="1.29282" stroke="white" strokeOpacity="0.8" strokeWidth="2" />
                    </svg>
                </div>
                {!applicationSubmitted ? <FormContent /> : <SubmittedContent />}
            </div>
        </div>

    )
}

export default Sidebar