import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import HealthPage from './pages/HealthPage';
import CashFlowPage from './pages/CashFlowPage';
import TaskPage from './pages/TaskPage';
import EntertainmentPage from './pages/EntertainmentPage';
import getUserInfo from './services/QueryServices';





function Routes(props: any) {
    // Propriedades do usuário

    var [user, setUser] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        stateplace: '',
    });

    useEffect(() => {
        (async () => {
            const data = await getUserInfo();
            if (typeof (data) == "object") {
                setUser(data.user);
            }

        })();

    }, []);




    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LandingPage} />

                <Route path="/home"
                    render={() => (
                        <HomePage
                            user={user}
                        />
                    )} />


                <Route path="/health"
                    render={() => (
                        <HealthPage
                            user={user}
                        />
                    )} />


                <Route path="/cash"
                    render={() => (
                        <CashFlowPage
                            user={user}
                        />
                    )} />

                <Route path="/task"
                    render={() => (
                        <TaskPage
                            user={user}
                        />
                    )} />


                <Route path="/entertainment"
                    render={() => (
                        <EntertainmentPage
                            user={user}
                        />
                    )} />

            </Switch>

        </BrowserRouter>
    )
}


export default Routes;