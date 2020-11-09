import api from './api';

async function getUserInfo() {
    if (!Boolean(localStorage.getItem("isLoggedIn"))) return false;

    const username = localStorage.getItem("username");
    const token = localStorage.getItem("auth-token");

    if (username === undefined || token === undefined) return false;

    var resData = {
        user: {
            username: '',
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            stateplace: '',
        },
        success: false,
        message: "Failed"
    }

    return await api.post('getuserinfo', { username: username, token: token })
        .then((res: any) => {
            const data = res.data.user;

            resData = {
                user: {
                    username: data.username,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    phone: data.phone,
                    stateplace: data.stateplace
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