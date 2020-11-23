import React from 'react';
import NavigationBar from '../Navigation/NavigationBar';

import { PagesProps } from '../../interfaces/UserInterface';

const CashFlowPage: React.FC <PagesProps> = (props: PagesProps) => {
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