import React from 'react';
import { useSelector } from 'react-redux';

import ChangePictureSystem from '../components/MyAccountPage/ChangePictureSystem';
import InputChangeSystem from '../components/MyAccountPage/InputChangeSystem';
import SelectChangeSystem from '../components/MyAccountPage/SelectChangeSystem';
import DateChangeSystem from '../components/MyAccountPage/DateChangeSystem';


//Estilos
import style from '../styles/pages/MyAccountPage.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import profileNoPhoto from '../assets/images/nophoto.svg';

import { IStates, IUser, StoreState } from '../../../interfaces';

const estados: IStates = require('../assets/files/estados.json');

const { useState, useEffect } = React;

const MyAccountPage: React.FC = () => {

    //Page
    const [showPage, setShowPage] = useState(false);

    //Picture
    var user: IUser = useSelector((state: StoreState) => state.userReducer.user);
    var profilePictureUrl = useSelector((state: StoreState) => state.userReducer.user.profilePhoto);

    var [showCropPictureWindow, setShowCropPictureWindow] = useState(false);

    
    const handleShowCropPictureWindow = () => setShowCropPictureWindow(!showCropPictureWindow);


    useEffect(() => {
        setShowPage(true);
    }, []);


    return (
        <>
            <div className={style.pageContainer}>

                <CSSTransition
                    in={showPage}
                    timeout={1000}
                    classNames="fade"
                    mountOnEnter
                >

                    <div className="content-container">
                        <CSSTransition
                            in={showCropPictureWindow}
                            timeout={400}
                            classNames={{
                                enter: style.AnimationEnter,
                                enterActive: style.AnimationEnterActive,
                                exit: style.AnimationExit,
                                exitActive: style.AnimationExitActive
                            }}
                            mountOnEnter
                            unmountOnExit
                        >

                            <ChangePictureSystem
                                handleShowCropPictureWindow={handleShowCropPictureWindow} />

                        </CSSTransition>



                        <div className={style.profileContainer}>

                            <div className={style.userProfileImgBox}>
                                <div className={style.userProfileImg}>
                                    <img src={profilePictureUrl? profilePictureUrl: profileNoPhoto} alt="profile" />

                                    <button onClick={handleShowCropPictureWindow}>Mudar foto de perfil</button>
                                </div>

                                <div className={style.userprofileImgInfo}>
                                    <p>Para mudar a foto de perfil, a imagem deve ser no formato .png, .jpg ou .jpeg e pesar no máximo 1 mb.</p>

                                </div>

                            </div>
                            <div className={style.userInfoContainer}>
                                {/* username */}
                                <InputChangeSystem
                                    label="Nome de Usuário"
                                    PropertyValue={user.username}
                                    trim={true}
                                    showInput={true}
                                />

                                {/* Primeiro nome */}
                                <InputChangeSystem
                                    label="Primeiro nome"
                                    PropertyValue={user.firstname}
                                    showInput={true}
                                />

                                {/* Sobrenome */}
                                <InputChangeSystem
                                    label="Sobrenome"
                                    PropertyValue={user.lastname}
                                    showInput={true}
                                />

                                {/* Email */}
                          <InputChangeSystem
                                    label="E-mail"
                                    PropertyValue={user.email}
                                    showInput={true}
                                />

                                {/* Telefone */}
                                <InputChangeSystem
                                    label="Telefone"
                                    PropertyValue={user.phone}
                                    showInput={true}
                                    onlyNumber={true}
                                    minLength={8}
                                    maxLength={9}
                                />


                                {/* Estado */}
                                <SelectChangeSystem
                                    label="Estado"
                                    PropertyValue={user.state}
                                    SelectListProperties={estados.UF}
                                    showInput={true}
                                /> 



                                {/* Estado */}
                                <DateChangeSystem
                                    label="Data de nascimento"
                                    PropertyValue={user.birth || "1900-01-01T00:00:00.000+00:00"}
                                    showInput={true}
                                />


                            </div>


                        </div>

                    </div>
                </CSSTransition>
            </div>

        </ >

    )
}

export default MyAccountPage;