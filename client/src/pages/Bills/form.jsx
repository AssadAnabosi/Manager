import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { findBill, createBill, updateBill } from "../../features/Bills/billsSlice";

import { useTranslation } from "react-i18next";

import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BillForm = () => {
    const {t, i18n} = useTranslation();
    // bill id
    let { id } = useParams();
    document.title = id ? "Manager - Edit Bill" : "Manager - New Bill";

    const date = new Date();
    const initialState = {
        date: String(date.getFullYear()) + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0"),
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
                        {id ? `${t("editBill")}` : `${t("newBill")}`} </p>
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
                                {t("desnull")}
                            </p>
                        </div>}
                    </div>
                </div>
                <form autoComplete="off" className="form" onSubmit={handleSubmit}>
                    <div className="two_items_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="id">{t("date")}</label></p></span>
                            <div className="input_box">
                                <input id="date" type="date" name="date" value={data.date} onChange={handleInfoChange} required />
                            </div>
                        </div>
                        <div className="input_box_container">
                            <span><p><label htmlFor="value">{t("value")}</label></p></span>
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
                            <span><p><label htmlFor="description">{t("description")}</label></p></span>
                            <div className="input_box">
                                <textarea type="text" id="description" name="description" value={data.description} onChange={handleInfoChange} maxLength="150" required />
                            </div>
                        </div>
                    </div>
                    <div className="notes_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="extraNotes">{t("extraNotes")}</label></p></span>
                            <div className="input_box">
                                <textarea type="text" id="extraNotes" name="extraNotes" value={data.extraNotes} onChange={handleInfoChange} maxLength="150" />
                            </div>
                        </div>
                    </div>
                    <div className="submit_row">
                        <div></div>
                        <div></div>
                        <button type="submit" className="button primary">
                            {id ? `${t("edit")}` : `${t("add")}`}
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default BillForm;