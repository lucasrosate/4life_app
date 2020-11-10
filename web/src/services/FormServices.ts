import api from './api';

// data = {Obj} injetado do react-hook-form

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
}

export { registerService };