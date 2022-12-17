import React, { useContext } from "react"
import { UserContext } from "../../App.jsx"
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteBill } from "../../features/Bills/billsSlice";

import { useTranslation } from "react-i18next";
import { dateFormatter } from "../../formatters.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Row(props) {
    const { t, i18n } = useTranslation();
    const { user } = useContext(UserContext);
    const { flag, setFlag } = props;
    const dispatch = useDispatch();

    const { _id, date, value, description, extraNotes } = props.bill;
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let day = new Date(date).getDay();
    let dateString = dateFormatter(new Date(date));


    const deleteThisBill = () => {
        dispatch(deleteBill(_id));
        setFlag(!flag);
    };
    return (
        <div className="table_row">
            <div className="flex">
                <div className="main_column">
                    <div className="icon">
                        <FontAwesomeIcon icon="fa-solid fa-file-invoice" size="2x" />
                    </div>
                    <div className="stacked_cell">
                        <p className="large">{`${t(days[day])}`}</p>
                        <p className="small">{`${dateString}`}</p>
                    </div>
                </div>
                <div className="number_column">
                    <p>{value}</p>
                </div>
                <div className="notes_column">
                    <p>{description}</p>
                </div>
                <div className="notes_column">
                    <p>{extraNotes}</p>
                </div>
            </div>
            <div className="flex">
                {(user.accessLevel !== "User" && user.accessLevel !== "Spectator") ?
                    <div className="actions_column">
                        <Link to={`/bills/${_id}/edit`}>
                            <FontAwesomeIcon icon="fa-solid fa-pen" size="lg" />
                        </Link>
                        <Link to="/bills/" onClick={deleteThisBill}>
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