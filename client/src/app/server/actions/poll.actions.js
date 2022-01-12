import {
    ALLPOLLS,
    MYPOLLS,
    GETPOLL,
    CREATE_POLL,
    REMOVE_POLL,
    OPTION_ONE
} from "../constants/poll.const";
import {
    LOADING,
    ERROR_CREATE,
    SUCCESS_CREATE
} from '../constants/response.const'

import * as pollApi from '../api/poll.api'

export const allPolls = () => async (dispatch) => {

    try {

        const { data } = await pollApi.allPollsApi()

        dispatch({
            type: ALLPOLLS,
            payload: data
        })

    } catch (error) {
        console.log(error);
    }

}

export const myPolls = (token) => async (dispatch) => {

    try {

        const { data } = await pollApi.myPollsApi(token)

        dispatch({
            type: MYPOLLS,
            payload: data
        })

    } catch (error) {
        console.log(error);
    }

}

export const getPoll = (id, token) => async (dispatch) => {

    try {

        const { data } = await pollApi.getPollApi(id, token)
        const res = await pollApi.allPollsApi()

        dispatch({
            type: GETPOLL,
            payload: {
                get: data,
                all: res.data,
            }
        })
        
    } catch (error) {
        console.log(error);
    }

}

export const createPoll = (pollData, token, navigate) => async (dispatch) => {

    try {

        dispatch({
            type: LOADING,
            payload: true
        })

        const { data } = await pollApi.createPollApi(pollData, token)

        dispatch({
            type: CREATE_POLL,
            payload: data.poll
        })

        dispatch({
            type: LOADING,
            payload: false
        })

        dispatch({
            type: SUCCESS_CREATE,
            payload: data.message
        })

        navigate('/mypolls')
        
    } catch (error) {
        dispatch({
            type: ERROR_CREATE,
            payload: error.response.data.message
        })
    }

}

export const removePoll = (id, token) => async (dispatch) => {

    try {

        dispatch({
            type: LOADING,
            payload: true
        })

        const { data } = await pollApi.removePollApi(id, token)

        dispatch({
            type: REMOVE_POLL,
            payload: id
        })

        dispatch({
            type: LOADING,
            payload: false
        })

        const res = await pollApi.myPollsApi(token)

        dispatch({
            type: MYPOLLS,
            payload: res.data
        })

        dispatch({
            type: SUCCESS_CREATE,
            payload: data.message
        })
        
    } catch (error) {
        console.log(error);
    }

}

export const chooseOptionOne = (newLike, id, token) => async (dispatch) => {

    try {

        await pollApi.chooseOptionOneApi(null, id, token)

        dispatch({
            type: OPTION_ONE,
            payload: newLike
        })

        console.log(newLike);
        
    } catch (error) {
        console.log(error);
    }

}
