import React from 'react'
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS

import Loading from '../message/loading'
import Success from '../message/success'

// CONSTANTS

import { SUCCESS_AUTH } from '../../server/constants/response.const'

const SuccessAuth = () => {

    const { response } = useSelector(state => state)

    const dispatch = useDispatch()

    const close = () => {
        dispatch({
            type: SUCCESS_AUTH,
            payload: false
        })
    }

    return (
        <div>

            {
                response.loading && <Loading />
            }
            {
                response.successAuth && <Success msg={response.successAuth} close={close} />
            }

        </div>
    )
}

export default SuccessAuth
