import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { getProfilePicture, getUserData } from './app/store/actions/userActions';
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



const App: React.FC = () => {

    //O usuário está logado?
    var [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();

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
        
                    if (res.data.isAuthenticated) {
                        setIsLoggedIn(true);
                        dispatch(getUserData());
                        dispatch(getProfilePicture());

                    }
                } catch (error) {
                    setIsLoggedIn(false);
                }
            } else {
                setIsLoggedIn(false);
            }
        }

        if (!isLoggedIn) {
            verifyUser();
        }
    }, [dispatch, isLoggedIn]);

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
                            isLoggedIn ? <HomePage /> : <LandingPage userLoggedIn={userLoggedIn} />
                        )}
                    />

                    <Route exact path="/health"
                        render={() => (
                            isLoggedIn ?
                                <HealthPage /> : <LandingPage userLoggedIn={userLoggedIn} />
                        )}
                    />

                    <Route exact path="/cash"
                        render={() => (
                            isLoggedIn ? <CashFlowPage /> : <LandingPage userLoggedIn={userLoggedIn} />
                        )}
                    />

                    <Route exact path="/task"
                        render={() => (
                            isLoggedIn ?
                                <TaskPage /> : <LandingPage userLoggedIn={userLoggedIn} />
                        )}
                    />


                    <Route exact path="/entertainment"
                        render={() => (
                            isLoggedIn ? <EntertainmentPage /> : <LandingPage userLoggedIn={userLoggedIn} />
                        )}
                    />

                    <Route exact path="/myaccount"
                        render={() => (
                            isLoggedIn ? <MyAccountPage /> : <LandingPage userLoggedIn={userLoggedIn} />
                        )}
                    />

                    <Route component={NotFoundPage} />
                </Switch>

            </BrowserRouter>
        </div>

    )
}


export default App;