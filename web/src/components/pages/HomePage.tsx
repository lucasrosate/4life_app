import React from 'react';
import NavigationBar from '../Navigation/NavigationBar'
import { PagesProps } from '../../interfaces/UserInterface';
import CSSTransition from 'react-transition-group/CSSTransition';
import HomePageStyle from '../../styles/components/pages/HomePage.module.css';
const { useEffect, useState } = React;

const HomePage: React.FC<PagesProps> = (props: PagesProps) => {
    const [showPage, setShowPage] = useState(false);

    useEffect(() => {
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
                    <div className={HomePageStyle.dashboardContainer}>


                        <div className={`${HomePageStyle.boardContainer} ${HomePageStyle.healthBoard}`}>
                            <div className={HomePageStyle.dashboardContentContainer}>
                                <h1>Saúde</h1>
                            </div>
                        </div>

                        <div className={`${HomePageStyle.boardContainer} ${HomePageStyle.taskBoard}`}>
                            <div className={HomePageStyle.dashboardContentContainer}>
                                <h1>Tarefas</h1>
                            </div>
                        </div>

                        <div className={`${HomePageStyle.boardContainer} ${HomePageStyle.cashflowBoard}`}>
                            <div className={HomePageStyle.dashboardContentContainer}>
                                <h1>Fluxo de Caixa</h1>
                            </div>

                        </div>






                        <div className={`${HomePageStyle.boardContainer} ${HomePageStyle.entertainmentBoard}`}>
                            <div className={HomePageStyle.dashboardContentContainer}>
                                <h1>Entretenimento</h1>
                            </div>
                        </div>
                    </div>

                </div>
            </CSSTransition>
        </>
    )
}

export default HomePage;