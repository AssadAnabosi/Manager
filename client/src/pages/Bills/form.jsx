import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import { findBill, createBill, updateBill } from "../../features/Bills/billsSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BillForm = () => {
    // bill id
    let { id } = useParams();
    document.title = id ? "Manager - Edit Bill" : "Manager - New Bill";

    const date = new Date();
    const initialState = {
        date: String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'),
        value: "",
        description: "",
        extraNotes: "",
    }
    const [data, setData] = useState(initialState);
    const [msg, setMessage] = useState("");

    const dispatch = useDispatch();

    const handleInfoChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    useEffect(() => {
        if (id) {
            dispatch(findBill(id)).then(({ payload: bill }) => {
                setData({
                    date: bill.date.substring(0, 10),
                    value: bill.value,
                    description: bill.description,
                    extraNotes: bill.extraNotes,
                })
            }).catch((error) => {
                setMessage("Something went wrong!");
                return console.log(error);
            })
        }
    }, [])

    const { loading, message, error } = useSelector((state) => state.bills);

    const clearState = () => {
        setData({ ...initialState });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            dispatch(updateBill({
                id,
                data
            }))
        } else {
            dispatch(createBill(data))
            clearState();
        }
    };

    return (
        <>
            <Containers.FormsHeader title="bills" />
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
                        {id ? "Edit Bill" : "New Bill"}</p>
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
                                Description Can't be empty
                            </p>
                        </div>}
                    </div>
                </div>
                <form autoComplete="off" className="form" onSubmit={handleSubmit}>
                    <div className="two_items_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="id">Date</label></p></span>
                            <div className="input_box">
                                <input id="date" type="date" name="date" value={data.date} onChange={handleInfoChange} required />
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
                            <span><p><label htmlFor="description">Description</label></p></span>
                            <div className="input_box">
                                <textarea type="text" id="description" name="description" value={data.description} onChange={handleInfoChange} maxLength="200" required />
                            </div>
                        </div>
                    </div>
                    <div className="notes_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="extraNotes">Extra Notes</label></p></span>
                            <div className="input_box">
                                <textarea type="text" id="extraNotes" name="extraNotes" value={data.extraNotes} onChange={handleInfoChange} maxLength="200" />
                            </div>
                        </div>
                    </div>
                    <div className="submit_row">
                        <div></div>
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

export default BillForm;


{/*

<section className="container">
    <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
            <h1 className="opacity">{id && data ? `Edit - Bill` : "New Bill"}</h1>
            {message && <div id="msg">{message}</div>}
            {msg && <div id="msg">{msg}</div>}
            <form autoComplete="off">
                <input type="date" name="date" value={data.date} onChange={handleInfoChange} />
                <input type="text" name="value" placeholder="VALUE" value={data.value} onChange={handleInfoChange} />
                <input type="text" name="description" placeholder="DESCRIPTION" value={data.description} onChange={handleInfoChange} />
                <input type="string" name="extraNotes" placeholder="EXTRA NOTES" value={data.extraNotes} onChange={handleInfoChange} />
                <button type="submit" className="opacity">{id ? "Edit" : "Add"}</button>
            </form>
        </div>
        <div className="circle circle-two"></div>
    </div>
    <div className="theme-btn-container"></div>
</section>  

*/}