import api from './api';

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


const logoutService = async () => {
    localStorage.removeItem("auth-token")
    localStorage.removeItem("username")
    localStorage.removeItem("isLoggedIn")

    return;
}

export { signinService, logoutService };