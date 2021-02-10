
import { IUser, UserAction, UserState } from "../../../../interfaces";
import * as actionTypes from '../types/userManagementType';
import { Reducer } from "redux";


const userInitialState: UserState = {
    user: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        state: "",
        phone: "",
        profilePhoto: ""
    },
    formSubmitted: false,
    loading: true,
    responseMessage: ""

}


export const userReducer: Reducer<UserState, UserAction> =
    (state: UserState = userInitialState, userAction: UserAction) => {
        switch (userAction.type) {
            case actionTypes.LOADING:
                return {
                    ...state,
                    loading: true
                };

            case actionTypes.USER_CREATE_ACCOUNT_SUCCESS:
                return {
                    ...state,
                    responseMessage: "",
                    loading: false
                };

            case actionTypes.USER_CREATE_ACCOUNT_FAILED:
                return {
                    ...state,
                    responseMessage: "Erro durante a criação da conta.",
                    loading: false
                }


            case actionTypes.USER_LOGIN_SUCCESS:
                return {
                    ...state,
                    responseMessage: "",
                    loading: false
                };

            case actionTypes.USER_LOGIN_FAILED:
                return {
                    ...state,
                    responseMessage: "O seu login ou sua senha ou ambos incorretos. Verifique e tente novamente",
                    loading: false
                }

            case actionTypes.USER_UPDATE_DATA_SUCCESS:
                const user: IUser = userAction.payload;
                console.log(user);
                return {
                    ...state,
                    user: user
                }

            case actionTypes.USER_UPDATE_DATA_FAILED:

                return {
                    ...state
                }

            case actionTypes.USER_UPDATE_PROFILE_PICTURE_SUCCESS:
                return {
                    ...state,
                    user: {
                        ...state.user,
                        profilePhoto: localStorage.getItem("profile-picture-url")
                    }
                }

            case actionTypes.USER_UPDATE_PROFILE_PICTURE_FAILED:
                return {
                    ...state
                }

            case actionTypes.USER_UPLOAD_PROFILE_PICTURE_SUCCESS:
                return {
                    ...state,
                    user: {
                        ...state.user,
                        profilePhoto: localStorage.getItem("profile-picture-url")
                    }
                }

            case actionTypes.USER_UPLOAD_PROFILE_PICTURE_FAILED:
                return {
                    ...state
                }

            default: return state;
        }
    }

