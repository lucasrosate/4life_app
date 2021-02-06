
import Store from 'redux';

export interface IStates {
    UF: [{
        name: string,
        abbrev: string
    }]
}

export interface IUser {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    state:string,
    phone: string,
    birth?: string
}

export type UserAction = {
    type: string,
    payload: string
}

export type UserState = {
    user: IUser,
}

export type dispatchType = (args: UserAction) => UserAction;