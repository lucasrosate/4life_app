import React from 'react';
import { useForm } from 'react-hook-form';
import style from '../styles/components/AccountForm.module.css';
import { GoArrowLeft } from "react-icons/go";
import { IStates, IUser, UserState } from '../../../interfaces';
import * as userAction from '../store/actions/userActions';
import { useDispatch, useSelector, useStore } from 'react-redux';


import { StoreState } from '../../../interfaces';

const estados: IStates = require('../assets/files/estados.json');

const { useState } = React;


interface Props {
    showLoginFormFunction: Function
}

const RegistrationForm: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const store = useStore();

    var [error, setError] = useState('');
    var [phoneNumber, setPhoneNumber] = useState("");
    var responseMessage = useSelector((state: StoreState) => state.userReducer.responseMessage)
    const { register, watch, handleSubmit } = useForm<any>();

    const onSubmit =
        handleSubmit(({ firstname, lastname, username, email, password1, stateplace, phonenumber }) => {
            if (firstname && lastname && username && email && password1 && stateplace && phonenumber)
                dispatch(
                    userAction.createAccount({
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        email: email,
                        password: password1,
                        state: stateplace,
                        phone: phonenumber
                    }));

            console.log(responseMessage);
        })




    // Validação de senhas-onFocusOut(onBlur) haverá uma validação para saber se as senhas 1 e 2 se coincidem e se ambas tem mais de 8 caracteres
    const validatePassword = () => {
        const password1 = watch('password1', (newPassword1: string) => newPassword1);
        const password2 = watch('password2', (newPassword2: string) => newPassword2);

        if ((password1 === password2) && (password1.length >= 8 && password2.length >= 8)) {
            setError('');
        } else {
            setError('As senhas devem ser iguais e com caracter e com pelo menos 8 caracteres');
        }
    }


    const handleShowLoginFormFunction = (responseMessage: any) => responseMessage.length > 0 ? props.showLoginFormFunction(responseMessage) : props.showLoginFormFunction('');

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <div className={`container ${style.container}  ${style.signupFormContainer}`}>

                    <h1>Registrar</h1>
                    <label htmlFor="firstname"><span className={style.signupLabel}>Primeiro nome</span></label>
                    <input type="text" className="input signupform firstname" placeholder="Primeiro Nome" name="firstname" ref={register({ required: true, maxLength: 80 })} />

                    <label htmlFor="lastname"><span className={style.signupLabel}>Sobrenome</span></label>
                    <input type="text" className="input signupform lastname" placeholder="Sobrenome" name="lastname" ref={register({ required: true, maxLength: 100 })} />

                    <label htmlFor="username"><span className={style.signupLabel}>Nome de usuário</span></label>
                    <input type="text" className="input signupform username" placeholder="Nome de usuário" name="username" ref={register({ required: true, maxLength: 80 })} />

                    <label htmlFor="email"><span className={style.signupLabel}>E-mail</span></label>
                    <input type="text" className="input signupform email" placeholder="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />

                    <label htmlFor="phonenumber"><span className={style.signupLabel}>Telefone</span></label>
                    <input type="tel" className="input signupform phone" placeholder="Número de telefone" name="phonenumber"
                        ref={register({ required: true, maxLength: 12, pattern: /^(\(?\d{2}\)?\s)?(\d{4,5}-?\d{4})/i })}
                        value={phoneNumber}
                        onChange={(e) => {
                            const letterTrim = e.target.value.replace(/\D/g, "");
                            setPhoneNumber(letterTrim);
                        }}
                    />

                    <label htmlFor="password1"><span className={style.signupLabel}>Senha</span></label>
                    <input type="password" className="input signupform password1" placeholder="Senha" name="password1" onBlur={validatePassword} ref={register({ required: true, maxLength: 24 })} />

                    <label htmlFor="password2"><span className={style.signupLabel}>Repita a senha</span></label>
                    <input type="password" className="input signupform password2" placeholder="Senha" name="password2" onBlur={validatePassword} ref={register({ required: true, maxLength: 24 })} />

                    <label htmlFor="stateplace"><span className={style.signupLabel}>Estado</span></label>
                    <select name="stateplace" className="input signupform stateplace " ref={register}>
                        {estados.UF.map((uf, index) => <option key={index} value={uf.name}>{`${uf.name} - ${uf.abbrev}`}</option>)}
                    </select>

                    <div className={`error ${style.error}`}>{responseMessage}</div>

                    <div className={`${style.buttonsRegistration}`}>
                        <GoArrowLeft fill="white" size={24} className={style.arrowleft} onClick={handleShowLoginFormFunction} />
                        <button className={`btn ${style.btn}`} type="submit">Registrar</button>
                    </div>


                </div>

            </form>
        </div>

    )


}

export default RegistrationForm;