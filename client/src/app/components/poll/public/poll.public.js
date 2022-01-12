import React from 'react'
import { useNavigate } from "react-router-dom";

const PollPublic = ({ poll }) => {

    const navigate = useNavigate()

    const pushGetPoll = () => {
        navigate(`/polls/${poll._id}`)
    }

    return (
        <div className="container-index">
            <div className="container-card-polls">
                <h1 className="question-polls" onClick={pushGetPoll}>{poll.question}</h1>
                <div className="options-all-polls">
                    <p className="option-all-polls">- {poll.optionOne.option}</p>
                    <p className="option-all-polls">- {poll.optionTwo.option}</p>
                </div>
            </div>
        </div>
    )
}

export default PollPublic
