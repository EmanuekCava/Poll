import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// COMPONENTS

import PollPublic from '../components/poll/public/poll.public'

import SuccessAuth from '../response/res/successAuth'

// ACTIONS

import { allPolls } from '../server/actions/poll.actions'

const Polls = () => {

    const dispatch = useDispatch()

    const { polls } = useSelector(state => state)

    useEffect(() => {
        dispatch(allPolls())
    }, [dispatch])

    const showPolls = polls.allPolls

    return (
        <div className="background-index">
            <SuccessAuth />
            {
                showPolls.map(poll => {
                    return <PollPublic poll={poll} key={poll._id} />
                })
            }
        </div>
    )
}

export default Polls
