interface UserInterface {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    stateplace: string,
    birth: string
}

 interface UserResponseInterface {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    state: string,
    birth: string
}

export type {
    UserInterface,
    UserResponseInterface
};