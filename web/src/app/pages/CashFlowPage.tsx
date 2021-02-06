import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

const { useEffect, useState } = React;

const CashFlowPage: React.FC = () => {
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
                    <h1>CashFlowPage</h1>
                </div>
            </CSSTransition>
        </>
    )
}

export default CashFlowPage;