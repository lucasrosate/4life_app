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
            isActivated: user.authentication.isActivated,
            tokenType: user.authentication.tokenType
        }
    }
}

export default UserView;