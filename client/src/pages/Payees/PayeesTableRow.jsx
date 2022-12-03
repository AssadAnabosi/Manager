import React, { useContext } from "react"
import { UserContext } from "../../App.jsx"
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deletePayee } from "../../features/Payees/payeesSlice";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Row(props) {
    const { user } = useContext(UserContext);
    const { flag, setFlag } = props;
    const dispatch = useDispatch();

    const { _id, name, phoneNumber, email, extraNotes } = props.payee;

    const deleteThisPayee = () => {
        dispatch(deletePayee(_id));
        setFlag(!flag);
    };
    return (
        <div className="table_row">
            <div className="flex">
                <div className="main_column">
                    <div className="icon">
                    <FontAwesomeIcon icon="fa-solid fa-circle-user" size="2x"/>
                    </div>
                    <div className="stacked_cell">
                        <p className="large">{name}</p>
                    </div>
                </div>
                <div className="main_column">
                    <div className="stacked_cell">
                        <p className="large">{phoneNumber}</p>
                        <p className="small">{email}</p>
                    </div>
                </div>
                <div className="notes_column">
                    <p>{extraNotes}</p>
                </div>
            </div>
            <div className="flex">
                {(user.accessLevel !== "User" && user.accessLevel !== "Spectator") ?
                    <div className="actions_column">
                        <Link to={`/payees/${_id}/edit`}>
                        <FontAwesomeIcon icon="fa-solid fa-pen" size="lg"/>
                            </Link>
                        <Link to="/payees/" onClick={deleteThisPayee}>
                        <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg"/>
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