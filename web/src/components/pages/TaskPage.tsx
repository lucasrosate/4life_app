import React from 'react';
import NavigationBar from '../Navigation/NavigationBar'

function TaskPage(props: any) {
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