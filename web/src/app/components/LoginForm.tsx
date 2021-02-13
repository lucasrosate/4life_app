import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import { loginAccount, getUserData, getProfilePicture } from '../store/actions/userActions';

import style from '../styles/components/AccountForm.module.css';



interface Props {
    successForms: boolean,
    showRegistrationFormFunction: Function,
    userLoggedIn: Function,
    responseMessage: string
}

const LoginForm: React.FC<Props> = (props: Props) => {

    var [responseMessage, setResponseMessage] = useState<string>("");
    const { register, handleSubmit } = useForm<any>();
    const dispatch = useDispatch();

    const handleShowRegistrationFormFunction = (responseMessage: any) => props.showRegistrationFormFunction(responseMessage);

    const submitLogin =
        handleSubmit(async ({ username, password }) => {
            if (username && password) {
                await dispatch(loginAccount(username, password));
                if (localStorage.getItem("username") && localStorage.getItem("auth-token")) {
                    props.userLoggedIn();
                    dispatch(getUserData());
                    dispatch(getProfilePicture());
                }
            }
        });

    useEffect(() => props.successForms ?
        setResponseMessage("Conta criada conta com sucesso!") :
        setResponseMessage(""),
        [props.successForms]
    );

    useEffect(() => setResponseMessage(props.responseMessage)
        , [props.responseMessage]);


    return (
        <div className={`${style.container} ${style.logContainer}`} >
            <form action="" onSubmit={submitLogin}>
                <div className={`${style.userForm} ${style.loginFormContainer}`}>
                    <div className="">
                        <h1>Fazer login</h1>
                        <label htmlFor="username"><span>Nome de usuário</span></label>
                        <input className={`input ${style.input}`} type="text" name="username" id="username" ref={register({ required: true, maxLength: 36 })} />
                    </div>

                    <div>
                        <label htmlFor="password"><span>Senha</span></label>
                        <input className={`input ${style.input}`} type="password" name="password" id="password" ref={register({ required: true, maxLength: 24 })} />
                    </div>

                    <h4>ou <span onClick={handleShowRegistrationFormFunction} style={{ color: "#5698fa", cursor: "pointer" }}>
                        crie uma conta.
                        </span>
                    </h4>
                    <button className={`btn ${style.btn}`} type="submit">Entrar</button>
                    <div style={{
                        color: responseMessage.startsWith("Erro:")
                            ? "rgb(240, 61, 61)"
                            : "rgb(64, 216, 114)"
                    }}>
                        {responseMessage}
                    </div>
                </div>
            </form>
        </div>

    )

}

export default LoginForm;