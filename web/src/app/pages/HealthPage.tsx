import React from 'react';
import NavigationBar from '../components/Navigation/NavigationBar'
import CSSTransition from 'react-transition-group/CSSTransition';

const { useEffect, useState } = React;

const HealthPage: React.FC = () => {
    const [showPage, setShowPage] = useState<boolean>(false);

    useEffect(() => {
        setShowPage(true);
    }, []);

    return (

        <>
            <CSSTransition
                in={showPage}
                timeout={600}
                classNames="fade"
                mountOnEnter
            >

                <div className="content-container">
                    <h1>HealthPage</h1>
                </div>
            </CSSTransition>
        </>
    )
}

export default HealthPage;