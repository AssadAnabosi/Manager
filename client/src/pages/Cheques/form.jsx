import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchPayees } from "../../features/Payees/payeesSlice";
import { findCheque, createCheque, updateCheque } from "../../features/Cheques/chequesSlice";

import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChequeForm = () => {
    // cheque id
    let { id } = useParams();
    document.title = id ? "Manager - Edit Cheque" : "Manager - New Cheque";

    const date = new Date();

    const initialState = {
        dueDate: String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + 30,
        payee: "",
        serial: "",
        isCancelled: false,
        value: "",
        description: ""
    };
    const [data, setData] = useState(initialState);
    const [msg, setMessage] = useState("")

    const handleInfoChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPayees({ search: "" }));
        if (id) {
            dispatch(findCheque(id)).then(({ payload: cheque }) => {
                setData({
                    dueDate: cheque.dueDate.substring(0, 10),
                    payee: cheque.payee?._id || "",
                    serial: cheque.serial,
                    isCancelled: cheque.isCancelled,
                    value: cheque.value,
                    description: cheque.description,
                })
            }).catch((error) => {
                setMessage("Something went wrong!");
                return console.log(error);
            })
        }
    }, [])

    const { loading, payees } = useSelector((state) => state.payees);
    const { message, cheques, error } = useSelector(state => state.cheques)

    const clearState = () => {
        setData({ ...initialState });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            dispatch(updateCheque({
                id,
                data
            }))
        } else {
            if (data.payee === "") {
                data.isCancelled = true;
            }
            dispatch(createCheque(data))
            clearState();
        }
    };
    const toggleCancelled = () => {
        setData({
            ...data,
            isCancelled: !data.isCancelled
        })
    }
    function createOptions(payee) {
        return (<option
            key={payee._id}
            value={payee._id}
        >
            {payee.name}
        </option>
        );
    }

    return (
        <>
            <Containers.FormsHeader title="cheques" />
            {loading && <Loading />}
            <section className="form_container">
                <div className="form_title">
                    <p>
                        <span>
                            {id ?
                                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" size="lg" />
                                :
                                <FontAwesomeIcon icon="fa-solid fa-plus" size="lg" />
                            }
                        </span>
                        {id ? `Edit Cheque #${data.serial}` : "New Cheque"}
                    </p>
                    <div className="feedback">
                        {msg && <div className="message" id="msg">
                            <p>
                                {msg}
                            </p>
                        </div>}
                        {message && <div className="message" id="message">
                            <p>
                                {message}
                            </p>
                        </div>}
                        {error && <div className="message" id="error">
                            <p className="error">
                                Serial Number Already used
                            </p>
                        </div>}
                    </div>
                </div>
                <form autoComplete="off" className="form" onSubmit={handleSubmit}>
                    <div className="two_items_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="dueDate">Due Date</label></p></span>
                            <div className="input_box">
                                <input type="date" id="dueDate" name="dueDate" value={data.dueDate} onChange={handleInfoChange} required />
                            </div>
                        </div>
                        <div className="input_box_container">
                            <span><p><label htmlFor="serial">Serial Number</label></p></span>
                            <div className="input_box">
                                <input type="text" id="serial" name="serial" value={data.serial} onChange={handleInfoChange} required />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="two_items_row">
                        <div className="input_box_container">
                            <span><p>
                                <label htmlFor="payee">Payee{cheques?.isDeleted ? ` - Deleted Payee` : ``}</label>
                            </p></span>
                            <div className="input_box">
                                <select name="payee" id="payee" onChange={handleInfoChange} value={data.payee} >
                                    <option disabled hidden value="">Choose...</option>
                                    {
                                        payees.map(createOptions)
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="input_box_container">
                            <span><p><label htmlFor="value">Value</label></p></span>
                            <div className="icon_input">
                                <span>
                                    <FontAwesomeIcon icon="fa-solid fa-shekel-sign" size="lg" />
                                </span>
                                <input type="text" id="value" name="value" value={data.value} onChange={handleInfoChange} required />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="notes_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="description">Extra Notes</label></p></span>
                            <div className="input_box">
                                <textarea type="text" id="description" name="description" value={data.description} onChange={handleInfoChange} maxLength="200" />
                            </div>
                        </div>
                    </div>
                    <div className="submit_row">
                        <div className="checkbox_row">
                            <input type="checkbox" name="isCancelled" id="isCancelled" checked={data.isCancelled ? "checked" : ""} onChange={toggleCancelled} />
                            <p><label htmlFor="isCancelled">Cancelled</label></p>
                        </div>
                        <div></div>
                        <button type="submit" className="button primary">
                            {id ? "Edit" : "Add"}
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default ChequeForm;