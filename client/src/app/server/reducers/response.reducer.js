import {
    LOADING,
    ERROR_LOGIN,
    ERROR_REGISTER,
    SUCCESS_AUTH,
    ERROR_CREATE,
    SUCCESS_CREATE,
} from "../constants/response.const";

const initialState = {
    loading: false,
    errorLogin: false,
    errorRegister: false,
    successAuth: false,
    errorCreate: false,
    successAction: false,
}

const responseReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOADING:
            return {
                ...state,
                loading: action.payload,
                errorLogin: false,
                errorRegister: false,
                successAuth: false,
                errorCreate: false,
                successCreate: false
            }

        case ERROR_LOGIN:
            return {
                ...state,
                loading: false,
                errorLogin: action.payload,
                errorRegister: false,
                successAuth: false,
                errorCreate: false,
                successCreate: false
            }

        case ERROR_REGISTER:
            return {
                ...state,
                loading: false,
                errorLogin: false,
                errorRegister: action.payload,
                successAuth: false,
                errorCreate: false,
                successCreate: false
            }

        case SUCCESS_AUTH:
            return {
                ...state,
                loading: false,
                errorLogin: false,
                errorRegister: false,
                successAuth: action.payload,
                errorCreate: false,
                successCreate: false
            }

        case ERROR_CREATE:
            return {
                ...state,
                loading: false,
                errorLogin: false,
                errorRegister: false,
                successAuth: false,
                errorCreate: action.payload,
                successCreate: false
            }

        case SUCCESS_CREATE:
            return {
                ...state,
                loading: false,
                errorLogin: false,
                errorRegister: false,
                successAuth: false,
                errorCreate: false,
                successCreate: action.payload
            }

        default:
            return state;
    }

}

export default responseReducer;