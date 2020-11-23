import React from 'react';
import NavigationBar from '../Navigation/NavigationBar'
import { PagesProps } from '../../interfaces/UserInterface';

const TaskPage: React.FC <PagesProps> = (props: PagesProps) => {
    return (
        <div>
            <NavigationBar
                user={props.user}
                handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
            />
            <h1>dqwdqwdqwdw</h1>
        </div>

    )
}

export default TaskPage;