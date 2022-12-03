import React, { useContext, useEffect } from "react"
import { UserContext } from "../../App.jsx"
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../features/Users/userSlice";

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Sidebar.scss"

const Navbar = (props) => {
    const {t, i18n} = useTranslation();
    const { user } = useContext(UserContext);
    const year = new Date().getFullYear();

    const dispatch = useDispatch();
    const logout = () => {
        dispatch(logoutUser());
    };

    const setArabic = () => {
        i18n.changeLanguage("ar");
    }

    const setEnglish = () => {
        i18n.changeLanguage("en");
    }
    return (
        <>
            <div className="nav">
                <div className="navbar_container">
                    <div className="upper_container">
                        <div className="nav_logo">
                            <h1>Manager</h1>
                            <div className="lang">
                                <button className={i18n.language === "ar" ? "active" : ""} onClick={setArabic}>
                                    AR
                                </button>
                                <button className={i18n.language === "en" ? "active" : ""} onClick={setEnglish}>
                                    EN
                                </button>
                            </div>
                        </div>
                        <div className="nav_menu">
                            {
                                user && <>
                                    {
                                        (user.accessLevel !== "User") ?
                                            <>
                                                <NavLink className="nav_link" to="/bills"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-receipt" size="lg" />
                                                </span>{t("bills")}</NavLink>
                                                <NavLink className="nav_link" to="/workers"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-users-gear" size="lg" />
                                                </span> {t("workers")}</NavLink>
                                                <NavLink className="nav_link" to="/logs"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-box-archive" size="lg" />
                                                </span> {t("logs")}</NavLink>
                                                <NavLink className="nav_link" to="/payees"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-user-tag" size="lg" />
                                                </span> {t("payees")}</NavLink>
                                                <NavLink className="nav_link" to="/cheques"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-money-check-dollar" size="lg" />
                                                </span> {t("cheques")}</NavLink>
                                            </>
                                            :
                                            <>
                                                <NavLink className="nav_link" to="/logs"><span>
                                                    <FontAwesomeIcon icon="fa-solid fa-box-archive" size="lg" />
                                                </span> {t("myLogs")}</NavLink>
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
                                    </span> {t("changePassword")}</NavLink>
                                    <NavLink className="nav_link" onClick={logout} to="/"><span>
                                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" size="lg" />
                                    </span> {t("logout")}</NavLink>
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
