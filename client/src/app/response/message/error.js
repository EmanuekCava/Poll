import React from 'react'

const Error = ({ msg, close }) => {
    return (
        <div className="container-error">
            <p className="text-message">{msg}</p>
            <p className="close-message" onClick={close}>X</p>
        </div>
    )
}

export default Error
