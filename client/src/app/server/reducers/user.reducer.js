import { AUTH, LOGOUT } from "../constants/user.const";

const initialState = {
    auth: {},
    loggedIn: false
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case AUTH:
            return {
                ...state,
                auth: action.payload,
                loggedIn: true
            }

        case LOGOUT:
            return {
                ...state,
                auth: {},
                loggedIn: false
            }

        default:
            return state;
    }

}

export default authReducer