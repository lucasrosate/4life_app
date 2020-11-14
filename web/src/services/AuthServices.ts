import api from './apis';

interface Data {
    username: string,
    password: string,
}

// data = {Obj} injetado do react-hook-form

// Função para autenticar o usuário
const signinService = async (data: Data) => {
    return await api.post('signin',
        {
            username: data.username,
            password: data.password

        }).then((res: any) => {
            localStorage.setItem("auth-token", res.headers['auth-token']);
            localStorage.setItem("username", data.username);
            localStorage.setItem("isLoggedIn", "true");
            return true;

        }).catch((err: any) => {
            if (err) {
                return false;
            }
        });
}

const getUploadTokenService = async () => {
    return await api.post('/getuploadtoken', {
        username: localStorage.getItem('username'),
        token: localStorage.getItem("auth-token")
    })
    .then(res => {
        return res.data;
    })
    .catch(err => err.response.data);
}


const logoutService = async () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("username")
    localStorage.removeItem("isLoggedIn")

    return;
}




export { signinService, logoutService };