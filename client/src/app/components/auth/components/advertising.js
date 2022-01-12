import React from 'react'

const Advertising = ({ setShowRegister }) => {

    const showRegister = () => {
        setShowRegister(true)
    }

    return (
        <div className="separator-advertising">
            <div className="verify-account">
                <p className="text-verify-account">Haven't you an account yet?</p>
                <p className="text-auth-advertising" onClick={showRegister} >Register</p>
            </div>
            <div className="advertising">
                <img src="/poll.png" className="advertesing-image" alt="icon.poll"/>
            </div>
        </div>
    )
}

export default Advertising
