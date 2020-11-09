import api from './api';

interface Data {
    username: string,
    password: string,
}

// data = {Obj} injetado do react-hook-form

// Função para autenticar o usuário
async function signinService(data: Data) {
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


async function registerService(data: any) {
    return await api.post('signup', {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        password: data.password1,
        email: data.email,
        state: data.stateplace,
        phone: data.phonenumber
    }).then((res: any) => {
        return true;
    }, err => {
        if (err) return false;
    }
    )

    return false;
}

export { signinService, registerService };