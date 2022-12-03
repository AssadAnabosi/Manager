import React, { useContext } from "react"
import { UserContext } from "../../App.jsx"
import { useDispatch } from "react-redux";
import { deleteWorker } from "../../features/Workers/workersSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./WorkersTableRow.scss";
function Row(props) {
    const { user } = useContext(UserContext);
    const { flag, setFlag } = props;
    const dispatch = useDispatch()

    const { _id, name, username, phoneNumber, email, accessLevel } = props.worker;

    const deleteThisWorker = () => {
        dispatch(deleteWorker(_id));
        setFlag(!flag);
    };
    return (
        <div className="table_row">
            <div className="flex">
                <div className="main_column">
                    <div className="icon">
                        <FontAwesomeIcon icon="fa-solid fa-address-card" size="2x" />
                        {/* <i className="fa-2x fa-solid fa-address-card"></i> */}
                    </div>
                    <div className="stacked_cell">
                        <p className="large">{name}</p>
                        <p className="small"><span>@</span>{username}</p>
                    </div>
                </div>
                <div className="tag_column">
                    {accessLevel === "User" ?
                        <div className="tag user_tag">
                            <p id="user">
                                {accessLevel}
                            </p>
                        </div>
                        :
                        null}
                    {accessLevel === "Supervisor" ?
                        <div className="tag super_tag">
                            <p id="super">
                                {accessLevel}
                            </p>
                        </div>
                        :
                        null}
                    {accessLevel === "Spectator" ?
                        <div className="tag spec_tag">
                            <p id="spec">
                                {accessLevel}
                            </p>
                        </div>
                        :
                        null}
                    {accessLevel === "Administrator" ?
                        <div className="tag admin_tag">
                            <p id="admin">
                                {accessLevel}
                            </p>
                        </div>
                        :
                        null}
                </div>
                <div className="main_column">
                    <div className="stacked_cell">
                        <p className="large">{phoneNumber}</p>
                        <p className="small">{email}</p>
                    </div>
                </div>
            </div>
            <div className="flex">
                {(user.accessLevel !== "User" && user.accessLevel !== "Spectator") ?
                    <div className="actions_column">
                        {/* <Link to={`/workers/${_id}`}><i class="fa-lg fa-solid fa-eye"></i></Link> */}
                        <Link to={`/workers/${_id}/edit`}>
                        <FontAwesomeIcon icon="fa-solid fa-pen" size="lg"/>
                            {/* <i className="fa-lg fa-solid fa-pen"></i> */}
                            </Link>
                        {(user.accessLevel === "Administrator") ?
                            <Link to="/workers/" onClick={deleteThisWorker}>
                                <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg"/>
                                {/* <i className="fa-lg fa-solid fa-trash-can"></i> */}
                                </Link>
                            :
                            null}
                    </div>
                    :
                    <>
                    </>
                }
            </div>
        </div>
    );
}

export default Row;