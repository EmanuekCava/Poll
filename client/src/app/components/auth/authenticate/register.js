import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// ACTIONS

import { register } from "../../../server/actions/user.actions";

// COMPONENTS

import ErrRegister from '../../../response/res/errRegister'

const Register = ({ setShowRegister }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialState = {
        nick: "",
        email: "",
        password: "",
        confirm: ""
    }

    const [authData, setAuthData] = useState(initialState)

    const { nick, email, password, confirm } = authData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthData({ ...authData, [name]: value })
    }
    const handleSumbit = (e) => {
        e.preventDefault()
        dispatch(register(authData, navigate))
    }

    const showRegister = () => {
        setShowRegister(false)
    }

    return (
        <div className="container-register">
            <div className="container-form-register">
                <h1 className="text-title-auth">REGISTER</h1>
                <ErrRegister />
                <form onSubmit={handleSumbit} className="form-register">
                    <div className="separator">
                        <input type="text" name="nick" className="input-auth" placeholder="NICKNAME" value={nick} onChange={handleChange} />
                    </div>
                    <div className="separator">
                        <input type="text" name="email" className="input-auth" placeholder="EMAIL" autoComplete="off" value={email} onChange={handleChange} />
                    </div>
                    <div className="separator">
                        <input type="password" name="password" className="input-auth" placeholder="PASSWORD" value={password} onChange={handleChange} />
                    </div>
                    <div className="separator">
                        <input type="password" name="confirm" className="input-auth" placeholder="CONFIRM PASSWORD" value={confirm} onChange={handleChange} />
                    </div>
                    <div className="separator">
                        <button className="button-auth-form">
                            REGISTER
                        </button>
                    </div>
                </form>
                <div className="separator">
                    <button className="button-calcel" onClick={showRegister}>
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register
