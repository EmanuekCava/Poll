import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

// ACTIONS

import { chooseOptionOne } from "../../../server/actions/poll.actions";

const GetPollPrivate = ({ poll, params }) => {

    const { user } = useSelector(state => state)

    const dispatch = useDispatch()

    var allVotes = useRef(0)

    const [votedOne, setVotedOne] = useState(false)
    const [votedTwo, setVotedTwo] = useState(false)

    const voteOptionOne = () => {
        setVotedOne(true)
        let newLike = {...poll.optionOne, votes: [...poll.optionOne.votes, user.auth.user._id]}
        dispatch(chooseOptionOne(newLike, poll._id, user.auth.token))
    }

    useEffect(() => {
        if (params.id) {
            allVotes = poll.optionOne.votes.length + poll.optionTwo.votes.length
        }
    }, [params.id])

    return (
        <>
            <div className="top-get-poll">
                <p className="text-top">VOTES: {allVotes.current}</p>
                <p className="text-top">By: {poll.nickId.nick}</p>
            </div>
            <div className="mid-get-poll">
                <h1 className="question">{poll.question}</h1>
                <div className="container-options">
                    <div className="contain-option" style={votedOne ? { background: "#eee" } : {}} onClick={voteOptionOne}>
                        <p className="text-option">{poll.optionOne.option}</p>
                    </div>
                    <div className="contain-option" style={votedTwo ? { background: "#eee" } : {}}>
                        <p className="text-option">{poll.optionTwo.option}</p>
                    </div>
                </div>
            </div>
            <div className="bottom-get-poll">

            </div>
        </>
    )
}

export default GetPollPrivate
