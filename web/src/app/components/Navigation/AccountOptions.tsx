import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import style from '../../styles/components/Navigation/AccountOptions.module.css';

const AccountOptions: React.FC<{userLoggedOut: Function}> = ({userLoggedOut}) => {
    const history = useHistory();


    const logout = () => {
        localStorage.removeItem("auth-token");
        localStorage.removeItem("username");
        userLoggedOut();

        history.push("");

    }

    const myAccount = () => history.push('myaccount');


    return (
        <div className={style.accountOptionsList}>
            <ul >
                <li><button className={`${style.btn}`} onClick={myAccount}>Minha conta</button> </li>
                <li><button className={`${style.btn}`} onClick={logout}>Sair</button></li>
            </ul>
        </div>

    )
}

export default AccountOptions;