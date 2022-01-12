import React, { useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

// ACTIONS

import { myPolls } from '../../server/actions/poll.actions'

// COMPONENTS

import PollsPrivate from "../../components/poll/private/poll.private";

import SuccessCreate from '../../response/res/successCreate'

const MyPolls = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { polls, user } = useSelector(state => state)

    useEffect(() => {
        dispatch(myPolls(user.auth.token))
    }, [dispatch, user.auth.token])

    const showPolls = polls.myPolls

    const pushCreatePoll = () => {
        navigate('/create')
    }

    return (
        <>
            {
                user.loggedIn ? (
                    <div className="background-index">
                        <div className="container-button-create">
                            <button className="button-create" onClick={pushCreatePoll}>CREATE POLL</button>
                        </div>
                        <SuccessCreate />
                        {
                            showPolls.map(poll => {
                                return <PollsPrivate poll={poll} key={poll._id} />
                            })
                        }
                    </div>
                ) : (
                    <Navigate replace to="/auth" />
                )
            }
        </>
    )
}

export default MyPolls
