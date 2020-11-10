import Axios from 'axios';
import api from './api';

const changeUserName = async (newVal: String) => {
    return await Axios.post('/changeuserproperty',
        {
            username: localStorage.get("username"),
            newVal: newVal,
            option: 0
        })
        .then((res: any) => res.data.user_id)
        .catch((err: any) => err.response);
    
}

export {changeUserName};