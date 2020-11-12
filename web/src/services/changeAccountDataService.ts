import api from './api';

const changeUserName = async (newVal: string) => {
    return await api.post('/changeuserproperty',
        {
            username: localStorage.getItem("username"),
            newVal: newVal,
            option: 0
        })
        .then((res: any) => res.data)
        .catch((err: any) => err.response.data);
    
}

export {changeUserName};