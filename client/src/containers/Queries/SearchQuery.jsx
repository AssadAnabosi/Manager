import React from "react"
import "./Queries.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Queries = ({ handleQueriesChange }) => {
    return (
        <>
            <div className="queries_container" id="end">
                <div className="search_box">
                    <span>
                    <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" size="lg"/>
                        </span>
                    <input type="text" name="search" placeholder="Search" onChange={handleQueriesChange} />
                </div>
            </div>
        </>
    )
}

export default Queries;