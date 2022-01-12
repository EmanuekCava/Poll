import React from 'react'
import { useDispatch, useSelector } from "react-redux";

// MESSAGES

import Loading from '../message/loading'
import Error from '../message/error'

// CONSTANTS 

import { ERROR_REGISTER } from '../../server/constants/response.const'

const ErrLogin = () => {

    const { response } = useSelector(state => state)

    const dispatch = useDispatch()

    const close = () => {
        dispatch({
            type: ERROR_REGISTER,
            payload: false
        })
    }

    return (
        <div>
            
            {
                response.loading && <Loading />
            }
            {
                response.errorRegister && <Error msg={response.errorRegister} close={close} />
            }

        </div>
    )
}

export default ErrLogin
