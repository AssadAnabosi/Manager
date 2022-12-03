import React from "react"
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Header.scss";

const FormsHeader = (props) => {
    const {t, i18n} = useTranslation();
    const { title } = props;
    const to = `../${title}`;
    
    return (
        <>
            <section className="header_container">
                <h1 className="header_title">{t(`${title}`)}</h1>
                <div className="button_container">
                    <Link className="button primary" to={to}><span>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-to-bracket" size="lg" />
                    </span>{t("goBack")}</Link>
                </div>
            </section>
        </>
    )
}

export default FormsHeader;
