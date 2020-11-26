import React from 'react';
import NavigationBar from '../Navigation/NavigationBar'
import { PagesProps } from '../../interfaces/UserInterface';
import CSSTransition from 'react-transition-group/CSSTransition';

const {useEffect, useState} = React;

const EntertainmentPage: React.FC <PagesProps> = (props: PagesProps) => {
    const [showPage, setShowPage] = useState(false); 

    useEffect(()=> {
        setShowPage(true);
    }, []);
    
    return (
        
        <>
        <NavigationBar
                user={props.user}
                handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
            />
        <CSSTransition
            in={showPage}
            timeout={600}
            classNames="fade"
            mountOnEnter
        >
        
        <div className="content-container">
            <h1>EntertainmentPage</h1>
        </div>
        </CSSTransition>
        </>
    )
}

export default EntertainmentPage;