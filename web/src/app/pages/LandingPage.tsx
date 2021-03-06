import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from '../components/Authentication/LoginForm';
import RegistrationForm from '../components/Authentication/RegistrationForm';
import style from '../styles/pages/LandingPage.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import { StoreState } from '../../../interfaces';

const { useState } = React;



const LandingPage: React.FC<{ userLoggedIn: Function }> = ({ userLoggedIn }) => {

    const dispatch = useDispatch();

    const [showPage, setShowPage] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);

    var responseMessage = useSelector((state: StoreState) => state.userReducer.responseMessage);
    var successForms = useSelector((state: StoreState) => state.userReducer.successForms);

    const delay = 200;
    const fadeClassName = "fade-form"

    const showLoginFormFunction = () => {
        setShowRegistrationForm(false);
        setTimeout(() => { setShowLoginForm(true) }, delay + 50);

    }

    const showRegistrationFormFunction = () => {
        setShowLoginForm(false);
        setTimeout(() => { setShowRegistrationForm(true) }, delay + 50);
    }


    useEffect(() => {
        setShowPage(true);
    }, []);

    return (
        <>
            <CSSTransition
                in={showPage}
                timeout={600}
                classNames="fade"
                mountOnEnter
            >
                <div className={style.backgroundLandingPage}>

                    <div className={style.landingPage}>

                        <div className={style.landingContainer}>
                            <div className={style.infoPage}>
                                <h1>4life</h1>
                                <h2>Uma solução para os problemas do seu dia a dia. Para você se organizar quanto a saúde, finaceiramente e ainda lembrar sobre seus entretenimentos</h2>

                            </div>


                            <div className={style.userformPage}>
                                <div id="loginForm">
                                    <CSSTransition
                                        in={showLoginForm}
                                        timeout={delay}
                                        classNames={fadeClassName}
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <LoginForm
                                            successForms={successForms}
                                            userLoggedIn={userLoggedIn}
                                            showRegistrationFormFunction={showRegistrationFormFunction}
                                            responseMessage={responseMessage}
                                        />
                                    </CSSTransition>




                                </div>

                                <div id="registrationForm">
                                    <CSSTransition
                                        in={showRegistrationForm}
                                        timeout={delay}
                                        classNames={fadeClassName}
                                        mountOnEnter
                                        unmountOnExit
                                    >
                                        <RegistrationForm
                                            successForms={successForms}
                                            showLoginFormFunction={showLoginFormFunction}
                                            responseMessage={responseMessage}
                                        />
                                    </CSSTransition>


                                </div>

                            </div >
                        </div>
                    </div>
                    <div>
                        Video by Javier Lemus.
                    </div>

                </div>
            </CSSTransition>
        </>
    )
}


export default LandingPage;