import React, { useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import style from '../styles/pages/LandingPage.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';
const { useState } = React;



interface Props {
    handleChangeIsLoggedIn: Function,
}

const LandingPage: React.FC<Props> = (props: Props) => {

    const [showPage, setShowPage] = useState(false); 
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [messageFromRegistration, setMessageFromRegistration] = useState('');

    const showLoginFormFunction = (responseMessage: any) => {
        setShowLoginForm(true);
        setShowRegistrationForm(false);
        setMessageFromRegistration(responseMessage);
    }

    const showRegistrationFormFunction = (responseMessage: any) => {
        setShowLoginForm(false);
        setShowRegistrationForm(true);
    }

    useEffect(()=> {
        setShowPage(true);
    }, []);

    return (
        <>
            <CSSTransition
                in={showPage}
                timeout={1000}
                classNames="fade"
                mountOnEnter
            >

                <div className={style.backgroundLandingPage}>

                    <div className={style.landingPage}>

                        <div className={style.landingContainer}>
                            <div className={style.infoPage}>
                                <h1>4life</h1>
                                <h2>Já pensou se você pudesse controlar todos os problemas do seu dia a dia na palma da sua mão? Pois é, agora é possível</h2>

                            </div>


                            <div className={style.userformPage}>
                                <div id="loginForm">
                                    <CSSTransition
                                        in={showLoginForm}
                                        timeout={1000}
                                        classNames="fade"
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <LoginForm
                                            showRegistrationFormFunction={showRegistrationFormFunction}
                                            messageFromRegistration={messageFromRegistration}
                                            handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
                                        />
                                    </CSSTransition>




                                </div>

                                <div id="registrationForm">
                                    <CSSTransition
                                        in={showRegistrationForm}
                                        timeout={1000}
                                        classNames="fade"
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <RegistrationForm
                                            showLoginFormFunction={showLoginFormFunction}
                                        />
                                    </CSSTransition>


                                </div>

                            </div >
                        </div>
                        <polygon className={style.TrianglePolygon} points="0,0 0,100 100,0" />
                    </div>


                </div>
            </CSSTransition>
        </>
    )
}


export default LandingPage;