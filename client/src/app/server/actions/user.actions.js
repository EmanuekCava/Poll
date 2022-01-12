import {
    AUTH,
    LOGOUT
} from "../constants/user.const";
import {
    LOADING,
    ERROR_LOGIN,
    ERROR_REGISTER,
    SUCCESS_AUTH
} from "../constants/response.const";

import * as userApi from '../api/user.api'

export const login = (authData, navigate) => async (dispatch) => {

    try {

        dispatch({
            type: LOADING,
            payload: true
        })

        const { data } = await userApi.loginApi(authData)

        dispatch({
            type: AUTH,
            payload: data
        })

        dispatch({
            type: LOADING,
            payload: false
        })

        localStorage.setItem("poll-user", true)

        dispatch({
            type: SUCCESS_AUTH,
            payload: data.message
        })

        navigate('/polls')

    } catch (error) {
        dispatch({
            type: ERROR_LOGIN,
            payload: error.response.data.message
        })
    }

}

export const register = (authData, navigate) => async (dispatch) => {

    try {

        dispatch({
            type: LOADING,
            payload: true
        })

        const { data } = await userApi.registerApi(authData)

        dispatch({
            type: AUTH,
            payload: data
        })

        dispatch({
            type: LOADING,
            payload: false
        })

        localStorage.setItem("poll-user", true)

        dispatch({
            type: SUCCESS_AUTH,
            payload: data.message
        })

        navigate('/polls')

    } catch (error) {
        dispatch({
            type: ERROR_REGISTER,
            payload: error.response.data.message
        })
    }

}

export const logout = () => (dispatch) => {

    try {

        dispatch({
            type: LOGOUT
        })

        localStorage.removeItem("poll-user")

    } catch (error) {
        console.log(error);
    }

}