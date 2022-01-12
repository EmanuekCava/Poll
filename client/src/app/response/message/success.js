import React from 'react'

const Success = ({ msg, close }) => {
    return (
        <div className="container-success">
            <p className="text-message">{msg}</p>
            <p className="close-message" onClick={close}>X</p>
        </div>
    )
}

export default Success
