import React, { useState } from 'react';
import NavigationBar from '../Navigation/NavigationBar';
import MyAccountPageStyle from '../../styles/components/pages/MyAccountPage.module.css';
import profilePhoto from '../../assets/images/nophoto.svg';
import ChangeButtonSystem from '../MyAccount/ChangeButtonSystem';
import { changeUserName } from '../../services/changeAccountDataService'

function MyAccountPage(props: any) {

    var [showUserNameInput, setShowUserNameInput] = useState(false);
    var [showFirstNameInput, setShowFirstNameInput] = useState(false);
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

    const handleUserNameInputAcceptChange = () => {
        changeUserName()
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
                    <div className={MyAccountPageStyle.userData}>
                        <span className={MyAccountPageStyle.userDataLabel}>Nome de usuário</span>

                        <ChangeButtonSystem
                            PropertyValue={props.user.username}
                            showInput={showUserNameInput}
                            handleFunction={handleShowUserNameInput}
                            handleAcceptChange={handleShowUserNameInput}

                        />

                    </div>

                    <div className={MyAccountPageStyle.userData}>
                        <span className={MyAccountPageStyle.userDataLabel}>Primeiro Nome</span>
                        <ChangeButtonSystem
                            PropertyValue={props.user.firstname}
                            showInput={showFirstNameInput}
                            handleFunction={handleShowFirstNameInput}
                            handleAcceptChange={handleShowFirstNameInput}
                        />
                    </div>

                    <div className={MyAccountPageStyle.userData}>
                        <span className={MyAccountPageStyle.userDataLabel}>Sobrenome</span>
                        <ChangeButtonSystem
                            PropertyValue={props.user.lastname}
                            showInput={showLastNameInput}
                            handleFunction={handleShowLastNameInput}
                            handleAcceptChange={handleShowLastNameInput}
                        />
                    </div>

                    <div className={MyAccountPageStyle.userData}>
                        <span className={MyAccountPageStyle.userDataLabel}>Email</span>
                        <ChangeButtonSystem
                            PropertyValue={props.user.email}
                            showInput={showEmailInput}
                            handleFunction={handleShowEmailInput}
                            handleAcceptChange={handleShowEmailInput}
                        />
                    </div>

                    <div className={MyAccountPageStyle.userData}>
                        <span className={MyAccountPageStyle.userDataLabel}>Telefone</span>
                        <ChangeButtonSystem
                            PropertyValue={props.user.phone}
                            showInput={showPhoneInput}
                            handleFunction={handleShowPhoneInput}
                            handleAcceptChange={handleShowPhoneInput}
                        />
                    </div>

                    <div className={MyAccountPageStyle.userData}>
                        <span className={MyAccountPageStyle.userDataLabel}>Estado</span>
                        <ChangeButtonSystem
                            PropertyValue={props.user.stateplace}
                            showInput={showStatePlaceInput}
                            handleFunction={handleShowStatePlaceInput}
                            handleAcceptChange={handleShowStatePlaceInput}
                        />
                    </div>

                </div>
            </div>
        </div>

    )
}

export default MyAccountPage;