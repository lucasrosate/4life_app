import React, { useEffect, useLayoutEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginAccount, getUserData, getProfilePicture, resetFormStatus, registrationSuccess } from '../../store/actions/userActions';

import style from '../../styles/components/AccountForm.module.css';

interface Props {
    successForms: boolean,
    showRegistrationFormFunction: Function,
    userLoggedIn: Function,
    responseMessage: string
    toggleWindow: Function
}




const UserLogin: React.FC<Props> = (props: Props) => {

    
    const handleShowRegistrationFormFunction = (responseMessage: any) => props.showRegistrationFormFunction(responseMessage);

    const { register, handleSubmit } = useForm<any>();
    var [responseMessage, setResponseMessage] = useState<string>("");
    const dispatch = useDispatch();


    const submitLogin =
        handleSubmit(async ({ username, password }) => {
            if (username && password) {
                await dispatch(loginAccount(username, password));
                
                if (localStorage.getItem("username") && localStorage.getItem("auth-token")) {
                    props.userLoggedIn();
                    dispatch(getUserData());
                }
            }

            setResponseMessage("");
        });


        useEffect(()=> {
            console.log(props.successForms);
            if(props.successForms) {
                dispatch(resetFormStatus());
                dispatch(registrationSuccess());
            }
        } , []);

    return (
        <form action="" onSubmit={submitLogin}>
            <div className={`${style.userForm} ${style.loginFormContainer}`}>
                <div className="">
                    <h1>Fazer login</h1>
                    <h4>Novo usuário? <span onClick={handleShowRegistrationFormFunction} style={{ color: "#5698fa", cursor: "pointer" }}>
                        Crie uma conta.</span>
                    </h4>
                    <label htmlFor="username"><span>Nome de usuário</span></label>
                    <input className={`input ${style.input}`} type="text" name="username" id="username" ref={register({ required: true, maxLength: 36 })} />
                </div>

                <div>
                    <label htmlFor="password"><span>Senha</span></label>
                    <input className={`input ${style.input}`} type="password" name="password" id="password" ref={register({ required: true, maxLength: 24 })} />
                </div>

                <h4>
                    <span onClick={() => props.toggleWindow()} style={{ color: "#5698fa", cursor: "pointer" }}>
                        Esqueceu sua senha?
                    </span>
                </h4>

                <button className={`btn ${style.btn}`} type="submit">Entrar</button>

                <div style={{
                    color: props.responseMessage.startsWith("Erro:")
                        ? "rgb(240, 61, 61)"
                        : "rgb(64, 216, 114)",
                    width: "350px",
                    marginTop: "10px",
                    textAlign: "justify"
                }}>
                    {props.responseMessage}
                </div>
            </div>
        </form>
    )

}
export default UserLogin;