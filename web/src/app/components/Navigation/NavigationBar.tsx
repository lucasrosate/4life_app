import React, { CSSProperties, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

import AccountOptions from './AccountOptions';

import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import style from '../../styles/components/Navigation/NavigationBar.module.css';

import profileNoPhoto from '../../assets/images/nophoto.svg';
import { IRoute, StoreState } from '../../../../interfaces';
import { useSelector } from 'react-redux';


const { useState } = React;

//Rotas do navbar
const routes: IRoute[] = [
    {
        path: '/health',
        name: 'SAÚDE'
    },

    {
        path: '/cash',
        name: 'FINANÇAS'
    },

    {
        path: '/task',
        name: 'TAREFAS'
    },

    {
        path: '/entertainment',
        name: 'ENTRETENIMENTO'
    },

];

const NavigationBar: React.FC<{ userLoggedOut: Function }> = ({ userLoggedOut }) => {

    var [isValidURL, setIsValidURL] = useState(false);
    const profilePictureUrl = useSelector((state: StoreState) => state.userReducer.user.profilePhoto);

    const [accMenu, setAccMenu] = useState(false);

    //Retorna uma string da rota atual
    const documentURL = useLocation().pathname;

    const doBold: CSSProperties = {
        borderBottom: "5px solid #5698fa",

    }

    //Componente para renderizar as opções do navbar
    function NavBarList() {

        const routeList = routes.map((route, index) => {
            return route.path === documentURL
                //Se selecionado, fique em negrito
                ? <li className={style.navbarMenuList} style={doBold} key={index} ><Link to={route.path}>{route.name}</Link> </li>
                : <li className={style.navbarMenuList} key={index} ><Link to={route.path}>{route.name}</Link> </li>
        });

        return <ul>{routeList}</ul>
    }


    useEffect(() => {

        for (let i = 0; i < routes.length; i++) {
            if (routes[i].path === documentURL) {
                return setIsValidURL(true);
            }
        }

        if (documentURL === "/") return setIsValidURL(true);
        if (documentURL === "/home") return setIsValidURL(true);
        if (documentURL === "/myaccount") return setIsValidURL(true);
        return setIsValidURL(false);


    }, [documentURL])

    return (

        <>
            {
                isValidURL ?

                    <nav className={style.navHeader}>
                        <div className={style.menuContainer}>
                            <Link to="/home" ><h2>4life</h2></Link>

                            <div className={style.RoutesOptions}>
                                <ul>
                                    <NavBarList />
                                </ul>
                            </div>

                            <div className={style.userAllInfo}>
                                <span className={style.userBox}>
                                    <img src={profilePictureUrl ? profilePictureUrl : profileNoPhoto} alt="profile" />

                                </span>

                                <span className={style.accountInfo}
                                    onClick={() => setAccMenu(!accMenu)}
                                >
                                    <ul>
                                        <li className={style.userUserName}>{`${localStorage.getItem('username')}`}{!accMenu ? <GoChevronDown size={20} /> : <GoChevronUp size={20} />}</li>
                                        <li><div>{accMenu ? <AccountOptions userLoggedOut={userLoggedOut} /> : null}</div></li>
                                    </ul>


                                </span>
                            </div>

                        </div>


                    </nav>
                    : null}
        </>

    )
}

export default NavigationBar;