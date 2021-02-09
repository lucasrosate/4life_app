import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import api from './app/api/api';
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

import { updateUserData } from './app/store/actions/userActions';



const App: React.FC = () => {

    //O usuário está logado?
    localStorage.getItem('isLoggedIn')
    var [isLoggedIn, setIsLoggedIn] = useState(false);

    // triggering isLoggedIn status
    useEffect(() => {
        const verifyUser = async () => {
            const token: string = localStorage.getItem('auth-token') as string;
            const username: string = localStorage.getItem("username") as string;

            if (token && username) {
                try {
                    const res = await api.post('/isloggedin', {
                        username: username,
                        token: token
                    });

                    console.log(res.data);

                    if (res.data.isAuthenticated) {
                        setIsLoggedIn(true);
                        updateUserData(res.data.user);
                    }
                } catch (error) {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }


        }

        verifyUser();

    }, []);

    const userLoggedIn = () => setIsLoggedIn(true);
    const userLoggedOut = () => setIsLoggedIn(false);

    //Rotas
    return (

        <div className="root-container">

            <BrowserRouter>
                {isLoggedIn ? <NavigationBar userLoggedOut={userLoggedOut} /> : null}
                <Switch>
                    <Route exact path="/" render={() => (
                        isLoggedIn ? <HomePage /> : <LandingPage userLoggedIn={userLoggedIn} />
                    )}
                    />

                    <Route exact path="/home"
                        render={() => (
                            isLoggedIn ? <HomePage /> : <NotFoundPage />
                        )}
                    />

                    <Route exact path="/health"
                        render={() => (
                            isLoggedIn ?
                                <HealthPage /> : <NotFoundPage />
                        )}
                    />

                    <Route exact path="/cash"
                        render={() => (
                            isLoggedIn ? <CashFlowPage /> : <NotFoundPage />
                        )}
                    />

                    <Route exact path="/task"
                        render={() => (
                            isLoggedIn ?
                                <TaskPage /> : <NotFoundPage />
                        )}
                    />


                    <Route exact path="/entertainment"
                        render={() => (
                            isLoggedIn ? <EntertainmentPage /> : <NotFoundPage />
                        )}
                    />

                    <Route exact path="/myaccount"
                        render={() => (
                            isLoggedIn ? <MyAccountPage /> : <NotFoundPage />
                        )}
                    />

                </Switch>

            </BrowserRouter>
        </div>

    )
}


export default App;