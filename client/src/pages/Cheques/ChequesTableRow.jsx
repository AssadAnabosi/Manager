import React, { useContext } from "react"
import { UserContext } from "../../App.jsx"
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteCheque } from "../../features/Cheques/chequesSlice";

import { useTranslation } from "react-i18next";
import { dateFormatter } from "../../formatters.js";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./ChequesTableRow.scss";

function Row(props) {
    const { t } = useTranslation();
    const { user } = useContext(UserContext);
    const { flag, setFlag } = props;
    const dispatch = useDispatch()
    const { _id, serial, dueDate, value, description, isCancelled } = props.cheque;
    let name = props.name;
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let day = new Date(dueDate).getDay();
    let dateString = dateFormatter(new Date(dueDate));

    const deleteThisCheque = () => {
        dispatch(deleteCheque(_id));
        setFlag(!flag);
    };
    return (
        <div className={`table_row ${isCancelled ? "cancelled" : ""}`}>
            <div className="flex">
                <div className="number_column">
                    <p>{serial}</p>
                </div>
                <div className="main_column">
                    <div className="icon">
                        <FontAwesomeIcon icon="fa-solid fa-money-check" size="2x" />
                    </div>
                    <div className="stacked_cell">
                        <p className="large">{name}</p>
                        <p className="small">{`${t(days[day])}, ${dateString}`}</p>
                    </div>
                </div>
                <div className="number_column">
                    <p>{value}</p>
                </div>
                <div className="notes_column">
                    <p>{description}</p>
                </div>
            </div>
            <div className="flex">
                {(user.accessLevel !== "User" && user.accessLevel !== "Spectator") ?
                    <div className="actions_column">
                        <Link to={`/cheques/${_id}/edit`}>
                            <FontAwesomeIcon icon="fa-solid fa-pen" size="lg" />
                        </Link>
                        <Link to="/cheques/" onClick={deleteThisCheque}>
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