import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { fetchWorkers } from "../../features/Workers/workersSlice";
import { findLog, createLog, updateLog } from "../../features/Logs/logsSlice";

import { useTranslation } from "react-i18next";

import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./LogsForm.scss";

const LogForm = () => {
    const {t, i18n} = useTranslation();
    // log id
    let { id } = useParams();
    document.title = id ? "Manager - Edit Log" : "Manager - New Log";

    const date = new Date();

    const initialState = {
        date: String(date.getFullYear()) + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'),
        worker: "",
        payment: 0,
        isAbsence: false,
        startingTime: "08:30",
        finishingTime: "16:30",
        OTV: "",
        extraNotes: "",
    }
    const [data, setData] = useState(initialState);
    const [msg, setMessage] = useState("")

    const handleInfoChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWorkers({ search: "" }));
        if (id) {
            dispatch(findLog(id)).then(({ payload: log }) => {
                setData({
                    date: log.date.substring(0, 10),
                    worker: log.worker._id,
                    payment: log.payment,
                    isAbsence: log.isAbsence,
                    startingTime: log.startingTime,
                    finishingTime: log.finishingTime,
                    extraNotes: log.extraNotes,
                })
            }).catch((error) => {
                setMessage("Something went wrong!");
                return console.log(error);
            })
        }
    }, [])

    const { loading, workers } = useSelector((state) => state.workers);
    const { message, logs, error } = useSelector((state) => state.logs);
    const logsLoading = useSelector((state) => state.logs.loading);
    const name = logs?.worker?.name || "";

    const clearState = () => {
        setData({ ...initialState });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let end = data.finishingTime.split(':');
        let start = data.startingTime.split(':');
        let x = parseInt(end[0]) - parseInt(start[0]);
        let y = (parseInt(end[1]) - parseInt(start[1])) / 60;
        data.OTV = x + y - 8;
        if (id) {
            dispatch(updateLog({
                id,
                data
            }))
        } else {
            dispatch(createLog(data))
            clearState();
        }
    };

    const toggleAbsence = () => {
        setData({
            ...data,
            isAbsence: !data.isAbsence
        })
    }

    function createOptions(worker) {
        return (<option
            key={worker._id}
            value={worker._id}
        >
            {worker.name}
        </option>
        );
    }

    return (
        <>
            <Containers.FormsHeader title="logs" />
            {loading && <Loading />}
            {logsLoading && <Loading />}
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
                        {id ? `${t("editLog")}` : `${t("newLog")}`}</p>
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
                                {t("dupKey")}
                            </p>
                        </div>}
                    </div>
                </div>
                <form autoComplete="off" className="form" onSubmit={handleSubmit}>
                    <div className="date_time_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="date">{t("date")}</label></p></span>
                            <div className="input_box">
                                <input type="date" id="date" name="date" value={data.date} onChange={handleInfoChange} />
                            </div>
                        </div>
                        <div className="input_box_container">
                            <span><p><label htmlFor="startingTime">{t("started")}</label></p></span>
                            <div className="input_box">
                                <input type="time" id="startingTime" name="startingTime" onChange={handleInfoChange} value={data.startingTime} />
                            </div>
                        </div>
                        <div className="input_box_container">
                            <span><p><label htmlFor="finishingTime">{t("finished")}</label></p></span>
                            <div className="input_box">
                                <input type="time" id="finishingTime" name="finishingTime" onChange={handleInfoChange} value={data.finishingTime} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="two_items_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="Worker">{t("worker")}</label></p></span>
                            <div className="input_box">
                                {!id ?
                                    <select id="worker" name="worker" onChange={handleInfoChange} value={data.worker} required>
                                        <option disabled hidden value="">{t("choose")}</option>
                                        {
                                            workers.map(createOptions)
                                        }
                                    </select>
                                    :
                                    <p>{name}</p>
                                }
                            </div>
                        </div>
                        <div className="input_box_container">
                            <span><p><label htmlFor="payment">{t("payment")}</label></p></span>
                            <div className="icon_input">
                                <span>
                                    <FontAwesomeIcon icon="fa-solid fa-shekel-sign" size="lg" />
                                </span>
                                <input type="text" id="payment" name="payment" value={data.payment} onChange={handleInfoChange} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="notes_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="extraNotes">{t("extraNotes")}</label></p></span>
                            <div className="input_box">
                                <textarea type="text" id="extraNotes" name="extraNotes" value={data.extraNotes} onChange={handleInfoChange} maxLength="150" />
                            </div>
                        </div>
                    </div>
                    <div className="submit_row">
                        <div className="checkbox_row">
                            <input type="checkbox" id="isAbsence" name="isAbsence" checked={data.isAbsence ? "checked" : ""} onChange={toggleAbsence} />
                            <p><label htmlFor="isAbsence">{t("absence")}</label></p>
                        </div>
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

export default LogForm;