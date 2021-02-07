import { Dispatch } from 'react';
import { IUser, UserAction } from '../../../../interfaces';
import * as actionType from '../types/userManagementType';

import api from '../../api/api';



export const createAccount = (user: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
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
                type: actionType.USER_CREATE_ACCOUNT,
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
