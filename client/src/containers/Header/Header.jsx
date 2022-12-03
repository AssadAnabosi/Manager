import React, { useContext } from "react"
import { UserContext, PrintContext } from "../../App.jsx"
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Header.scss";

const Header = (props) => {
    const {t, i18n} = useTranslation();
    const { user } = useContext(UserContext);
    const { handlePrint } = useContext(PrintContext);
    const { title } = props;
    const to = `../${title}/new`;
    
    return (
        <>
            <section className="header_container">
                <h1 className="header_title">{t(`${title}`)}</h1>
                <div className="button_container">
                    {user?.accessLevel !== "User" &&
                        <Link className="button primary" to={to}><span>
                            <FontAwesomeIcon icon="fa-solid fa-plus" size="lg" />
                        </span>{t(`add${title}`)} </Link>
                    }
                    <Link to="" className="button secondary" onClick={handlePrint}><span>
                        <FontAwesomeIcon icon="fa-solid fa-print" size="lg" />
                    </span>{t("print")}</Link>
                </div>
            </section>
        </>
    )
}

export default Header;
