import { IUser } from "../../interfaces";

const UserView = (user: IUser) => {
    return {
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        email: user.email,
        state: user.state,
        phone: user.phone,
        birth: user.birth,
        authentication: {
            isValid: user.authentication.isValid
        }
    }
}

export default UserView;