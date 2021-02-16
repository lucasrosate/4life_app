import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams } from 'react-router';

import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface IParams {
    username: string,
    confirmToken: string
}

const ConfirmUserContainer = styled.div<{ userActivated: boolean }>`
    height: 100vh;
    width: 100vw;

    display: flex;
    align-items: center;

    div:first-child {
        width: 600px;
        height: 500px;

        div:first-child {
            height: 60px;

            span:first-child {
                font-size: 3.6rem;
                color: #5698fa;
                font-weight: 600;
            }

            span:nth-child(2) {
                font-size: 3.6rem;
                color: #3D3D3D;
                font-weight: 600;
            }
        }



        div:nth-child(2) {
            margin-top: 20px;

            align-items: center;
            padding: 40px 30px;
            height: 150px;
            background-color: ${(props) => props.userActivated ? "#dbfada" : "#fadada"};
            color: ${(props) => props.userActivated ? "rgb(64, 216, 114)" : "rgb(240, 61, 61)"};

            font-size: 1.6rem;

            border-radius: 10px;

            div:first-child {
                margin-top: 60px;
                a {
                    font-size: 1.2rem;
                    color: #5698fa;
                }

            }
        }
    }
    

`

const ConfirmAccountPage: React.FC = () => {
    //user/confirm_account/:username/:confirmToken'

    var { username, confirmToken } = useParams<IParams>();
    var [userActivated, setUserActivated] = useState(false);

    useEffect(() => {
        const confirmTokenPass = async () => {
            const URL = `/user/confirm_account/${username}/${confirmToken}`;
            const res = await api.get(URL);

            console.log(res.data);
            if (res.data.success) {
                setUserActivated(true);
                return;
            }


            return;
        }
        confirmTokenPass();
    }, [username, confirmToken, userActivated]);

    return (
        <div>
            <ConfirmUserContainer userActivated={userActivated} >
                <div>
                    <div><span>4life </span><span>app</span></div>
                        <div>
                            {userActivated?" Parabéns, sua conta foi ativada. Você já pode utilizar a sua conta."
                                : "Passe inválido, verifique se esse realmente é o link correto."}
                            
                            <div><Link to="/">Voltar</Link></div>
                        </div>
                   
                </div>


            </ConfirmUserContainer>
        </div>
    )
}


export default ConfirmAccountPage;