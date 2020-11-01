import React from 'react';

import '../styles/components/AccountForm.css';

import { GoArrowLeft } from "react-icons/go";

class RegistrationForm extends React.Component <any, any> {
    
    handleShowLoginFormFunction = () => {
        this.props.showLoginFormFunction();
    }
    
    render () {
        return (
            <div className="container">
                <div className="login-form">
                    <div>
                        <label htmlFor="firstname"><span>Primeiro nome</span></label>
                        <input className="input firstname" type="text" name="firstname" id="firstname"/>
                    </div>

                    <div>
                        <label htmlFor="lastname"><span>Sobrenome</span></label>
                        <input className="input lastname" type="text" name="lastname" id="lastname"/>
                    </div>

                    <div>
                        <label htmlFor="username"><span>Nome de usuário</span></label>
                        <input className="input username" type="text" name="username" id="username"/>
                    </div>
                    
                    <div>
                        <label htmlFor="password"><span>Senha</span></label>
                        <input className="input password" type="text" name="password" id="password"/>
                    </div>

                    <div>
                        <label htmlFor="email"><span>E-mail</span></label>
                        <input className="input email" type="text" name="email" id="email"/>
                    </div>

                    <div>
                        <label htmlFor="state"><span>Estado</span></label>
                        <input className="input state" type="text" name="state" id="state"/>
                    </div>

                    <div>
                        <label htmlFor="phone"><span>Telefone</span></label>
                        <input className="input phone" type="text" name="phone" id="phone"/>
                    </div>
                    
                    <div className="buttons-registration">
                            <GoArrowLeft fill="white" size={24} className="arrowleft" onClick={this.handleShowLoginFormFunction}/>
                        <button className="btn login" type="button">Registrar</button>
                    </div>

                </div>
            </div>

        )
    }
}

export default RegistrationForm;