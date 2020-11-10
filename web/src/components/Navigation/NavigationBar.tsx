import React, { useState, CSSProperties } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import NavigationBarStyle from '../../styles/components/Navigation/NavigationBar.module.css';

import profilePhoto from '../../assets/images/nophoto.svg';
import AccountOptions from './AccountOptions';


function NavigationBar(props: any) {

    //Rotas do navbar
    const [routes] = useState(
        [
            {
                path: '/health',
                name: 'SAÚDE'
            },

            {
                path: '/cash',
                name: 'FINANÇAS'
            },

            {
                path: '/entertainment',
                name: 'ENTRETENIMENTO'
            },

        ])

    const [accMenu, setAccMenu] = useState(false);

    //Retorna uma string da rota atual
    const documentURL = useLocation().pathname;

    const doBold: CSSProperties = {
        borderBottom: "5px solid #2F4EF0",

    }

    //Componente para renderizar as opções do navbar
    function NavBarList() {

        const routeList = routes.map((route, index) => {
            return route.path === documentURL
                //Se selecionado, fique em negrito
                ? <li className={NavigationBarStyle.navbarMenuList} style={doBold} key={index} ><Link to={route.path}>{route.name}</Link> </li>
                : <li className={NavigationBarStyle.navbarMenuList} key={index} ><Link to={route.path}>{route.name}</Link> </li>
        });

        return <ul>{routeList}</ul>
    }

    return (
        <nav className={NavigationBarStyle.navHeader}>
            <Link to="/home" ><h2>4life</h2></Link>
            <ul>
                <NavBarList />
            </ul>

            <span className={NavigationBarStyle.userBox}>
                <img src={profilePhoto} alt="profile" />
            </span>

            <span className={NavigationBarStyle.accountInfo}
                onClick={() => setAccMenu(!accMenu)}
            >
                <ul>
                    <li  className={NavigationBarStyle.userUserName}>{`${localStorage.getItem('username')}`}{!accMenu ? <GoChevronDown size={24} /> : <GoChevronUp size={24} />}</li>
                    <li>{accMenu ? <AccountOptions handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}/> : null}</li>
                </ul>
            </span>

        </nav>
    )
}

export default NavigationBar;