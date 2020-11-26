import React, { CSSProperties } from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';
import { FcGlobe } from 'react-icons/fc';

const { useEffect, useState } = React;


const NotFoundPage: React.FC = () => {
    const [showPage, setShowPage] = useState(false);

    const errorStyle: CSSProperties = {
        display: "flex",
        height: "100vh",
        alignItems: "center",
        textAlign: "center"
    }

    const errorMessage: CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "150%",
        textAlign: "center",
        color: "red"
    }

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
                <div style={errorStyle}>
                    <h1 style={errorMessage}>
                        Erro 404: A página que você deseja visualizar não foi encontrada.
            </h1>
                    <FcGlobe size={800} />
                </div>
            </CSSTransition>
        </>
    )
}

export default NotFoundPage;