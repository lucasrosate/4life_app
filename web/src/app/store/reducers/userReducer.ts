
import { IUser, UserAction, UserState } from "../../../../interfaces";
import * as actionTypes from '../types/userManagementType';

import api from '../../api/api';
import { Reducer } from "redux";


interface IApiDataResponse {
    success: boolean,
    message: string
}

interface ILogAction {
    success: boolean,
    message?: string
}
const userInitialState: UserState = {
    user: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        state: "",
        phone: ""
    },
    formSubmitted: false,
    loading: true,
    responseMessage: ""

}


export const userReducer: Reducer<UserState, UserAction> =
    (state: UserState = userInitialState, userAction: UserAction) => {
        switch (userAction.type) {
            case actionTypes.USER_CREATE_ACCOUNT:
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

            case actionTypes.USER_LOGIN:
                return {
                    ...state,
                    loading: true
                };

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

            case actionTypes.USER_UPDATE_DATA:
                const user: IUser = userAction.payload;

                return {
                    ...state,
                    user: user
                }

            default: return state;
        }
    }

