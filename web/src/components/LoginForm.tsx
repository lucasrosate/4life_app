import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { signinService } from '../services/AuthServices';


import AccountForm from '../styles/components/AccountForm.module.css';

const { useState } = React;


interface Props {
    showRegistrationFormFunction: Function,
    messageFromRegistration: string,
    handleChangeIsLoggedIn: Function,
}

const LoginForm: React.FC<Props> = (props: Props) => {

    const history = useHistory();
    const { register, handleSubmit } = useForm();
    var [error, setError] = useState('');

    const handleShowRegistrationFormFunction = (responseMessage: any) => props.showRegistrationFormFunction(responseMessage);

    const handleSignin = async (data: any) => {
        const success = await signinService(data);

        if (success) {
            props.handleChangeIsLoggedIn(true);
            history.push('/home');

        } else {
            setError("Login ou senha inválidos.")
        }

    }


    return (
        <div className={AccountForm.container}>
            <form action="" onSubmit={handleSubmit(handleSignin)}>
                <div className={`${AccountForm.userForm} ${AccountForm.loginFormContainer}`}>
                    <div className="">
                        <label htmlFor="username"><span>Nome de usuário</span></label>
                        <input className="input username" type="text" name="username" id="username" ref={register({ required: true, maxLength: 36 })} />
                    </div>

                    <div>
                        <label htmlFor="password"><span>Senha</span></label>
                        <input className="input password" type="password" name="password" id="password" ref={register({ required: true, maxLength: 24 })} />
                    </div>

                    <h4>ou <a onClick={handleShowRegistrationFormFunction}>crie uma conta.</a></h4>
                    <div className="success box-success">{props.messageFromRegistration}</div>
                    <div className={`error ${AccountForm.error}`}>{error}</div>
                    <button className={`btn ${AccountForm.btn}`} type="submit">Entrar</button>

                </div>
            </form>

        </div>

    )

}

export default LoginForm;