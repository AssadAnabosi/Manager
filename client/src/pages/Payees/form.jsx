import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createPayee, findPayee, updatePayee } from "../../features/Payees/payeesSlice";

import { useTranslation } from "react-i18next";

import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PayeeForm = () => {
    const { t, i18n } = useTranslation();
    // payee id
    let { id } = useParams();
    document.title = id ? "Edit Payee" : "New Payee";

    const initialState = {
        name: "",
        email: "",
        phoneNumber: "",
        extraNotes: "",
    };
    const [data, setData] = useState(initialState);
    const [msg, setMessage] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(findPayee({ id: id })).then(({ payload: { payee } }) => {
                setData({
                    name: payee.name,
                    email: payee.email,
                    phoneNumber: payee.phoneNumber,
                    extraNotes: payee.extraNotes
                })
            }).catch((error) => {
                setMessage("Something went wrong!");
                return console.log(error);
            })
        }
    }, [])
    const { message, error, loading } = useSelector((state) => state.payees);

    const handleInfoChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const clearState = () => {
        setData({ ...initialState });
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            dispatch(updatePayee({ id, data }));
        } else {
            dispatch(createPayee(data));
            clearState();
        }
    };

    return (
        <>
            <Containers.FormsHeader title="payees" />
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
                        {id ? `${t("editPayee")}` : `${t("newPayee")}`}
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
                                {t("payeeDef")}
                            </p>
                        </div>}
                    </div>
                </div>
                <form autoComplete="off" className="form" onSubmit={handleSubmit}>
                    <div className="input_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="name">{t("payeeName")}</label></p></span>
                            <div className="input_box">
                                <input onChange={handleInfoChange} id="name" name="name" type="text" value={data.name} required />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="input_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="email">{t("email")}</label></p></span>
                            <div className="input_box">
                                <input onChange={handleInfoChange} id="email" name="email" type="text" value={data.email} />
                            </div>
                        </div>
                    </div>
                    <div className="input_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="phoneNumber">{t("phoneNumber")}</label></p></span>
                            <div className="input_box">
                                <input onChange={handleInfoChange} id="phoneNumber" name="phoneNumber" type="text" value={data.phoneNumber} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="notes_row">
                        <div className="input_box_container">
                            <span><p>
                                <label htmlFor="extraNotes">{t("extraNotes")}</label>
                            </p></span>
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

export default PayeeForm;