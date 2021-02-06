import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

//Estilos
import style from '../styles/pages/MyAccountPage.module.css';
import profileNoPhoto from '../assets/images/nophoto.svg';

import docEstados from '../assets/files/estados.json';
import { IStates } from '../../../interfaces';

const estados: IStates = typeof(docEstados) == 'string'? JSON.parse(docEstados): null;

const { useState, useEffect } = React;

const MyAccountPage: React.FC = () => {

    //Page
    const [showPage, setShowPage] = useState(false);

    //Picture
    var [croppedPicture, setCroppedPicture] = useState<string>('');
    var [showCropPictureWindow, setShowCropPictureWindow] = useState(false);
    var [profilePhoto, setProfilePhoto] = useState<string | null>(null);

    const handleShowCropPictureWindow = () => setShowCropPictureWindow(!showCropPictureWindow);



    useEffect(() => {
        setShowPage(true);
        setProfilePhoto(localStorage.getItem('profile-picture-url'));
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
                            
                            {/* <ChangePictureSystem
                                handleCroppedPicture={handleCroppedPicture}
                                handleShowCropPictureWindow={handleShowCropPictureWindow} /> */}

                        </CSSTransition>



                        <div className={style.profileContainer}>

                            <div className={style.userProfileImgBox}>
                                <div className={style.userProfileImg}>
                                    <img src={profilePhoto || profileNoPhoto} alt="profile" />

                                    <button onClick={handleShowCropPictureWindow}>Mudar foto de perfil</button>
                                </div>

                                <div className={style.userprofileImgInfo}>
                                    <p>Para mudar a foto de perfil, a imagem deve ser no formato .png, .jpg ou .jpeg e pesar no máximo 1 mb.</p>

                                </div>

                            </div>

                            <div className={style.userInfoContainer}>
                                {/* username */}
                                {/* <InputChangeSystem
                                    label="Nome de Usuário"
                                    PropertyValue={userProfile.user.username}
                                    showInput={showUserNameInput}
                                    handleExitChange={handleShowUserNameInput}
                                    handleAcceptChange={handleUserNameInputAcceptChange}
                                    trim={true}

                                />


                                {/* Primeiro nome */}
                                {/* <InputChangeSystem
                                    label="Primeiro nome"
                                    PropertyValue={userProfile.user.firstname}
                                    showInput={showFirstNameInput}
                                    handleExitChange={handleShowFirstNameInput}
                                    handleAcceptChange={handleUserFirstNameInputAcceptChange}
                                /> */}



                                {/* Sobrenome */}
                                {/* <InputChangeSystem
                                    label="Sobrenome"
                                    PropertyValue={userProfile.user.lastname}
                                    showInput={showLastNameInput}
                                    handleExitChange={handleShowLastNameInput}
                                    handleAcceptChange={handleUserLastNameInputAcceptChange}
                                /> */}


                                {/* Email */}
                                {/* <InputChangeSystem
                                    label="E-mail"
                                    PropertyValue={userProfile.user.email}
                                    showInput={showEmailInput}
                                    handleExitChange={handleShowEmailInput}
                                    handleAcceptChange={handleEmailInputAcceptChange}
                                /> */}



                                {/* Telefone */}
                                {/* <InputChangeSystem
                                    label="Telefone"
                                    PropertyValue={userProfile.user.phone}
                                    showInput={showPhoneInput}
                                    handleExitChange={handleShowPhoneInput}
                                    handleAcceptChange={handlePhoneInputAcceptChange}
                                    onlyNumber={true}
                                    minLength={8}
                                    maxLength={9}
                                /> */}


                                {/* Estado */}
                                {/* <SelectChangeSystem
                                    label="Estado"
                                    PropertyValue={userProfile.user.stateplace}
                                    SelectListProperties={estados.UF}
                                    showInput={showStatePlaceInput}
                                    handleExitChange={handleShowStatePlaceInput}
                                    handleAcceptChange={handleStatePlaceInputAcceptChange}
                                /> */}



                                {/* Estado */}
                                {/* <DateChangeSystem
                                    label="Data de nascimento"
                                    PropertyValue={userProfile.user.birth}
                                    showInput={showBirthInput}
                                    handleExitChange={handleShowBirthInput}
                                    handleAcceptChange={handleStateBirthInputAcceptChange}
                                /> */}


                            </div>


                        </div>

                    </div>
                </CSSTransition>
            </div>

        </ >

    )
}

export default MyAccountPage;