import React from 'react';
import NavigationBar from '../Navigation/NavigationBar';

import { PagesProps } from '../../interfaces/UserInterface';


const HealthPage: React.FC <PagesProps> = (props: PagesProps) => {
    return (
        <div>
            <NavigationBar user={props.user}
            handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
            />
        </div>

    )
}

export default HealthPage;