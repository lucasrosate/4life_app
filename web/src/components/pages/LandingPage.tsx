import React from 'react';
import LoginForm from '../LoginForm';
import RegistrationForm from '../RegistrationForm';
import LandingPageStyle from '../../styles/components/pages/LandingPage.module.css';

const {useState} = React;


interface Props {
    handleChangeIsLoggedIn: Function,
}

const LandingPage: React.FC <Props> = (props: Props) => {

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
        <div className={LandingPageStyle.landingPage}>
            <div className={LandingPageStyle.landingContainer}>
                <div className={LandingPageStyle.infoPage}>
                    <h1>Saúde, Finanças e Organização. Você resolve tudo aqui</h1>
                    <h2>Junte-se já ao 4life</h2>
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

        </div>
    )
}


export default LandingPage;