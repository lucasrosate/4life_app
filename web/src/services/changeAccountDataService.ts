import api from './apis';

const changeUserProperty = async (newVal: string, option: number) => {
    return await api.post('/changeuserproperty',
        {
            username: localStorage.getItem("username"),
            token: localStorage.getItem("auth-token"),
            option: option,
            newVal: newVal

        })
        .then((res: any) => res.data)
        .catch((err: any) => err.response.data);
}


//CONTEXTO
//Opção 0: user.username

//Opção 1: user.firstname
//Opção 2: user.lastname
//Opção 3: user.email
//Opção 4: user.phone
//Opção 5: user.stateplace
//Opção 6: user.birth



const changeUserNameService = async (newVal: string, option: number) => await changeUserProperty(newVal, option);
const changeFirstNameService = async (newVal: string, option: number) => await changeUserProperty(newVal, option);
const changeLastNameService = async (newVal: string, option: number) => await changeUserProperty(newVal, option);
const changeEmailService = async (newVal: string, option: number) => await changeUserProperty(newVal, option);
const changePhoneService = async (newVal: string, option: number) => await changeUserProperty(newVal, option);
const changeStatePlaceService = async (newVal: string, option: number) => await changeUserProperty(newVal, option);
const changeBirthService = async (newVal: string, option: number) => await changeUserProperty(newVal, option);


export {
    changeUserNameService,
    changeFirstNameService,
    changeLastNameService,
    changeEmailService,
    changePhoneService,
    changeStatePlaceService,
    changeBirthService
};