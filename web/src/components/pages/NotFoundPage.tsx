import React, { CSSProperties } from 'react';
import {FcGlobe} from 'react-icons/fc';

function NotFoundPage () {

    const errorStyle: CSSProperties  = {
        display: "flex",
        height: "100vh",
        alignItems: "center",
        textAlign: "center"
    }

    const errorMessage: CSSProperties  = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "150%",
        textAlign: "center",
        color: "red"
    }


    return (
        <div style={errorStyle}><h1 style={errorMessage}>Erro 404: A página que você deseja visualizar não foi encontrada.</h1> <FcGlobe size={800}/></div>
    )
}

export default NotFoundPage