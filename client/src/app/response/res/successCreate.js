import React from 'react'
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS

import Loading from '../message/loading'
import Success from '../message/success'

// CONSTANTS

import { SUCCESS_CREATE } from '../../server/constants/response.const'

const SuccessCreate = () => {

    const { response } = useSelector(state => state)

    const dispatch = useDispatch()

    const close = () => {
        dispatch({
            type: SUCCESS_CREATE,
            payload: false
        })
    }

    return (
        <div>
            {
                response.loading && <Loading />
            }
            {
                response.successCreate && <Success msg={response.successCreate} close={close} />
            }
        </div>
    )
}

export default SuccessCreate
