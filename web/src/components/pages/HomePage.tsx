import React from 'react';
import NavigationBar from '../Navigation/NavigationBar'

import { PagesProps } from '../../interfaces/UserInterface';

const HomePage: React.FC <PagesProps> = (props: PagesProps) => {

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