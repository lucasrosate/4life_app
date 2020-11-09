import React, { useState } from 'react';

import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';


import '../styles/pages/LandingPage.css';


export function LandingPage() {

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
        <div className="landing-page">
            <div className="info-page">
                <h1>Saúde, Finanças e Organização. Você resolve tudo aqui</h1>
                <h2>Junte-se já ao 4life</h2>
            </div>

            <div id="loginForm" className="userform-page">
                <div id="loginForm">
                    {showLoginForm ?
                        <LoginForm
                            showRegistrationFormFunction={showRegistrationFormFunction}
                            messageFromRegistration={messageFromRegistration}
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
    )
}



export default LandingPage;