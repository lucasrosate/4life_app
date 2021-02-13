export interface CallbackType { (): void }

export interface IUser {
    firstname: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    state: string,
    phone: string,
    birth?: Date
}

export interface IDiet {
    name: string,
    quantity: string,
    weight: number,
    weight_unit: string,
    calories: number
}

export interface IPhoto {
    filename?: string
    _user?: string,

    temporaryLink: {
        src?: string,
        created_at?: string
    }

}

export interface ITemporaryLink { 
    link: string, 
    status: number
} 