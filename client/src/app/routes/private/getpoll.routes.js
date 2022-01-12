import React, { useEffect } from 'react'
import { useParams, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// ACTIONS

import { getPoll } from "../../server/actions/poll.actions";

// COMPONENTS

import GetPollPrivate from '../../components/poll/private/getpoll.private'

const GetPoll = () => {

    const { user, polls } = useSelector(state => state)

    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPoll(params.id, user.auth.token))
    }, [dispatch, params.id, user.auth.token])

    const showGetPoll = polls.getPoll;

    return (
        <>
            {
                user.loggedIn ? (
                    <div className="container-get-poll">
                        <GetPollPrivate poll={showGetPoll} params={params} />
                    </div>
                ) : (
                    <Navigate replace to="/auth" />
                )
            }
        </>
    )
}

export default GetPoll
