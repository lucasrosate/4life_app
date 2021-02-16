import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetFormStatus, registrationSuccess } from '../../store/actions/userActions';
import CSSTransition from 'react-transition-group/CSSTransition';
import Container from './Container';
import UserLogin from './UserLogin';
import LostMyAccount from './LostMyAccount';





interface Props {
    successForms: boolean,
    showRegistrationFormFunction: Function,
    userLoggedIn: Function,
    responseMessage: string
}

const LoginForm: React.FC<Props> = (props: Props) => {

    const delay = 200;
    const classNameUserLogin = "swipe-right";
    const classNameLostMyAccount = "swipe-left";

    const dispatch = useDispatch();

    var [showUserLogin, setShowUserLogin] = useState<boolean>(true);
    var [showLostMyPass, setShowLostMyPass] = useState<boolean>(false);

    const toggleWindow = () => {
        if(showLostMyPass) {
            setShowLostMyPass(!showLostMyPass);
            setTimeout(()=>setShowUserLogin(!showUserLogin), delay);
        } else {
            setShowUserLogin(!showUserLogin);
            setTimeout(()=> setShowLostMyPass(!showLostMyPass), delay);
        }
     
    }


    useEffect(() => {
        if (props.successForms) {
            dispatch(resetFormStatus());
            dispatch(registrationSuccess());
        }
    }, [])

    return (
        <Container width={"350px"} height={"380px"}>
            <CSSTransition
                in={showUserLogin}
                timeout={delay}
                classNames={classNameUserLogin}
                mountOnEnter
                unmountOnExit
            >
                <UserLogin
                    successForms={props.successForms}
                    showRegistrationFormFunction={props.showRegistrationFormFunction}
                    userLoggedIn={props.userLoggedIn}
                    responseMessage={props.responseMessage}
                    toggleWindow={toggleWindow}
                />

            </CSSTransition>


            <CSSTransition
                in={showLostMyPass}
                timeout={delay}
                classNames={classNameLostMyAccount}
                mountOnEnter
                unmountOnExit
            >
                <LostMyAccount toggleWindow={toggleWindow} />


            </CSSTransition>
        </Container>
    )

}

export default LoginForm;