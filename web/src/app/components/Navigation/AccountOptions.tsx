import React from 'react';
import { useHistory } from 'react-router-dom';

import style from '../../styles/components/Navigation/AccountOptions.module.css';

function AccountOptions (props: any) {
    const history = useHistory();


    // const logout = () => {
    //     logoutService();
    //     props.handleChangeIsLoggedIn(false);
    //     history.push('/');
        
    // }
    
    const myAccount = () => history.push('myaccount');

    
    return (
        <div className={style.accountOptionsList}>
            <ul >
                <li><button className={`${style.btn}`} onClick={myAccount}>Minha conta</button> </li>
                {/* <li><button className={`${style.btn}`} onClick={logout}>Sair</button></li> */}
            </ul>
        </div>

    )
}

export default AccountOptions;