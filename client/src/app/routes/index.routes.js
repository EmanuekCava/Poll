import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

const Index = () => {

    const { user } = useSelector(state => state)

    const navigate = useNavigate()

    const pushAuth = () => {
        navigate('/auth')
    }
    const pushPolls = () => {
        navigate('/polls')
    }

    return (
        <div className="background-index">
            <div className="container-index">
                <div className="container-letters">
                    <h1 className="titles-index">TAKE PART IN AMASING POLLS</h1>
                    <img className="image-index" src="/getPoll.png" alt="get.poll"/>
                </div>
                <div className="container-letters">
                    <h1 className="titles-index">YOU CAN CREATE POLLS TO SEE THE PEOPLE'S OPINION</h1>
                    <img className="image-index" src="/createPoll.png" alt="create.poll"/>
                </div>
                <div className="container-letters">
                    <h1 className="titles-index">ENJOY IT!</h1>
                    <img className="icon-index-poll" src="/poll.png" alt="icon.poll"/>
                </div>
                <div className="container-letters">
                    <button className="button-start" onClick={user.loggedIn ? pushPolls : pushAuth}>
                        START NOW!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Index
