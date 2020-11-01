import React from 'react';

import '../styles/components/AccountForm.css';

class LoginForm extends React.Component <any, any> {

    handleShowRegistrationFormFunction = () => {
        this.props.showRegistrationFormFunction();
    }

    render() {
        return (
            <div className="container">
                <div className="login-form">
                    <div className="">
                        <label htmlFor="username"><span>Nome de usuário</span></label>
                        <input className="input username" type="text" name="username" id="username"/>
                    </div>
                    
                    <div>
                        <label htmlFor="password"><span>Senha</span></label>
                        <input className="input password" type="text" name="password" id="password"/>
                    </div>

                    <h4>ou <a onClick={this.handleShowRegistrationFormFunction}>crie uma conta.</a></h4>

                    <button className="btn login" type="button">Entrar</button>
                </div>
            </div>

        )
    }
}

export default LoginForm;