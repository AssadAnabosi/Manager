import React, { useContext } from "react"
import { UserContext, PrintContext } from "../../App.jsx"
import { Link } from "react-router-dom";
import "./Header.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = (props) => {
    const { user } = useContext(UserContext);
    const { handlePrint } = useContext(PrintContext);
    const { title } = props;
    const to = `../${title}/new`;
    return (
        <>
            <section className="header_container">
                <h1 className="header_title">{title}</h1>
                <div className="button_container">
                    {user?.accessLevel !== "User" &&
                        <Link className="button primary" to={to}><span>
                            <FontAwesomeIcon icon="fa-solid fa-plus" size="lg" />
                        </span>Add {title.slice(0, -1)}</Link>
                    }
                    <Link to="" className="button secondary" onClick={handlePrint}><span>
                        <FontAwesomeIcon icon="fa-solid fa-print" size="lg" />
                    </span>Print</Link>
                </div>
            </section>
        </>
    )
}

export default Header;
