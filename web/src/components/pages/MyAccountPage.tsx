import React, { useEffect, useState } from 'react';


import NavigationBar from '../Navigation/NavigationBar';
import InputChangeSystem from '../MyAccountPage/InputChangeSystem';
import SelectChangeSystem from '../MyAccountPage/SelectChangeSystem';
import DateChangeSystem from '../MyAccountPage/DateChangeSystem';

//Executa a troca das variáveis
import {
    changeUserNameService,
    changeFirstNameService,
    changeLastNameService,
    changeEmailService,
    changePhoneService,
    changeStatePlaceService,
    changeBirthService,
} from '../../services/changeAccountDataService';

//Estilos
import MyAccountPageStyle from '../../styles/components/pages/MyAccountPage.module.css';
import profileNoPhoto from '../../assets/images/nophoto.svg';
import ChangePictureSystem from '../MyAccountPage/ChangePictureSystem';

//Lista de estados
let estados: Estados = require('../../assets/files/estados.json');

//Inteface
interface Props {
    user: {
        username: string,
        firstname: string,
        lastname: string,
        email: string,
        phone: string,
        stateplace: string,
        birth: string
    },
    handleChangeIsLoggedIn: Function,
    updateUserInfo: Function
}


interface Estados {
    UF: [{
        name: string,
        abbrev: string
    }]
}



