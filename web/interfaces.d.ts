

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
    birth?: string,
    profilePhoto?: string | null,
    authentication?: {
        isValid?: boolean
    }
}

export interface IRoute {
    path: string,
    name: string
}

export type UserAction = {
    type: string,
    payload: any
}

export type UserState = {
    user: IUser,
    loading: boolean,
    responseMessage: string,
    successForms: boolean,
    responseError: {
        firstname: string,
        lastname: string,
        username: string,
        password: string,
        email: string,
        state:string,
        phone: string,
        birth?: string,
        profilePhoto?: string,
    }
}

export type DispatchType = (args: ArticleAction) => ArticleAction;


export type StoreState = {
    userReducer:UserState
}