import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';


import style from '../styles/components/AccountForm.module.css';

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

    const handleSignin = () => {

    }
    

    return (

        <div className={`${style.container} ${style.logContainer}`} >
            <form action="" onSubmit={handleSubmit(handleSignin)}>
                <div className={`${style.userForm} ${style.loginFormContainer}`}>
                    <div className="">
                        <h1>Fazer login</h1>
                        <label htmlFor="username"><span>Nome de usuário</span></label>
                        <input className="input username" type="text" name="username" id="username" ref={register({ required: true, maxLength: 36 })} />
                    </div>

                    <div>
                        <label htmlFor="password"><span>Senha</span></label>
                        <input className="input password" type="password" name="password" id="password" ref={register({ required: true, maxLength: 24 })} />
                    </div>

                    <h4>ou <a onClick={handleShowRegistrationFormFunction}>crie uma conta.</a></h4>
                    <div className="success box-success">{props.messageFromRegistration}</div>
                    <div className={`error ${style.error}`}>{error}</div>
                    <button className={`btn ${style.btn}`} type="submit">Entrar</button>

                </div>
            </form>
        </div>

    )

}

export default LoginForm;