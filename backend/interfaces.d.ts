export interface CallbackType { (): void }

export interface IUser {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    state:string,
    phone: string,
    birth?: Date
}

export interface IPhoto {
    filename?: string
    _user?: string,

    temporaryLink: {
        src?: string,
        created_at?: string
    }

}