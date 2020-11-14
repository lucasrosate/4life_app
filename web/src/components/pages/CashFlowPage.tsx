import React from 'react';
import NavigationBar from '../Navigation/NavigationBar';

function CashFlowPage(props: any) {
    return (
        <div>
            <div>
                <NavigationBar
                    user={props.user}
                    handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
                />
            </div>

            <div className="content-container">
            </div>

        </div>

    )
}

export default CashFlowPage;