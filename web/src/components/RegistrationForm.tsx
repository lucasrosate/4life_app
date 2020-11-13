import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { registerService } from '../services/FormServices';
import AccountForm from '../styles/components/AccountForm.module.css';
import { GoArrowLeft } from "react-icons/go";
let estados: Estados = require('../assets/files/estados.json');


interface Estados {
    UF: [{
        nome: string,
        sigla: string
    }]
}

export default function RegistrationForm(props: any) {

    var [error, setError] = useState('');
    var [phoneNumber, setPhoneNumber] = useState("");
    const { register, watch, handleSubmit, errors } = useForm();

    useEffect(()=> {console.log(estados.UF)}, []);


    async function onSubmit(data: any) {
        const success = await registerService(data);

        if (success) {
            handleShowLoginFormFunction("Registrado com sucesso.");
        } else {
            setError("Erro durante o registro. Verifique se tudo foi preenchido corretamente.")
        }

    }

    const handleShowLoginFormFunction = (responseMessage: any) => responseMessage.length > 0 ? props.showLoginFormFunction(responseMessage) : props.showLoginFormFunction('');

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={`container ${AccountForm.container}  ${AccountForm.signupFormContainer}`}>


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
                    value= {phoneNumber}
                    onChange = { (e) => {
                        const letterTrim = e.target.value.replace(/\D/g, "");
                        setPhoneNumber(letterTrim);
                    }}
                    />

                    <label htmlFor="password1"><span className={AccountForm.signupLabel}>Senha</span></label>
                    <input type="password" className="input signupform password1" placeholder="Senha" name="password1" ref={register({ required: true, maxLength: 24 })} />

                    <label htmlFor="password2"><span className={AccountForm.signupLabel}>Repita a senha</span></label>
                    <input type="password" className="input signupform password2" placeholder="Senha" name="password2" ref={register({
                        required: true, maxLength: 24,
                        validate: (value) => {
                            const isValid = value === watch('password1');
                            if (!isValid) { setError('As senhas devem ser iguais.'); }
                            else { setError(''); }
                            return isValid
                        }
                    })} />

                    <label htmlFor="stateplace"><span className={AccountForm.signupLabel}>Estado</span></label>
                    <select name="stateplace" className="input signupform stateplace " ref={register}>
                        {estados.UF.map((uf)=> <option value={uf.nome}>{`${uf.nome} - ${uf.sigla}`}</option>)}
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