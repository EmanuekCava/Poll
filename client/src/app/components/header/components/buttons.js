import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from '../../../server/actions/user.actions'

const Buttons = () => {

    const { user } = useSelector(state => state)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [dropDownProfile, setDropDownProfile] = useState(false)

    const showDropDownProfile = () => {
        setDropDownProfile(!dropDownProfile)
    }

    const pushMyPolls = () => {
        navigate('/mypolls')
        setDropDownProfile(false)
    }
    const pushLogout = () => {
        navigate('/')
        setDropDownProfile(false)
        dispatch(logout())
    }

    return (
        <div className="container-buttons">
            <div className="order-buttons">
                <Link to="/polls" style={location.pathname === "/polls" ? { background: "#00f", borderBottom: "none" } : {}}
                    className="button-polls">POLLS</Link>
                {
                    user.loggedIn ? (
                        <div className="container-profile-header">
                            <p className="button-profile" onClick={showDropDownProfile}>PROFILE</p>
                            <i style={dropDownProfile ? { color: "#1f1" } : {}} className="fas fa-sort-down" onClick={showDropDownProfile}></i>
                        </div>
                    ) : (
                        <Link to="/auth" style={location.pathname === "/auth" ? { background: "#0f0", borderBottom: "none" } : {}}
                            className="button-auth">SIGN IN</Link>
                    )
                }
                {
                    dropDownProfile &&
                    <div className="container-drop-profile">
                        <p className="text-drop-profile" id="my-polls" onClick={pushMyPolls}>My polls</p>
                        <p className="text-drop-profile" id="logout" onClick={pushLogout}>Logout</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Buttons
