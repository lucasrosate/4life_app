import React, { useState } from 'react';
import NavigationBar from '../Navigation/NavigationBar';
import MyAccountPageStyle from '../../styles/components/pages/MyAccountPage.module.css';
import profilePhoto from '../../assets/images/nophoto.svg';
import ChangeButtonSystem from '../MyAccount/ChangeButtonSystem';
import ChangeStateButtonSystem from '../MyAccount/ChangeStateButtonSystem';
import ChangeBirthButtonSystem from '../MyAccount/ChangeBirthButtonSystem';
import { changeUserName } from '../../services/changeAccountDataService'


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




function MyAccountPage(props: Props) {

    //username
    var [showUserNameInput, setShowUserNameInput] = useState(false);
    var [showFirstNameInput, setShowFirstNameInput] = useState(false);
    var [firstNameErrorMessage, setFirstNameInput] = useState('');



    var [showLastNameInput, setShowLastNameInput] = useState(false);
    var [showEmailInput, setShowEmailInput] = useState(false);
    var [showPhoneInput, setShowPhoneInput] = useState(false);
    var [showStatePlaceInput, setShowStatePlaceInput] = useState(false);


    const handleShowUserNameInput = () => setShowUserNameInput(!showUserNameInput);
    const handleShowFirstNameInput = () => setShowFirstNameInput(!showFirstNameInput);
    const handleShowLastNameInput = () => setShowLastNameInput(!showLastNameInput);
    const handleShowEmailInput = () => setShowEmailInput(!showEmailInput);
    const handleShowPhoneInput = () => setShowPhoneInput(!showPhoneInput);
    const handleShowStatePlaceInput = () => setShowStatePlaceInput(!showStatePlaceInput);

    const handleUserNameInputAcceptChange = async (newUserName: string) => {
        const data = await changeUserName(newUserName)

        console.log(data);

        if (data.success) {
            localStorage.setItem("username", newUserName);
            props.updateUserInfo();
        } else {
        }


    };



    return (
        <div className={MyAccountPageStyle.pageContainer}>
            <NavigationBar
                user={props.user}
                handleChangeIsLoggedIn={props.handleChangeIsLoggedIn}
            />

            <div className={MyAccountPageStyle.profileContainer}>

                <div className={MyAccountPageStyle.userProfileImg}>
                    <img src={profilePhoto} alt="profile" />

                    <div className={MyAccountPageStyle.userprofileImgInfo}>
                        <p>Para mudar a foto de perfil, a imagem deve ser no formato .png, .jpg ou .jpeg e pesar no máximo 1 mb.</p>
                        <button className="btn">Mudar foto de perfil</button>
                    </div>

                </div>


                <div className={MyAccountPageStyle.userInfoContainer}>
                        {/* username */}
                        <ChangeButtonSystem
                            label="Nome de Usuário"
                            PropertyValue={props.user.username}
                            showInput={showUserNameInput}
                            handleFunction={handleShowUserNameInput}
                            handleAcceptChange={handleUserNameInputAcceptChange}
                            trim={true}

                        />


                        {/* Primeiro nome */}
                        <ChangeButtonSystem
                            label="Primeiro nome"
                            PropertyValue={props.user.firstname}
                            showInput={showFirstNameInput}
                            handleFunction={handleShowFirstNameInput}
                            handleAcceptChange={handleShowFirstNameInput}
                        />

                    

                        {/* Sobrenome */}
                        <ChangeButtonSystem
                            label="Sobrenome"
                            PropertyValue={props.user.lastname}
                            showInput={showLastNameInput}
                            handleFunction={handleShowLastNameInput}
                            handleAcceptChange={handleShowLastNameInput}
                        />


                        {/* Email */}
                        <ChangeButtonSystem
                            label="E-mail"
                            PropertyValue={props.user.email}
                            showInput={showEmailInput}
                            handleFunction={handleShowEmailInput}
                            handleAcceptChange={handleShowEmailInput}
                        />



                        {/* Telefone */}
                        <ChangeButtonSystem
                            label="Telefone"
                            PropertyValue={props.user.phone}
                            showInput={showPhoneInput}
                            handleFunction={handleShowPhoneInput}
                            handleAcceptChange={handleShowPhoneInput}
                        />



                        {/* Estado */}
                        <ChangeStateButtonSystem
                            PropertyValue={props.user.stateplace}
                            showInput={showStatePlaceInput}
                            handleFunction={handleShowStatePlaceInput}
                            handleAcceptChange={handleShowStatePlaceInput}
                        />



                        {/* Estado */}
                        <ChangeBirthButtonSystem
                            PropertyValue={props.user.stateplace}
                            showInput={showStatePlaceInput}
                            handleFunction={handleShowStatePlaceInput}
                            handleAcceptChange={handleShowStatePlaceInput}
                        />


                    </div>

                
            </div>
        </div>

    )
}

export default MyAccountPage;