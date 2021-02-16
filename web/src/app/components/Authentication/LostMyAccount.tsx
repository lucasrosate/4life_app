import React, { useState } from 'react';
import api from '../../api/api';
import style from '../../styles/components/AccountForm.module.css';

const LostMyAccount: React.FC<{ toggleWindow: Function }> = ({ toggleWindow }) => {

    var [email, setEmail] = useState("");
    var [showNotification, setShowNotification] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowNotification(true);
    
        api.post('/lostpassword', {
            email: email
        });

        setTimeout(() => toggleWindow(), 2000);
    }

    return (
        <form onSubmit={(e) => onSubmit(e)}>
            <div className={`${style.userForm} ${style.loginFormContainer}`}>
                <div style={{ marginTop: "15px" }}>
                    <h1>Recuperar senha</h1>
                </div>

                <div style={{ fontSize: "1.0rem", lineHeight: "150%", marginTop: "30px", fontWeight: 500 }}>
                    Para prosseguir você deve inserir o seu email. Será enviado uma confirmação caso ele exista.
                </div>

                <div style={{ marginTop: "20px", fontWeight: 500 }}>
                    <div><label htmlFor="email">Email</label></div>
                    <input
                        name="email"
                        type="text"
                        className={`input ${style.input}`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div style={{ marginTop: "30px" }}>
                    <span>
                        <button
                            type="button"
                            style={{ marginRight: "60px" }}
                            className={`btn ${style.btn}`}
                            onClick={() => toggleWindow()}
                        >
                            Voltar
                        </button>
                    </span>

                    <span>
                        <button
                            type="submit"
                            className={`btn ${style.btn}`}
                            onClick={() => {

                            }}
                        >
                            Enviar
                        </button>

                        {showNotification ? <div style={
                            {
                                marginTop: "20px",
                                color: "rgb(64, 216, 114)",
                                backgroundColor: "#dbfada",
                                border: "1px solid rgb(64, 216, 114)",
                                padding: "3px 8px",
                                borderRadius: "5px"

                            }
                        }>
                            Um email foi enviado para a sua conta.
                        </div> : null}

                    </span>

                </div>

            </div>

        </form >
    )
}

export default LostMyAccount;