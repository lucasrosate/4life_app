import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import style from '../styles/pages/HomePage.module.css';
const { useEffect, useState } = React;

const HomePage: React.FC = () => {
    const [showPage, setShowPage] = useState<boolean>(false);

    useEffect(() => {
        setShowPage(true);
    }, []);

    return (

        <>

            <CSSTransition
                in={showPage}
                timeout={600}
                classNames="fade"
                mountOnEnter
            >
                <div className="content-container">
                    <div className={style.dashboardContainer}>


                        <div className={`${style.boardContainer} ${style.healthBoard}`}>
                            <div className={style.dashboardContentContainer}>
                                <h1>Saúde</h1>
                            </div>
                        </div>

                        <div className={`${style.boardContainer} ${style.taskBoard}`}>
                            <div className={style.dashboardContentContainer}>
                                <h1>Tarefas</h1>
                            </div>
                        </div>

                        <div className={`${style.boardContainer} ${style.cashflowBoard}`}>
                            <div className={style.dashboardContentContainer}>
                                <h1>Fluxo de Caixa</h1>
                            </div>

                        </div>






                        <div className={`${style.boardContainer} ${style.entertainmentBoard}`}>
                            <div className={style.dashboardContentContainer}>
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