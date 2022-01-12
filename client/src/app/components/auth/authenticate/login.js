import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

// ACTIONS

import { login } from '../../../server/actions/user.actions'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialState = {
        nick: "",
        password: ""
    }

    const [authData, setAuthData] = useState(initialState)

    const { nick, password } = authData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthData({ ...authData, [name]: value })
    }

    const handleSumbit = (e) => {
        e.preventDefault()
        dispatch(login(authData, navigate))
    }

    return (
        <form className="form-login" onSubmit={handleSumbit}>
            <div className="separator">
                <input type="text" name="nick" className="input-auth" placeholder="NICKNAME" value={nick} onChange={handleChange} />
            </div>
            <div className="separator">
                <input type="password" name="password" className="input-auth" placeholder="PASSWORD" value={password} onChange={handleChange} />
            </div>
            <div className="separator">
                <button className="button-auth-form">
                    SIGN IN
                </button>
            </div>
        </form>
    )
}

export default Login
