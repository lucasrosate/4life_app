import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import HealthPage from './pages/HealthPage';
import CashFlowPage from './pages/CashFlowPage';
import TaskPage from './pages/TaskPage';
import EntertainmentPage from './pages/EntertainmentPage'

function  Routes () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path ="/" exact component={LandingPage}/>
                <Route path ="/home" exact component={HomePage}/>
                <Route path ="/health" exact component={HealthPage}/>
                <Route path ="/cashflow" exact component={CashFlowPage}/>
                <Route path ="/task" exact component={TaskPage}/>
                <Route path ="/entertainment" exact component={EntertainmentPage}/>

                
                
            </Switch>
        
        </BrowserRouter>
    )
}


export default Routes;