function MyAccountPage(props: Props) {
    //Picture
    var [uncroppedPicture, setUncroppedPicture] = useState<string | null>(null)
    var [croppedPicture, setCroppedPicture] = useState<string | null>(null);
    var [showCropPictureWindow, setShowCropPictureWindow] = useState(false);

    var checkPhoto = () => croppedPicture === null ? profileNoPhoto : uncroppedPicture;

    const handleShowCropPictureWindow = () => setShowCropPictureWindow(!showCropPictureWindow);

    const uploadPicture = (e: any) => {
        setUncroppedPicture(URL.createObjectURL(e.target.files[0]))
        handleShowCropPictureWindow();
    }
    
    
    const handleCroppedPicture = (croppedPic: any) => {
        if(croppedPic !== null) setCroppedPicture(URL.createObjectURL(croppedPic));
        setUncroppedPicture(null);
    };

    //user Data
    var [showUserNameInput, setShowUserNameInput] = useState(false);
    var [showFirstNameInput, setShowFirstNameInput] = useState(false);
    var [showLastNameInput, setShowLastNameInput] = useState(false);
    var [showEmailInput, setShowEmailInput] = useState(false);
    var [showPhoneInput, setShowPhoneInput] = useState(false);
    var [showStatePlaceInput, setShowStatePlaceInput] = useState(false);
    var [showBirthInput, setShowBirthInput] = useState(false);


    const handleShowUserNameInput = () => setShowUserNameInput(!showUserNameInput);
    const handleShowFirstNameInput = () => setShowFirstNameInput(!showFirstNameInput);
    const handleShowLastNameInput = () => setShowLastNameInput(!showLastNameInput);
    const handleShowEmailInput = () => setShowEmailInput(!showEmailInput);
    const handleShowPhoneInput = () => setShowPhoneInput(!showPhoneInput);
    const handleShowStatePlaceInput = () => setShowStatePlaceInput(!showStatePlaceInput);
    const handleShowBirthInput = () => setShowBirthInput(!showBirthInput);

    //CheckChangeSuccess() -> Chama a api e tenta mudar, caso retorne um erro apenas fecha a janela de input
    const checkChangeSuccess = async (newVal: string, changeFunction: Function, option: number) => {
        const data = await changeFunction(newVal, option)
        if (data.success && option === 0) localStorage.setItem("username", newVal);
        if (data.success) props.updateUserInfo();
    }




    //CONTEXTO
    //Opção 0: user.username
    //Opção 1: user.firstname
    //Opção 2: user.lastname
    //Opção 3: user.email
    //Opção 4: user.phone
    //Opção 5: user.stateplace
    //Opção 6: user.birth


    //Cada função chama a função de troca CheckSuccess()
    const handleUserNameInputAcceptChange = async (newUserName: string) => checkChangeSuccess(newUserName, changeUserNameService, 0);
    const handleUserFirstNameInputAcceptChange = async (newFirstName: string) => checkChangeSuccess(newFirstName, changeFirstNameService, 1);
    const handleUserLastNameInputAcceptChange = async (newFirstName: string) => checkChangeSuccess(newFirstName, changeLastNameService, 2);
    const handleEmailInputAcceptChange = async (newEmail: string) => checkChangeSuccess(newEmail, changeEmailService, 3);
    const handlePhoneInputAcceptChange = async (newEmail: string) => checkChangeSuccess(newEmail, changePhoneService, 4);
    const handleStatePlaceInputAcceptChange = async (newEmail: string) => checkChangeSuccess(newEmail, changeStatePlaceService, 5);
    const handleStateBirthInputAcceptChange = async (newEmail: string) => checkChangeSuccess(newEmail, changeBirthService, 6);

    return (
        <>
            {showCropPictureWindow ?
                <ChangePictureSystem
                    Picture={uncroppedPicture!}
                    handleCroppedPicture={handleCroppedPicture}
                    handleShowCropPictureWindow={handleShowCropPictureWindow} /> : null}
            
            
            <div className={MyAccountPageStyle.pageContainer}>

                <NavigationBar
                    user={props.user}
                    handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
                />

                <div className="content-container">


                    <div className={MyAccountPageStyle.profileContainer}>

                        <div className={MyAccountPageStyle.userProfileImgBox}>
                            <div className={MyAccountPageStyle.userProfileImg}>
                                <img src={checkPhoto()!} alt="profile" />
                                <input
                                    className={MyAccountPageStyle.inputProfileImg}
                                    id="inputProfileImgFile"
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={(e) => uploadPicture(e)}
                                    hidden />
                                <label htmlFor="inputProfileImgFile">Trocar a foto</label>
                            </div>

                            <div className={MyAccountPageStyle.userprofileImgInfo}>
                                <p>Para mudar a foto de perfil, a imagem deve ser no formato .png, .jpg ou .jpeg e pesar no máximo 1 mb.</p>

                            </div>

                        </div>



                        <div className={MyAccountPageStyle.userInfoContainer}>
                            {/* username */}
                            <InputChangeSystem
                                label="Nome de Usuário"
                                PropertyValue={props.user.username}
                                showInput={showUserNameInput}
                                handleExitChange={handleShowUserNameInput}
                                handleAcceptChange={handleUserNameInputAcceptChange}
                                trim={true}

                            />


                            {/* Primeiro nome */}
                            <InputChangeSystem
                                label="Primeiro nome"
                                PropertyValue={props.user.firstname}
                                showInput={showFirstNameInput}
                                handleExitChange={handleShowFirstNameInput}
                                handleAcceptChange={handleUserFirstNameInputAcceptChange}
                            />



                            {/* Sobrenome */}
                            <InputChangeSystem
                                label="Sobrenome"
                                PropertyValue={props.user.lastname}
                                showInput={showLastNameInput}
                                handleExitChange={handleShowLastNameInput}
                                handleAcceptChange={handleUserLastNameInputAcceptChange}
                            />


                            {/* Email */}
                            <InputChangeSystem
                                label="E-mail"
                                PropertyValue={props.user.email}
                                showInput={showEmailInput}
                                handleExitChange={handleShowEmailInput}
                                handleAcceptChange={handleEmailInputAcceptChange}
                            />



                            {/* Telefone */}
                            <InputChangeSystem
                                label="Telefone"
                                PropertyValue={props.user.phone}
                                showInput={showPhoneInput}
                                handleExitChange={handleShowPhoneInput}
                                handleAcceptChange={handlePhoneInputAcceptChange}
                                onlyNumber={true}
                                minLength={9}
                                maxLength={9}
                            />


                            {/* Estado */}
                            <SelectChangeSystem
                                label="Estado"
                                PropertyValue={props.user.stateplace}
                                SelectListProperties={estados.UF}
                                showInput={showStatePlaceInput}
                                handleExitChange={handleShowStatePlaceInput}
                                handleAcceptChange={handleStatePlaceInputAcceptChange}
                            />



                            {/* Estado */}
                            <DateChangeSystem
                                label="Data de nascimento"
                                PropertyValue={props.user.birth}
                                showInput={showBirthInput}
                                handleExitChange={handleShowBirthInput}
                                handleAcceptChange={handleStateBirthInputAcceptChange}
                            />


                        </div>


                    </div>

                </div>

            </div>

        </>

    )
}



export default MyAccountPage;