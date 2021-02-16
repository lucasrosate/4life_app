
import { IUser, UserAction, UserState } from "../../../../interfaces";
import * as actionTypes from '../types/userManagementType';
import { Reducer } from "redux";


const userInitialState: UserState = {
    user: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        state: "",
        phone: "",
        profilePhoto: "",
        authentication: {
            isValid: false
        }
    },
    loading: true,
    successForms: false,
    responseMessage: "",
    responseError: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        state: "",
        phone: "",
        profilePhoto: ""
    }
}


export const userReducer: Reducer<UserState, UserAction> =
    (state: UserState = userInitialState, userAction: UserAction) => {
        switch (userAction.type) {
            case actionTypes.LOADING:
                return {
                    ...state,
                    loading: true
                };

                case actionTypes.USER_RESET_FORM_STATUS:
                    return {
                        ...state,
                        responseMessage: ""
                    };
    
                case actionTypes.USER_REGISTRATION_SUCCESS: 
                    return {
                        ...state,
                        successForms: false,
                        responseMessage: userAction.payload
                    }

            case actionTypes.USER_CREATE_ACCOUNT_SUCCESS:
                return {
                    ...state,
                    successForms: true,
                    loading: false,
                    responseMessage: ""

                };

            case actionTypes.USER_CREATE_ACCOUNT_FAILED:
                return {
                    ...state,
                    responseMessage: userAction.payload,
                    loading: false
                }


            case actionTypes.USER_LOGIN_SUCCESS:
                return {
                    ...state,
                    responseMessage: "",
                    loading: false
                };

            case actionTypes.USER_LOGIN_FAILED:
                return {
                    ...state,
                    responseMessage: "Erro: O seu login ou sua senha ou ambos incorretos. Verifique e tente novamente",
                    loading: false
                }

            case actionTypes.USER_GET_DATA_SUCCESS:
                const user: IUser = userAction.payload;
                return {
                    ...state,
                    user: user
                }

            case actionTypes.USER_GET_DATA_FAILED:

                return {
                    ...state
                }

            case actionTypes.USER_GET_PROFILE_PICTURE_SUCCESS:
                return {
                    ...state,
                    user: {
                        ...state.user,
                        profilePhoto: localStorage.getItem("profile-picture-url")
                    }
                }

            case actionTypes.USER_GET_PROFILE_PICTURE_FAILED:
                return {
                    ...state
                }

            case actionTypes.USER_UPLOAD_PROFILE_PICTURE_SUCCESS:
                return {
                    ...state,
                    user: {
                        ...state.user,
                        profilePhoto: localStorage.getItem("profile-picture-url")
                    }
                }

            case actionTypes.USER_UPLOAD_PROFILE_PICTURE_FAILED:
                return {
                    ...state
                }


            case actionTypes.USER_UPDATE_DATA_SUCCESS:
                const newValue = userAction.payload.newValue;

                switch (userAction.payload.option) {
                    case "EDIT_USERNAME":
                        localStorage.setItem("username", newValue);
                        return {
                            ...state,
                            user: {
                                ...state.user,
                                username: newValue
                            },
                            responseError: {
                                ...state.responseError,
                                username: ""
                            }
                        }
                    case "EDIT_FIRSTNAME":
                        return {
                            ...state,
                            user: {
                                ...state.user,
                                firstname: newValue
                            }
                        }

                    case "EDIT_LASTNAME":
                        return {
                            ...state,
                            user: {
                                ...state.user,
                                firstname: newValue
                            }
                        }
                    case "EDIT_EMAIL":
                        return {
                            ...state,
                            user: {
                                ...state.user,
                                firstname: newValue
                            }
                        }

                    case "EDIT_PHONE":
                        return {
                            ...state,
                            user: {
                                ...state.user,
                                phone: newValue
                            }
                        }

                    case "EDIT_STATE":
                        return {
                            ...state,
                            user: {
                                ...state.user,
                                state: newValue
                            }
                        }

                    case "EDIT_BIRTH":
                        return {
                            ...state,
                            user: {
                                ...state.user,
                                birth: newValue
                            }
                        }

                    default:
                        return {
                            ...state
                        }
                }
                break;

            case actionTypes.USER_UPDATE_DATA_FAILED:
                switch (userAction.payload.option) {
                    case "EDIT_USERNAME":
                        return {
                            ...state,
                            responseError: {
                                ...state.responseError,
                                username: "Esse nome de usuário já existe."
                            }
                        }
                    case "EDIT_FIRSTNAME":
                        return {
                            ...state,
                            responseError: {
                                ...state.responseError
                            }
                        }
                    case "EDIT_LASTNAME":
                        return {
                            ...state,
                            responseError: {
                                ...state.responseError
                            }
                        }
                    case "EDIT_EMAIL":
                        return {
                            ...state,
                            responseError: {
                                ...state.responseError
                            }
                        }

                    case "EDIT_PHONE":
                        return {
                            ...state,
                            responseError: {
                                ...state.responseError
                            }
                        }
                    case "EDIT_STATE":
                        return {
                            ...state,
                            responseError: {
                                ...state.responseError
                            }
                        }
                    case "EDIT_BIRTH":
                        return {
                            ...state,
                            responseError: {
                                ...state.responseError
                            }
                        }
                    default:
                        return {
                            ...state
                        }
                }

            default: return state;
        }
    }

