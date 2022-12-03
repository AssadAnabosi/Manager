import React, { useContext } from "react"
import { UserContext } from "../../App.jsx"
import "./Queries.scss";

const Queries = ({ handleQueriesChange, since, till, flag, setFlag, handleDelete }) => {
    const { user } = useContext(UserContext);
    const handleClick = () => {
        setFlag(!flag);
    }
    return (
        <>
            <div className="queries_container">
                <div className="date_range">
                    <div className="date_box_container">
                        <span>Start Date</span>
                        <div className="date_box">
                            <input type="date" name="since" value={since} onChange={handleQueriesChange} />
                        </div>
                    </div>
                    <div className="date_box_container">
                        <span>End Date</span>
                        <div className="date_box">
                            <input type="date" name="till" value={till} onChange={handleQueriesChange} />
                        </div>
                    </div>
                    <div className="search_button">
                        <button className="button primary" onClick={handleClick}>Search</button>
                    </div>
                    {user?.accessLevel === "Administrator" &&
                        <div className="delete_button">
                            <button className="button" onClick={handleDelete}>Delete</button>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Queries;