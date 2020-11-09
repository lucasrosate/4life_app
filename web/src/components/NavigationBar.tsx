import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/NavigationBar.css';


import photo from '../assets/images/minhafotoLinkedin.png';

function NavigationBar(props: any) {
    return (
        <nav>
            <Link to="/home"><h2>4life</h2></Link>
            <ul>
                <li><Link to="/health">Saúde</Link></li>
                <li><Link to="/cashflow">Fluxo de Caixa</Link></li>
                <li><Link to="/task">Tarefas</Link></li>
                <li><Link to="/entertainment">Entretenimento</Link></li>
            </ul>

            <span className="user-box">
                <img src={photo} alt="xasxas" />
            </span>

            <span className="user-username">
            {`${props.user.firstname}  ${props.user.lastname}`}
            </span>
        </nav>
    )
}

export default NavigationBar;