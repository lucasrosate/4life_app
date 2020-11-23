import React from 'react';
import NavigationBar from '../Navigation/NavigationBar'
import { PagesProps } from '../../interfaces/UserInterface';


const EntertainmentPage: React.FC <PagesProps> = (props: PagesProps) => {
    return (
        <div>
            <NavigationBar
            user={props.user}
            handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
            />
        </div>

    )
}

export default EntertainmentPage;