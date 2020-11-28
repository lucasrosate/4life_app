import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage';
import HomePage from './components/pages/HomePage';
import HealthPage from './components/pages/HealthPage';
import CashFlowPage from './components/pages/CashFlowPage';
import TaskPage from './components/pages/TaskPage';
import EntertainmentPage from './components/pages/EntertainmentPage';
import NotFoundPage from './components/pages/NotFoundPage';
import { getUserInfo, getProfilePhotoLink } from './services/QueryServices';
import MyAccountPage from './components/pages/MyAccountPage';
import { UserInterface } from './interfaces/UserInterface';
import { resolve } from 'path';
import { rejects } from 'assert';




function Routes() {

    //O usuário está logado?
    var [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('isLoggedIn')));

    var [userInfoLoaded, setUserInfoLoaded] = useState<boolean>(false);

    // Propriedades do usuário
    var [user, setUser] = useState({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        stateplace: '',
        birth: ''
    });

    var [userProfilePhoto, setUserProfilePhoto] = useState<string | null>(null);


    var [userProfile, setUserProfile] = useState<any>({
        user: user,
        userProfilePhoto: userProfilePhoto
    });


    const updateUserData = async () => {
        const promise = new Promise((resolve: any) => resolve(getUserInfo()));
        promise.then((result: any) => {
            setUser(result.user)

            setUserProfile(
                {
                    user: user,
                    userProfilePhoto: userProfilePhoto
                }
            );
        })
    }

    const updateUserProfilePicture = async () => {
        const promise = new Promise((resolve: any) => resolve(getProfilePhotoLink()));
        promise.then((result: any) => {
            setUserProfilePhoto(result.url)

            setUserProfile(
                {
                    user: user,
                    userProfilePhoto: userProfilePhoto
                }
            );
        })
    }


    //Pegar propriedades do usuário assim que logar
    useEffect(() => {
        async function update() {
            await updateUserData();
        };
        update();
    }, [
        user.username,
        user.firstname,
        user.lastname,
        user.email,
        user.phone,
        user.stateplace,
        user.birth
    ])


    useEffect(() => {
        async function update() {
            await updateUserData();
        };
        update();
    }, [userProfilePhoto])





    const handleChangeIsLoggedIn = (bool: any) => Boolean(setIsLoggedIn(bool));

    //Rotas
    return (
        <div className="root-container">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={() => (
                        isLoggedIn ?

                            <HomePage
                                user={user}
                                handleChangeIsLoggedIn={handleChangeIsLoggedIn}
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
                                    userProfile={userProfile}
                                    handleChangeIsLoggedIn={handleChangeIsLoggedIn}
                                    updateUserData={updateUserData}
                                    updateUserProfilePicture={updateUserProfilePicture}
                                />

                                :
                                <NotFoundPage />
                        )}
                    />

                </Switch>

            </BrowserRouter>
        </div>

    )
}


export default Routes;