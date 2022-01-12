import React from 'react'
import { useSelector, useDispatch } from "react-redux";

// ACTIONS

import { removePoll } from "../../../server/actions/poll.actions";

const PollPrivate = ({ poll }) => {

    const { user } = useSelector(state => state)

    const dispatch = useDispatch()

    const deletePoll = () => {
        if (window.confirm('Are you sure to delete it?')) {
            dispatch(removePoll(poll._id, user.auth.token))
        }
    }

    return (
        <div className="container-index">
            <div className="container-card-mypolls">
                <div className="container-question-options">
                    <div className="contain-actions">
                        <h1 className="question-polls-priv">{poll.question}</h1>
                        <div className="actions">
                            <i className="fas fa-pen"></i>
                            <i className="fas fa-trash-alt" onClick={deletePoll}>DELETE</i>
                        </div>
                    </div>
                    <div className="options-all-polls">
                        <p className="option-all-polls">- {poll.optionOne.option}</p>
                        <p className="option-all-polls">- {poll.optionTwo.option}</p>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default PollPrivate
