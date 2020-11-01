import React from 'react';

import LoginForm from '../components/LoginForm';
import RegistrationForm from '../components/RegistrationForm';


import '../styles/pages/LandingPage.css';

interface Props {};

class LandingPage extends React.Component <Props, any> {

    constructor(props: Props) {
        super(props);
        this.state = {
            showLoginForm: true,
            showRegistrationForm: false,
        }
    }

    showLoginFormFunction = () => {
        this.setState((prevState: any) => ({
            showLoginForm: true,
            showRegistrationForm: false,
        }));
    }

    showRegistrationFormFunction = () => {
        this.setState((prevState: any) => ({
            showLoginForm: false,
            showRegistrationForm: true,
        }));
    }


    render() {
        return (
            <div className="landing-page">
                <div className="info-page">
                    <h1>Saúde, Finanças e Organização. Você resolve tudo aqui</h1>
                    <h2>Junte-se já ao 4life</h2>
                </div>

                <div id="loginForm" className="userform-page">
                    <div id="loginForm">
                        {this.state.showLoginForm ?
                        <LoginForm showRegistrationFormFunction={this.showRegistrationFormFunction} />
                        : null}
                    </div>

                    <div id="registrationForm">
                        {this.state.showRegistrationForm ? 
                        <RegistrationForm  showLoginFormFunction={this.showLoginFormFunction}/>
                        : null}
                    </div>
                    
                </div >
            </div>
            )
    }

    private newMethod() {
        return this;
    }
}

export default LandingPage;