import React from 'react';
import { useForm } from 'react-hook-form';
import { registerService } from '../services/FormServices';
import AccountForm from '../styles/components/AccountForm.module.css';
import { GoArrowLeft } from "react-icons/go";
const estados: Estados = require('../assets/files/estados.json');

const { useState } = React;

interface Estados {
    UF: [{
        name: string,
        abbrev: string
    }]
}

interface Props {
    showLoginFormFunction: Function
}

const RegistrationForm: React.FC<Props> = (props: Props) => {

    var [error, setError] = useState('');
    var [phoneNumber, setPhoneNumber] = useState("");
    const { register, watch, handleSubmit, errors } = useForm();

    async function onSubmit(data: any) {
        const success = await registerService(data);

        if (success) {
            handleShowLoginFormFunction("Registrado com sucesso.");
        } else {
            setError("Erro durante o registro. Verifique se tudo foi preenchido corretamente.")
        }

    }

    // Validação de senhas   - onFocusOut(onBlur) haverá uma validação para saber se as senhas 1 e 2 se coincidem e se ambas tem mais de 8 caracteres
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`container ${AccountForm.container}  ${AccountForm.signupFormContainer}`}>

                    <h1>Registrar</h1>
                    <label htmlFor="firstname"><span className={AccountForm.signupLabel}>Primeiro nome</span></label>
                    <input type="text" className="input signupform firstname" placeholder="Primeiro Nome" name="firstname" ref={register({ required: true, maxLength: 80 })} />
                    <div>{errors.name}</div>

                    <label htmlFor="lastname"><span className={AccountForm.signupLabel}>Sobrenome</span></label>
                    <input type="text" className="input signupform lastname" placeholder="Sobrenome" name="lastname" ref={register({ required: true, maxLength: 100 })} />

                    <label htmlFor="username"><span className={AccountForm.signupLabel}>Nome de usuário</span></label>
                    <input type="text" className="input signupform username" placeholder="Nome de usuário" name="username" ref={register({ required: true, maxLength: 80 })} />

                    <label htmlFor="email"><span className={AccountForm.signupLabel}>E-mail</span></label>
                    <input type="text" className="input signupform email" placeholder="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />

                    <label htmlFor="phonenumber"><span className={AccountForm.signupLabel}>Telefone</span></label>
                    <input type="tel" className="input signupform phone" placeholder="Número de telefone" name="phonenumber"
                        ref={register({ required: true, maxLength: 12, pattern: /^(\(?\d{2}\)?\s)?(\d{4,5}-?\d{4})/i })}
                        value={phoneNumber}
                        onChange={(e) => {
                            const letterTrim = e.target.value.replace(/\D/g, "");
                            setPhoneNumber(letterTrim);
                        }}
                    />

                    <label htmlFor="password1"><span className={AccountForm.signupLabel}>Senha</span></label>
                    <input type="password" className="input signupform password1" placeholder="Senha" name="password1" onBlur={validatePassword} ref={register({ required: true, maxLength: 24 })} />

                    <label htmlFor="password2"><span className={AccountForm.signupLabel}>Repita a senha</span></label>
                    <input type="password" className="input signupform password2" placeholder="Senha" name="password2" onBlur={validatePassword} ref={register({ required: true, maxLength: 24 })} />

                    <label htmlFor="stateplace"><span className={AccountForm.signupLabel}>Estado</span></label>
                    <select name="stateplace" className="input signupform stateplace " ref={register}>
                        {estados.UF.map((uf, index) => <option key={index} value={uf.name}>{`${uf.name} - ${uf.abbrev}`}</option>)}
                    </select>

                    <div className={`error ${AccountForm.error}`}>{error}</div>

                    <div className={`${AccountForm.buttonsRegistration}`}>
                        <GoArrowLeft fill="white" size={24} className={AccountForm.arrowleft} onClick={handleShowLoginFormFunction} />
                        <button className={`btn ${AccountForm.btn}`} type="submit">Registrar</button>
                    </div>


                </div>

            </form>
        </div>

    )


}

export default RegistrationForm;