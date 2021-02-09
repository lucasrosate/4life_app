import React from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { loginAccount } from '../store/actions/userActions';

import style from '../styles/components/AccountForm.module.css';



interface Props {
    showRegistrationFormFunction: Function,
    userLogggedIn: Function,
    responseMessage: string
}

const LoginForm: React.FC<Props> = (props: Props) => {

    const { register, handleSubmit } = useForm<any>();
    const dispatch = useDispatch();

    const handleShowRegistrationFormFunction = (responseMessage: any) => props.showRegistrationFormFunction(responseMessage);

    const submitLogin =
        handleSubmit( async ({ username, password }) => {
            if(username && password) {
                await dispatch(loginAccount(username, password));

                if(localStorage.getItem("username") && localStorage.getItem("auth-token"))
                   props.userLogggedIn();
            }
        });

    return (

        <div className={`${style.container} ${style.logContainer}`} >
            <form action="" onSubmit={submitLogin}>
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

                    <h4>ou <span onClick={handleShowRegistrationFormFunction}>crie uma conta.</span></h4>
                    <div className={`error ${style.error}`}>{props.responseMessage}</div>
                    <button className={`btn ${style.btn}`} type="submit">Entrar</button>

                </div>
            </form>
        </div>

    )

}

export default LoginForm;