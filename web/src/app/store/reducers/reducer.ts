import { Store } from "redux";
import { dispatchType, IUser, UserAction, UserState } from "../../../../interfaces";

interface callbackType { (arg: UserAction): void };

const userInitialState: UserState = {
    user: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        email: "",
        state: "",
        phone: ""
    }
}


export const reducerMiddleware = (store: any) => (next: callbackType) => (action: UserAction) => {
    return next(action);
}

export const reducer = (state: UserState = userInitialState, action: UserAction): UserState => {
    switch (action.type) {
        default:
            return state;
    }
}

