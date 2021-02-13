import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as userAction from '../store/actions/userActions';
import { useDispatch } from 'react-redux';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import style from '../styles/components/AccountForm.module.css';
import styled from 'styled-components';
import { IStates, StoreState } from '../../../interfaces';

import { GoArrowLeft } from "react-icons/go";
const estados: IStates = require('../assets/files/estados.json');

const { useState } = React;


interface Props {
    successForms: boolean,
    showLoginFormFunction: Function,
    responseMessage: string
}


const PhoneInputContainer = styled.div`
    width: 300px;

    .PhoneInput {
        margin-right: right: 5px;
        width: 100%;

        display: flex;
        align-items: center;

        .PhoneInputCountry {
            display: flex;
            align-items: center;

            select {
                width: 75px;
                color: gray;
                margin-right: 9px;
                color: gray;
                background-color: #f3f4fc;
                border-radius: 4px;
                border: none;
                height: 30px;
                font-family: 'Dosis', sans-serif;

                &:focus {
                    outline: none;
                }
            }

            div img {
                width: 25px;
            }
        }

        input {
            margin-left: 4px;
            padding-left: 2px;
            width: 210px;
            color: gray;
            background-color: #f3f4fc;
            border-radius: 4px;
            border: none;
            height: 35px;
            font-family: 'Dosis', sans-serif;

            &:focus {
                outline: none;
            }
        }
    }
`

const RegistrationForm: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();

    var [phoneNumber, setPhoneNumber] = useState("");
    var [passwordError, setPasswordError] = useState<string>("");

    const { register, watch, handleSubmit } = useForm<any>();

    const onSubmit =
        handleSubmit(({ firstname, lastname, username, email, password1, stateplace }) => {
            if (firstname && lastname && username && email && password1 && stateplace && isValidPhoneNumber(phoneNumber)) {
                dispatch(
                    userAction.createAccount({
                        firstname: firstname,
                        lastname: lastname,
                        username: username,
                        email: email,
                        password: password1,
                        state: stateplace,
                        phone: phoneNumber
                    }));
            }
        });



    useEffect(() => {
        if (props.successForms)
            props.showLoginFormFunction();
    }, [props.successForms])


    // Validação de senhas-onFocusOut(onBlur) haverá uma validação para saber se as senhas 1 e 2 se coincidem e se ambas tem mais de 8 caracteres
    const validatePassword = () => {
        const password1 = watch('password1', (newPassword1: string) => newPassword1);
        const password2 = watch('password2', (newPassword2: string) => newPassword2);

        if ((password1 === password2) && (password1.length >= 8 && password2.length >= 8)) {
            setPasswordError('');
        } else {
            setPasswordError('As senhas devem ser iguais e com caracter e com pelo menos 8 caracteres');
        }
    }


    const handleShowLoginFormFunction = (responseMessage: any) => responseMessage.length > 0 ? props.showLoginFormFunction(responseMessage) : props.showLoginFormFunction('');

    return (
        <div className={`container ${style.container}`}>
            <form onSubmit={onSubmit} className={style.form}>
                <div className={style.signupFormContainer}>
                    <div>
                        <h1>Registrar</h1>
                        <label htmlFor="firstname"><span className={style.signupLabel}>Primeiro nome</span></label>
                        <input type="text" className={`input ${style.input}`} placeholder="Primeiro Nome" name="firstname" ref={register({ required: true, maxLength: 80 })} />

                        <label htmlFor="lastname"><span className={style.signupLabel}>Sobrenome</span></label>
                        <input type="text" className={`${style.input} input `} placeholder="Sobrenome" name="lastname" ref={register({ required: true, maxLength: 100 })} />

                        <label htmlFor="username"><span className={style.signupLabel}>Nome de usuário</span></label>
                        <input type="text" className={`input ${style.input}`} placeholder="Nome de usuário" name="username" ref={register({ required: true, maxLength: 80 })} />

                        <label htmlFor="email"><span className={style.signupLabel}>E-mail</span></label>
                        <input type="text" className={`input ${style.input}`} placeholder="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />


                        <label htmlFor="phonenumber"><span className={style.signupLabel}>Telefone</span></label>
                        <PhoneInputContainer>
                            <PhoneInput
                                placeholder={"Preencha com o seu número"}
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                defaultCountry={"BR"}
                            />
                        </PhoneInputContainer>


                        <label htmlFor="password1"><span className={style.signupLabel}>Senha</span></label>
                        <input type="password" className={`input ${style.input}`} placeholder="Senha" name="password1" onBlur={validatePassword} ref={register({ required: true, maxLength: 24 })} />

                        <label htmlFor="password2"><span className={style.signupLabel}>Repita a senha</span></label>
                        <input type="password" className={`input ${style.input}`} placeholder="Senha" name="password2" onBlur={validatePassword} ref={register({ required: true, maxLength: 24 })} />

                        <div className="password-error">{passwordError}</div>

                        <label htmlFor="stateplace"><span className={style.signupLabel}>Estado</span></label>
                        <select name="stateplace" className={`select ${style.select}`} ref={register}>
                            {estados.UF.map((uf, index) => <option key={index} value={uf.name}>{`${uf.name} - ${uf.abbrev}`}</option>)}
                        </select>

                        <div className={style.error}>{props.responseMessage}</div>

                        <div className={style.buttonsRegistration}>
                            <GoArrowLeft fill="white" size={24} className={style.arrowleft} onClick={handleShowLoginFormFunction} />
                            <button className={`btn ${style.btn}`} type="submit">Registrar</button>
                        </div>


                    </div>
                </div>
            </form>
        </div>

    )


}

export default RegistrationForm;