import React, { useContext } from "react"
import { UserContext } from "../../App.jsx"
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteWorker } from "../../features/Workers/workersSlice";

import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./WorkersTableRow.scss";

function Row(props) {
    const { t, i18n } = useTranslation();
    const { user } = useContext(UserContext);
    const { flag, setFlag } = props;
    const dispatch = useDispatch();

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
                                {t(accessLevel)}
                            </p>
                        </div>
                        :
                        null}
                    {accessLevel === "Supervisor" ?
                        <div className="tag super_tag">
                            <p id="super">
                                {t(accessLevel)}
                            </p>
                        </div>
                        :
                        null}
                    {accessLevel === "Spectator" ?
                        <div className="tag spec_tag">
                            <p id="spec">
                                {t(accessLevel)}
                            </p>
                        </div>
                        :
                        null}
                    {accessLevel === "Administrator" ?
                        <div className="tag admin_tag">
                            <p id="admin">
                                {t(accessLevel)}
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
                        <Link to={`/workers/${_id}/edit`}>
                            <FontAwesomeIcon icon="fa-solid fa-pen" size="lg" />
                        </Link>
                        {(user.accessLevel === "Administrator") ?
                            <Link to="/workers/" onClick={deleteThisWorker}>
                                <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg" />
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