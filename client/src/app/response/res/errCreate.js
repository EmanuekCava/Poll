import React from 'react'
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS

import Loading from '../message/loading'
import Error from '../message/error'

// CONSTANTS

import { ERROR_CREATE } from '../../server/constants/response.const'

const ErrCreate = () => {

    const { response } = useSelector(state => state)

    const dispatch = useDispatch()

    const close = () => {
        dispatch({
            type: ERROR_CREATE,
            payload: false
        })
    }

    return (
        <div>
            {
                response.loading && <Loading />
            }
            {
                response.errorCreate && <Error msg={response.errorCreate} close={close} />
            }
        </div>
    )
}

export default ErrCreate
