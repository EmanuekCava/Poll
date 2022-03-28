import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";

// ACTIONS

import { chooseOptionOne, chooseOptionTwo } from "../../../server/actions/poll.actions";

const GetPollPrivate = ({ poll }) => {

    const { user } = useSelector(state => state)

    const dispatch = useDispatch()

    const [voted, setVoted] = useState(false)

    const voteOptionOne = () => {
        dispatch(chooseOptionOne(poll, poll._id, user.auth.token, user.auth.token, setVoted))
    }

    const voteOptionTwo = () => {
        dispatch(chooseOptionTwo(poll, poll._id, user.auth.token, user.auth.user, setVoted))
    }

    useEffect(() => {
        if (poll.optionOne.votes.find((id) => id === user.auth.user._id)) {
            setVoted(true)
        }
    }, [poll.optionOne.votes, user.auth.user._id])
    useEffect(() => {
        if (poll.optionTwo.votes.find((id) => id === user.auth.user._id)) {
            setVoted(true)
        }
    }, [poll.optionTwo.votes, user.auth.user._id])


    return (
        <>
            <div className="top-get-poll">
                <p className="text-top">VOTES: {poll.optionOne.votes.length + poll.optionTwo.votes.length}</p>
                <p className="text-top">By: {poll.nickId.nick}</p>
            </div>
            <div className="mid-get-poll">
                <h1 className="question">{poll.question}</h1>
                <div className="container-options">
                    <div className="contain-option" style={voted ? { background: "#eee", cursor: 'default' } : {}} onClick={voteOptionOne}>
                        <p className="text-option">{voted ? (
                            <>
                                <p>{poll.optionOne.option}</p>
                                <p>Votes: {poll.optionOne.votes.length}</p>
                                <p>{Math.round((poll.optionOne.votes.length * 100) / (poll.optionOne.votes.length + poll.optionTwo.votes.length))}%</p>
                            </>
                        ) : (
                            <p>{poll.optionOne.option}</p>
                        )}</p>
                    </div>
                    <div className="contain-option" style={voted ? { background: "#eee", cursor: 'default' } : {}} onClick={voteOptionTwo}>
                        <p className="text-option">{voted ? (
                            <>
                                <p>{poll.optionTwo.option}</p>
                                <p>Votes: {poll.optionTwo.votes.length}</p>
                                <p>{Math.round((poll.optionTwo.votes.length * 100) / (poll.optionOne.votes.length + poll.optionTwo.votes.length))}%</p>
                            </>
                        ) : (
                            <p>{poll.optionTwo.option}</p>
                        )}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GetPollPrivate
