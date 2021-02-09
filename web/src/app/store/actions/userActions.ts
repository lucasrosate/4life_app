import { Dispatch } from 'react';
import { IUser, UserAction } from '../../../../interfaces';
import * as actionType from '../types/userManagementType';

import api from '../../api/api';

export const createAccount = (user: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: actionType.USER_CREATE_ACCOUNT,
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
            return dispatch({
                type: actionType.USER_CREATE_ACCOUNT_SUCCESS,
                payload: res.data
            });
        } catch (error) {
            return dispatch({
                type: actionType.USER_CREATE_ACCOUNT_FAILED,
                payload: error
            });
        }
    }
}

export const loginAccount = (username: string, password: string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: actionType.USER_LOGIN,
            payload: ""
        });

        try {
            const res = await api.post('/signin', {
                username: username,
                password: password,
            });


            if (res.data.success) {
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


export const updateUserData = (user: IUser) => {
    return (dispatch: Dispatch<UserAction>) => {
        dispatch({
            type: actionType.USER_UPDATE_DATA,
            payload: user
        })
    }
}
