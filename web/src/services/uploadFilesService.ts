import { UserInterface } from '../interfaces/UserInterface';
import api from './apis';

const uploadFilesService: any = async (encodedPicture: any) => {;

    return await api.post('/uploadprofilepicture', {
        encodedPicture: encodedPicture,
        username: localStorage.getItem('username'),
        token : localStorage.getItem('auth-token'),
    
    })
    .then((res: any) => {
        return res.data;
    })
    .catch((err: any) => {
        if (err.response.status === 413) {
            return ({message: "O arquivo é muito largo, a imagem deve pesar menos de 1MB."})
        }
    });
}





export default uploadFilesService;