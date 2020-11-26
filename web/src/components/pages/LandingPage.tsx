import React from 'react';
import LoginForm from '../LoginForm';
import RegistrationForm from '../RegistrationForm';
import LandingPageStyle from '../../styles/components/pages/LandingPage.module.css';
import personLanding from '../../assets/images/personLanding.svg';
import Fade from '@material-ui/core/Fade';
const { useState } = React;


interface Props {
    handleChangeIsLoggedIn: Function,
}

const LandingPage: React.FC<Props> = (props: Props) => {

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

    return (
        <div className={LandingPageStyle.backgroundLandingPage}>
    
                <div className={LandingPageStyle.landingPage}>

                    <div className={LandingPageStyle.landingContainer}>
                        <div className={LandingPageStyle.infoPage}>
                            <h1>4life</h1>
                            <h2>Já pensou se você pudesse controlar todos os problemas do seu dia a dia na palma da sua mão? Pois é, agora é possível</h2>
                        </div>


                        <div className={LandingPageStyle.userformPage}>
                            <div id="loginForm">
  
                            {showLoginForm ?
                                    <LoginForm
                                        showRegistrationFormFunction={showRegistrationFormFunction}
                                        messageFromRegistration={messageFromRegistration}
                                        handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
                                    />
                                    : null}

                            </div>

                            <div id="registrationForm">
                                {showRegistrationForm ?
                                    <RegistrationForm
                                        showLoginFormFunction={showLoginFormFunction}
                                    />
                                    : null}
                            </div>

                        </div >
                    </div>
                    <polygon className={LandingPageStyle.TrianglePolygon} points="0,0 0,100 100,0" />
                </div>


        </div>

    )
}


export default LandingPage;