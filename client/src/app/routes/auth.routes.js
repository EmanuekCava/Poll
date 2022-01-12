import React, { useState } from 'react'
import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux'

// COMPONENTS

import Advertising from '../components/auth/components/advertising'
import Login from '../components/auth/authenticate/login'
import Register from '../components/auth/authenticate/register'

import ErrLogin from '../response/res/errlogin'

const Auth = () => {

    const { user } = useSelector(state => state)

    const [showRegister, setShowRegister] = useState(false)

    return (
        <>
            {
                user.loggedIn ? (
                    <Navigate replace to="/polls" />
                ) : (
                    <>
                        <div className="container-auth">
                            <div className="container-form">
                                <div className="title-separator">
                                    <div className="title-auth">
                                        <h1 className="text-title-auth">SIGN IN</h1>
                                    </div>
                                    <div className="container-error-login">
                                        <ErrLogin />
                                    </div>
                                    <div className="form-contained">
                                        <Login />
                                    </div>
                                </div>
                            </div>
                            <div className="container-adversing">
                                <Advertising setShowRegister={setShowRegister} />
                            </div>
                        </div>
                        <div>
                            {
                                showRegister && <Register setShowRegister={setShowRegister} />
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Auth
