import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import NavigationBar from './app/components/Navigation/NavigationBar';
import LandingPage from './app/pages/LandingPage';
import HomePage from './app/pages/HomePage';
import HealthPage from './app/pages/HealthPage';
import CashFlowPage from './app/pages/CashFlowPage';
import TaskPage from './app/pages/TaskPage';
import EntertainmentPage from './app/pages/EntertainmentPage';
import NotFoundPage from './app/pages/NotFoundPage';
import MyAccountPage from './app/pages/MyAccountPage';

import './app/styles/global.css';



const App: React.FC = () => {

    //O usuário está logado?
    localStorage.getItem('isLoggedIn')
    var [isLoggedIn, setIsLoggedIn] = useState(Boolean(true));



    const handleChangeIsLoggedIn = (bool: any) => Boolean(setIsLoggedIn(bool));

    //Rotas
    return (

        <div className="root-container">

            <BrowserRouter>
            <NavigationBar />
                <Switch>
                    <Route exact path="/" render={() => (
                        isLoggedIn ?

                            <HomePage

                            /> :
                            <LandingPage
                                handleChangeIsLoggedIn={handleChangeIsLoggedIn}
                            />


                    )}
                    />



                    <Route exact path="/home"
                        render={() => (
                            isLoggedIn ?
                                <HomePage

                                /> :
                                <NotFoundPage />
                        )}
                    />


                    <Route exact path="/health"
                        render={() => (
                            isLoggedIn ?
                                <HealthPage

                                /> :
                                <NotFoundPage />
                        )}
                    />


                    <Route exact path="/cash"
                        render={() => (
                            isLoggedIn ?
                                <CashFlowPage

                                /> :
                                <NotFoundPage />
                        )}
                    />

                    <Route exact path="/task"
                        render={() => (
                            isLoggedIn ?
                                <TaskPage

                                /> :
                                <NotFoundPage />
                        )}
                    />


                    <Route exact path="/entertainment"
                        render={() => (
                            isLoggedIn ?
                                <EntertainmentPage
                                /> :
                                <NotFoundPage />
                        )}
                    />

                    <Route exact path="/myaccount"
                        render={() => (
                            isLoggedIn ?
                                <MyAccountPage />
                                :
                                <NotFoundPage />
                        )}
                    />

                </Switch>

            </BrowserRouter>
        </div>

    )
}


export default App;