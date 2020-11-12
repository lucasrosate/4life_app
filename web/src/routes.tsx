import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage';
import HomePage from './components/pages/HomePage';
import HealthPage from './components/pages/HealthPage';
import CashFlowPage from './components/pages/CashFlowPage';
import TaskPage from './components/pages/TaskPage';
import EntertainmentPage from './components/pages/EntertainmentPage';
import NotFoundPage from './components/pages/NotFoundPage';
import getUserInfo from './services/QueryServices';
import MyAccountPage from './components/pages/MyAccountPage';




function Routes() {

    //O usuário está logado?
    var [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('isLoggedIn')));


    // Propriedades do usuário
    var [user, setUser] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        stateplace: '',
        birth: ""
    });

    const updateUserInfo = async () => {
        (async () => {
            const data = await getUserInfo();
            if (typeof (data) == "object") {
                setUser(data.user);
            }

        })();
    }

    //Pegar propriedades do usuário assim que logar
    useEffect(() => {
        updateUserInfo();
    }, []);


    const handleChangeIsLoggedIn = (bool: any) => Boolean(setIsLoggedIn(bool));

    //Rotas
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" render={() => (
                    isLoggedIn ?
                        <HomePage
                            user={user}
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
                                user={user}
                                handleChangeIsLoggedIn={handleChangeIsLoggedIn}
                            /> :
                            <NotFoundPage />
                    )}
                />


                <Route exact path="/health"
                    render={() => (
                        isLoggedIn ?
                            <HealthPage
                                user={user}
                                handleChangeIsLoggedIn={handleChangeIsLoggedIn}
                            /> :
                            <NotFoundPage />
                    )}
                />


                <Route exact path="/cash"
                    render={() => (
                        isLoggedIn ?
                            <CashFlowPage
                                user={user}
                                handleChangeIsLoggedIn={handleChangeIsLoggedIn}
                            /> :
                            <NotFoundPage />
                    )}
                />

                <Route exact path="/task"
                    render={() => (
                        isLoggedIn ?
                            <TaskPage
                                user={user}
                                handleChangeIsLoggedIn={handleChangeIsLoggedIn}
                            /> :
                            <NotFoundPage />
                    )}
                />


                <Route exact path="/entertainment"
                    render={() => (
                        isLoggedIn ?
                            <EntertainmentPage
                                user={user}
                                handleChangeIsLoggedIn={handleChangeIsLoggedIn}
                            /> :
                            <NotFoundPage />
                    )}
                />

                <Route exact path="/myaccount"
                    render={() => (
                        isLoggedIn ?
                            <MyAccountPage
                                user={user}
                                handleChangeIsLoggedIn={handleChangeIsLoggedIn}
                                updateUserInfo={updateUserInfo}
                            /> :
                            <NotFoundPage />
                    )}
                />

            </Switch>

        </BrowserRouter>
    )
}


export default Routes;