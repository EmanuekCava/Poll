import React from 'react'
import { useNavigate } from "react-router-dom";

import Buttons from './components/buttons'

const Header = () => {

    const navigate = useNavigate()

    const indexPush = () => {
        navigate("/")
    }

    return (
        <div className="container-header">
            <h1 className="text-header" onClick={indexPush}>POLL</h1>
            <Buttons />
        </div>
    )
}

export default Header
