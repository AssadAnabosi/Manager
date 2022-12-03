import React, { useContext } from "react"
import { UserContext } from "../../App.jsx"
import { useDispatch } from "react-redux";
import { deleteBill } from "../../features/Bills/billsSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
function Row(props) {
    const { user } = useContext(UserContext);
    const { flag, setFlag } = props;
    const dispatch = useDispatch()

    const { _id, date, value, description, extraNotes } = props.bill;
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    let day = new Date(date).getDay();
    let dateString = new Date(date).toLocaleDateString();

    const deleteThisBill = () => {
        dispatch(deleteBill(_id));
        setFlag(!flag);
    };
    return (
        <div className="table_row">
            <div className="flex">
                <div className="main_column">
                    <div className="icon">
                    <FontAwesomeIcon icon="fa-solid fa-file-invoice" size="2x"/>
                        {/* <i className="fa-2x fa-solid fa-file-invoice"></i> */}
                    </div>
                    <div className="stacked_cell">
                        <p className="large">{`${days[day]}`}</p>
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
                        <FontAwesomeIcon icon="fa-solid fa-pen" size="lg"/>
                            {/* <i className="fa-lg fa-solid fa-pen"></i> */}
                            </Link>
                        <Link to="/bills/" onClick={deleteThisBill}>
                        <FontAwesomeIcon icon="fa-solid fa-trash-can" size="lg"/>
                            {/* <i className="ga-lg fa-solid fa-trash-can"></i> */}
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