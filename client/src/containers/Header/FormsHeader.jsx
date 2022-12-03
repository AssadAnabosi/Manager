import React from "react"
import "./Header.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FormsHeader = (props) => {
    const { title } = props;
    const to = `../${title}`;
    return (
        <>
            <section className="header_container">
                <h1 className="header_title">{title}</h1>
                <div className="button_container">
                    <Link className="button primary" to={to}><span>
                        <FontAwesomeIcon icon="fa-solid fa-arrow-right-to-bracket" size="lg" />
                    </span> Go Back</Link>
                </div>
            </section>
        </>
    )
}

export default FormsHeader;
