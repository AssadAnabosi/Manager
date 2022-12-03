import React, { useContext } from "react"
import "./Sidebar.scss"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { UserContext } from "../../App.jsx"
import { logoutUser } from "../../features/Users/userSlice";


const Navbar = (props) => {
    const { user } = useContext(UserContext);
    const year = new Date().getFullYear();
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutUser());
    };
    return (
        <>
            <div className="nav">
                <div className="navbar_container">
                    <div className="upper_container">
                        <h1 className="nav_logo">
                            Manager
                        </h1>
                        <div className="nav_menu">
                            {
                                user && <>
                                    {
                                        (user.accessLevel !== "User") ?
                                            <>
                                                <NavLink className="nav_link" to="/bills"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-receipt" size="lg" />
                                                </span> Bills</NavLink>
                                                <NavLink className="nav_link" to="/workers"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-users-gear" size="lg" />
                                                </span> Workers</NavLink>
                                                <NavLink className="nav_link" to="/logs"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-box-archive" size="lg" />
                                                </span> Logs</NavLink>
                                                <NavLink className="nav_link" to="/payees"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-user-tag" size="lg" />
                                                </span> Payees</NavLink>
                                                <NavLink className="nav_link" to="/cheques"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-money-check-dollar" size="lg" />
                                                </span> Cheques</NavLink>
                                            </>
                                            :
                                            <>
                                                <NavLink className="nav_link" to="/logs"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-box-archive" size="lg" />
                                                </span> My Logs</NavLink>
                                            </>
                                    }

                                </>

                            }
                        </div>
                    </div>
                    <div className="lower_container">
                        <div className="nav_menu">
                            {user &&
                                <>
                                    <NavLink className="nav_link" to="/changePassword"><span>
                                        <FontAwesomeIcon icon="fa-solid fa-key" size="lg" />
                                    </span> Change Password</NavLink>
                                    <NavLink className="nav_link" onClick={logout} to="/"><span>
                                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" size="lg" />
                                    </span> Logout</NavLink>
                                    <div className="user_box">
                                        <div className="user_icon">
                                            <span>
                                            <FontAwesomeIcon icon="fa-solid fa-id-badge" size="2x"/>
                                            </span>
                                        </div>
                                        <div className="user_info">
                                            <p className="name">
                                                {user.name}
                                            </p>
                                            <p className="username">
                                                <span>@</span>
                                                {user.username}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                        <div className="div">
                        <p className="copyrights">&copy; Assad Anabosi ({year})</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;
