import React from 'react';
import NavigationBar from '../Navigation/NavigationBar';

function CashFlowPage(props: any) {
    return (
        <div>
            <NavigationBar
            user={props.user}
            handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
            />
        </div>

    )
}

export default CashFlowPage;