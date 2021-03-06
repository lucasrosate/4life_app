import { Dispatch } from 'react';
import { IUser, UserAction } from '../../../../interfaces';
import * as actionType from '../types/userManagementType';
import store from '../store';
import api from '../../api/api';

export const createAccount = (user: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: actionType.LOADING,
            payload: ""
        });

        try {
            const res = await api.post('/signup', {
                firstname: user.firstname,
                lastname: user.lastname,
                password: user.password,
                username: user.username,
                email: user.email,
                state: user.state,
                phone: user.phone
            });    

            if (res.data.success && res.data.isAuthenticated) 
                return dispatch({
                    type: actionType.USER_CREATE_ACCOUNT_SUCCESS,
                    payload: ""
                });

            return dispatch({
                type: actionType.USER_CREATE_ACCOUNT_FAILED,
                payload: "Esse usuário já existe."
            });
        } catch (error) {
            return dispatch({
                type: actionType.USER_CREATE_ACCOUNT_FAILED,
                payload: "Erro durante o registro."
            });
        }
    }
}

export const loginAccount = (username: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: actionType.LOADING,
            payload: ""
        });

        try {
            const res = await api.post('/signin', {
                username: username,
                password: password,
            });


            if (res.data.isAuthenticated) {
                localStorage.setItem('username', username);
                localStorage.setItem('auth-token', res.headers['auth-token']);

                return dispatch({
                    type: actionType.USER_LOGIN_SUCCESS,
                    payload: res.data
                });
            } else {
                return dispatch({
                    type: actionType.USER_LOGIN_FAILED,
                    payload: res.data
                });
            }

        } catch (error) {
            return dispatch({
                type: actionType.USER_LOGIN_FAILED,
                payload: error
            });
        }
    }
}


export const getUserData = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: actionType.LOADING,
            payload: ""
        });

        try {
            const res = await api.post('/getuserinfo', {
                username: localStorage.getItem("username"),
                token: localStorage.getItem("auth-token")
            });

            console.log(res.data);
            if (res.data.isAuthenticated && res.data.success) {
                dispatch({
                    type: actionType.USER_GET_DATA_SUCCESS,
                    payload: res.data.user
                });

            } else {
                dispatch({
                    type: actionType.USER_GET_DATA_FAILED,
                    payload: ""
                });
            }
        } catch (error) {
            dispatch({
                type: actionType.USER_UPDATE_DATA_FAILED,
                payload: ""
            });
        }
    }
}

export const getProfilePicture = () => {
    return async (dispatch: Dispatch<UserAction>) => {

        dispatch({
            type: actionType.LOADING,
            payload: ""
        });

        try {
            const res = await api.post("/getprofilepicture", {
                username: localStorage.getItem("username"),
                token: localStorage.getItem("auth-token"),
                user: store.getState().userReducer.user
            });

            if (res.data.isAuthenticated && res.data.hasPhoto) {
                localStorage.setItem("profile-picture-url", res.data.url);

                return dispatch({
                    type: actionType.USER_GET_PROFILE_PICTURE_SUCCESS,
                    payload: res.data.message
                });
            }
        } catch (error) {
            return dispatch({
                type: actionType.USER_GET_PROFILE_PICTURE_FAILED,
                payload: ""
            });
        }

        return dispatch({
            type: actionType.USER_GET_PROFILE_PICTURE_FAILED,
            payload: ""
        });

    }
}


export const uploadUserPicture = (cropped: { croppedPicture: string, encodedCroppedPicture: Blob }) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: actionType.LOADING,
            payload: ""
        });

        try {
            const res = await api.post("/uploadprofilepicture", {
                username: localStorage.getItem("username"),
                token: localStorage.getItem("auth-token"),
                encodedPicture: cropped.encodedCroppedPicture
            });
            
            if (res.data.success && res.data.isAuthenticated) {
                localStorage.setItem("profile-picture-url", cropped.croppedPicture)

                return dispatch({
                    type: actionType.USER_UPLOAD_PROFILE_PICTURE_SUCCESS,
                    payload: cropped.croppedPicture
                });
            } else {
                return dispatch({
                    type: actionType.USER_GET_PROFILE_PICTURE_FAILED,
                    payload: ""
                });
            }

        } catch (error) {
            return dispatch({
                type: actionType.USER_GET_PROFILE_PICTURE_FAILED,
                payload: ""
            });
        }
    }
}


export const updateUserData = (newValue: string, option: string) => {
    return async (dispatch: Dispatch<UserAction>) => {

        dispatch({
            type: actionType.LOADING,
            payload: ""
        });

        try {
            const res = await api.post("/changeuserproperty", {
                username: localStorage.getItem("username"),
                token: localStorage.getItem("auth-token"),
                newValue: newValue,
                option: option
            });

            if (res.data.success && res.data.isAuthenticated) {
                return dispatch({
                    type: actionType.USER_UPDATE_DATA_SUCCESS,
                    payload: { newValue: newValue, option: option }
                });

            } else {
                return dispatch({
                    type: actionType.USER_UPDATE_DATA_FAILED,
                    payload: { option: option }
                });
            }
        } catch (error) {
            return dispatch({
                type: actionType.USER_UPDATE_DATA_FAILED,
                payload: ""
            });
        }
    }
}


export const resetFormStatus = () => {
    return (dispatch: Dispatch<UserAction>) => {
        return dispatch({
            type: actionType.USER_RESET_FORM_STATUS,
            payload: ""
        });
    }
}

export const registrationSuccess = () => {
    return (dispatch: Dispatch<UserAction>) => {
        return dispatch({
            type: actionType.USER_REGISTRATION_SUCCESS,
            payload: "Conta criada com sucesso! Um e-mail para confirmar sua conta foi enviado para você."
        });
    }
}