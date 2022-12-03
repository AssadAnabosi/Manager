import React from "react"

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Queries.scss";

const Queries = ({ handleQueriesChange }) => {
    const {t, i18n} = useTranslation();
    
    return (
        <>
            <div className="queries_container" id="end">
                <div className="search_box">
                    <span>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="lg"/>
                        </span>
                    <input type="text" name="search" placeholder={t("search")} onChange={handleQueriesChange} />
                </div>
            </div>
        </>
    )
}

export default Queries;