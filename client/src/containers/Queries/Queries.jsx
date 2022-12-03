import React, { useContext } from "react"
import { UserContext } from "../../App.jsx"

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Queries.scss";

const Queries = ({ handleQueriesChange, since, till, flag, setFlag }) => {
    const {t, i18n} = useTranslation();
    const { user } = useContext(UserContext);
    const handleClick = () => {
        setFlag(!flag);
    }

    return (
        <>
            <div className="queries_container">
                <div className="date_range">
                    <div className="date_box_container">
                        <span>{t("since")}</span>
                        <div className="date_box">
                            <input type="date" name="since" value={since} onChange={handleQueriesChange} />
                        </div>
                    </div>
                    <div className="date_box_container">
                        <span>{t("till")}</span>
                        <div className="date_box">
                            <input type="date" name="till" value={till} onChange={handleQueriesChange} />
                        </div>
                    </div>
                </div>
                <div className="search">
                    {user?.accessLevel !== "User" &&
                        <div className="search_box">
                            <span>
                                <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="lg" />
                            </span>
                            <input type="text" name="search" placeholder={t("search")} onChange={handleQueriesChange} />
                        </div>
                    }
                    <div className="search_button">
                        <button className="button primary" onClick={handleClick}>{t("searchBtn")}</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Queries;