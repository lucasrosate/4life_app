import React, { useEffect } from 'react';
import LoginForm from '../LoginForm';
import RegistrationForm from '../RegistrationForm';
import LandingPageStyle from '../../styles/components/pages/LandingPage.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';
const { useState } = React;



interface Props {
    handleChangeIsLoggedIn: Function,
}

const LandingPage: React.FC<Props> = (props: Props) => {

    const timeTransition = 1500;

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

                <div className={LandingPageStyle.backgroundLandingPage}>

                    <div className={LandingPageStyle.landingPage}>

                        <div className={LandingPageStyle.landingContainer}>
                            <div className={LandingPageStyle.infoPage}>
                                <h1>4life</h1>
                                <h2>Já pensou se você pudesse controlar todos os problemas do seu dia a dia na palma da sua mão? Pois é, agora é possível</h2>

                            </div>


                            <div className={LandingPageStyle.userformPage}>
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
                        <polygon className={LandingPageStyle.TrianglePolygon} points="0,0 0,100 100,0" />
                    </div>


                </div>
            </CSSTransition>
        </>
    )
}


export default LandingPage;