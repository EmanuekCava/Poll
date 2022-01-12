import React from 'react'
import { useDispatch, useSelector } from "react-redux";

// MESSAGES

import Loading from '../message/loading'
import Error from '../message/error'

// CONSTANTS 

import { ERROR_LOGIN } from '../../server/constants/response.const'

const ErrLogin = () => {

    const { response } = useSelector(state => state)

    const dispatch = useDispatch()

    const close = () => {
        dispatch({
            type: ERROR_LOGIN,
            payload: false
        })
    }

    return (
        <div>
            
            {
                response.loading && <Loading />
            }
            {
                response.errorLogin && <Error msg={response.errorLogin} close={close} />
            }

        </div>
    )
}

export default ErrLogin
