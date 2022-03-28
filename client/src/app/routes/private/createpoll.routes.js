import React, { useState } from 'react'
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// COMPONENTS

import ErrCreate from '../../response/res/errCreate'

// ACTIONS

import { createPoll } from "../../server/actions/poll.actions";

const CreatePoll = () => {

    const { user } = useSelector(state => state)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    let optionNumber = 2;
    let firstOption = `OPTION ${optionNumber - 1}`;
    let currentOption = `OPTION ${optionNumber}`;

    const initialState = {
        question: "",
        optionOne: "",
        optionTwo: ""
    }

    const [pollData, setPollData] = useState(initialState)

    const { question, optionOne, optionTwo } = pollData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPollData({ ...pollData, [name]: value })
    }
    const handleSumbit = (e) => {
        e.preventDefault()

        const poll = {
            question,
            optionOne: {
                option: pollData.optionOne,
                votes: []
            },
            optionTwo: {
                option: pollData.optionTwo,
                votes: []
            }
        }

        dispatch(createPoll(poll, user.auth.token, navigate))
    }

    return (
        <>
            {
                user.loggedIn ? (
                    <div className="container-create">
                        <div className="container-title-create">
                            <h1 className="text-title-auth">CREATE A POLL</h1>
                        </div>
                        <div className="container-error-create">
                            <ErrCreate />
                        </div>
                        <div className="form-create-contained">
                            <form className="form-create" id="form-create" onSubmit={handleSumbit}>
                                <div className="separator">
                                    <input type="text" name="question" className="input-auth" placeholder="QUESTION" value={question} onChange={handleChange} autoComplete="off" />
                                </div>
                                <div className="separator">
                                    <input type="text" name="optionOne" className="input-option" placeholder={firstOption} value={optionOne} onChange={handleChange} autoComplete="off" />
                                </div>
                                <div className="separator">
                                    <input type="text" name="optionTwo" className="input-option" placeholder={currentOption} value={optionTwo} onChange={handleChange} autoComplete="off" />
                                </div>
                            </form>
                            <div className="actions-create-button">
                                <button className="button-auth-form" form="form-create">CREATE</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Navigate replace to="/auth" />
                )
            }
        </>
    )
}

export default CreatePoll

