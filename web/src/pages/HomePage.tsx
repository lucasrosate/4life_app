import React, { useEffect } from 'react';
import NavigationBar from '../components/NavigationBar'

import { useHistory } from 'react-router-dom';


function HomePage(props: any) {
    const history = useHistory();

    useEffect(() => {
        console.log(props.isLoggedIn);
    }, [])

    return (
        <div>
            <NavigationBar user={props.user}/>
        <h1>{props.user.username}</h1>
        </div>
    )
}

export default HomePage;