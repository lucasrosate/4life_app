import React, { useState } from 'react';

import '../styles/components/AccountForm.css';

import { GoArrowLeft } from "react-icons/go";

import { useForm } from 'react-hook-form';

import { registerService } from '../services/FormServices';




export default function RegistrationForm(props: any) {

    const { register, watch, handleSubmit, errors } = useForm();
    var [error, setError] = useState('');

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
        <div className="container form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container signup-form-container">


                    <label htmlFor="firstname"><span className="signuplabel">Primeiro nome</span></label>
                    <input type="text" className="input signupform firstname" placeholder="Primeiro Nome" name="firstname" ref={register({ required: true, maxLength: 80 })} />
                    <div>{errors.name}</div>

                    <label htmlFor="lastname"><span className="signuplabel">Sobrenome</span></label>
                    <input type="text" className="input signupform lastname" placeholder="Sobrenome" name="lastname" ref={register({ required: true, maxLength: 100 })} />

                    <label htmlFor="username"><span className="signuplabel">Nome de usuário</span></label>
                    <input type="text" className="input signupform username" placeholder="Nome de usuário" name="username" ref={register({ required: true, maxLength: 80 })} />

                    <label htmlFor="email"><span className="signuplabel">E-mail</span></label>
                    <input type="text" className="input signupform email" placeholder="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />

                    <label htmlFor="phonenumber"><span className="signuplabel">Telefone</span></label>
                    <input type="tel" className="input signupform phone" placeholder="Número de telefone" name="phonenumber" ref={register({ required: true, maxLength: 12, pattern: /^(\(?\d{2}\)?\s)?(\d{4,5}-?\d{4})/i })} />

                    <label htmlFor="password1"><span className="signuplabel">Senha</span></label>
                    <input type="password" className="input signupform password1" placeholder="Senha" name="password1" ref={register({ required: true, maxLength: 24 })} />

                    <label htmlFor="password2"><span className="signuplabel">Repita a senha</span></label>
                    <input type="password" className="input signupform password2" placeholder="Senha" name="password2" ref={register({
                        required: true, maxLength: 24,
                        validate: (value) => {
                            const isValid = value === watch('password1');
                            if (!isValid) { setError('As senhas devem ser iguais.'); }
                            else { setError(''); }
                            return isValid
                        }
                    })} />

                    <label htmlFor="stateplace"><span className="signuplabel">Estado</span></label>
                    <select name="stateplace" className="input signupform stateplace " ref={register}>
                        <option value="Acre">Acre</option>
                        <option value="Alagoas">Alagoas</option>
                        <option value="Amapá">Amapá</option>
                        <option value="Amazonas">Amazonas</option>
                        <option value="Bahia">Bahia</option>
                        <option value="Ceará">Ceará</option>
                        <option value="Distrito Federal">Distrito Federal</option>
                        <option value="Espírito Santo">Espírito Santo</option>
                        <option value="Goiás">Goiás</option>
                        <option value="Maranhão">Maranhão</option>
                        <option value="Mato Grosso">Mato Grosso</option>
                        <option value="Mato Grosso do Sul">Mato Grosso do Sul</option>
                        <option value="Minas Gerais">Minas Gerais</option>
                        <option value="Pará">Pará</option>
                        <option value="Paraíba">Paraíba</option>
                        <option value="Paraná">Paraná</option>
                        <option value="Pernambuco">Pernambuco</option>
                        <option value="Piauí">Piauí</option>
                        <option value="Rio de Janeiro">Rio de Janeiro</option>
                        <option value="Rio Grande do Norte">Rio Grande do Norte</option>
                        <option value="Rio Grande do Sul">Rio Grande do Sul</option>
                        <option value="Rondônia">Rondônia</option>
                        <option value="Roraima">Roraima</option>
                        <option value="Santa Catarina">Santa Catarina</option>
                        <option value="São Paulo">São Paulo</option>
                        <option value="Sergipe">Sergipe</option>
                        <option value="Tocantins">Tocantins</option>
                    </select>

                    <div className="error">{error}
                    </div>

                    <div className="buttons-registration">
                        <GoArrowLeft fill="white" size={24} className="arrowleft" onClick={handleShowLoginFormFunction} />
                        <button className="btn signup" type="submit">Registrar</button>
                    </div>

                </div>

            </form>
        </div>

    )


}