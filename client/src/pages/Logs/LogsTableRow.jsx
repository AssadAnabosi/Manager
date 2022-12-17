import React, { useContext } from "react"
import { UserContext } from "../../App.jsx"
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteLog } from "../../features/Logs/logsSlice";

import { useTranslation } from "react-i18next";
import { dateFormatter } from "../../formatters.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Row(props) {
    const { t } = useTranslation();
    const { user } = useContext(UserContext);
    const dispatch = useDispatch()
    const { flag, setFlag } = props;

    const { _id, date, isAbsence, startingTime, finishingTime, OTV, payment, extraNotes } = props.log;
    const name = props.name;
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let day = new Date(date).getDay();
    let dateString = dateFormatter(new Date(date));

    const deleteThisLog = () => {
        dispatch(deleteLog(_id));
        setFlag(!flag);
    };
    return (
        <div className="table_row">
            <div className="flex">
                <div className="main_column">
                    <div className="icon">
                        <FontAwesomeIcon icon="fa-solid fa-clipboard-user" size="2x" />
                    </div>
                    <div className="stacked_cell">
                        <p className="large">{name}</p>
                        <p className="small">{`${t(days[day])}, ${dateString}`}</p>
                    </div>
                </div>
                <div className="tag_column">
                    {isAbsence ?
                        <div className="tag true">
                            <p id="true">
                                <FontAwesomeIcon icon="fa-solid fa-xmark" size="lg" />
                            </p>
                        </div>
                        :
                        <div className="tag false">
                            <p id="false">
                                <FontAwesomeIcon icon="fa-solid fa-check" size="lg" />
                            </p>
                        </div>
                    }
                </div>
                <div className="time_column">
                    <p className="working_time">{`${startingTime} - ${finishingTime}`}<span>({OTV})</span></p>
                </div>
                <div className="number_column">
                    <p>{payment}</p>
                </div>
                <div className="notes_column">
                    <p>{extraNotes}</p>
                </div>
            </div>
            <div className="flex">
                {(user?.accessLevel !== "User" && user?.accessLevel !== "Spectator") ?
                    <div className="actions_column">
                        <Link to={`/logs/${_id}/edit`}>
                            <FontAwesomeIcon icon="fa-solid fa-pen" size="lg" />
                        </Link>
                        <Link to="/logs/" onClick={deleteThisLog}>
                            <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg" />
                        </Link>
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