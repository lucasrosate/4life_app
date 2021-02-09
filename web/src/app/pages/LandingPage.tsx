import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';

import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';
import style from '../styles/pages/LandingPage.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import { StoreState } from '../../../interfaces';
const { useState } = React;



const LandingPage: React.FC<{userLoggedIn: Function}> = ({userLoggedIn}) => {

    const [showPage, setShowPage] = useState(false); 
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    var responseMessage = useSelector((state: StoreState) => state.userReducer.responseMessage);


    const showLoginFormFunction = () => {
        setShowLoginForm(true);
        setShowRegistrationForm(false);
    }

    const showRegistrationFormFunction = () => {
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
                                            userLogggedIn={userLoggedIn}
                                            showRegistrationFormFunction={showRegistrationFormFunction}
                                            responseMessage={responseMessage}
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
                                            responseMessage={responseMessage}
                                        />
                                    </CSSTransition>


                                </div>

                            </div >
                        </div>
                    </div>


                </div>
            </CSSTransition>
        </>
    )
}


export default LandingPage;