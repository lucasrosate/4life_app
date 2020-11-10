import React from 'react';
import NavigationBar from '../Navigation/NavigationBar'


function HomePage(props: any) {

    return (
        <div>
            <NavigationBar
            user={props.user}
            handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
            />
        <h1>{props.user.username}</h1>
        </div>
    )
}

export default HomePage;