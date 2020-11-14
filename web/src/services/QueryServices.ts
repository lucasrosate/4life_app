import api from './apis';
import { UserInterface, UserResponseInterface } from '../interfaces/UserInterface';


async function getUserInfo() {
    if (!Boolean(localStorage.getItem("isLoggedIn"))) return false;

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("auth-token");

    if (username === undefined || token === undefined) return false;

    var resData = {
        user: <UserInterface>
            {
                username: '',
                firstname: '',
                lastname: '',
                email: '',
                phone: '',
                stateplace: '',
                birth: ''
            },
        success: false,
        message: "Failed"
    }

    return await api.post('getuserinfo', {
        username: username,
        token: token
    }
    )
        .then((res: any) => {
            const data: UserResponseInterface = res.data.user;

            resData = {
                user: {
                    username: data.username,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phone: data.phone,
                    stateplace: data.state,
                    birth: new Date(data.birth).toLocaleString("pt-BR").split(" ")[0]
                },

                success: true,
                message: "It was a Success"
            }

            return resData;
        })
        .catch((err: any) => {
            if (err) {
                return resData;
            }
        });

}

export default getUserInfo;