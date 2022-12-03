import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { createPayee, findPayee, updatePayee } from "../../features/Payees/payeesSlice";
import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PayeeForm = () => {
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
                        {id ? "Edit Payee" : "New Payee"}
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
                                Payee already Defined
                            </p>
                        </div>}
                    </div>
                </div>
                <form autoComplete="off" className="form" onSubmit={handleSubmit}>
                    <div className="input_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="name">Payee Name</label></p></span>
                            <div className="input_box">
                                <input onChange={handleInfoChange} id="name" name="name" type="text" value={data.name} required />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="input_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="email">Email</label></p></span>
                            <div className="input_box">
                                <input onChange={handleInfoChange} id="email" name="email" type="text" value={data.email} />
                            </div>
                        </div>
                    </div>
                    <div className="input_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="phoneNumber">Phone Number</label></p></span>
                            <div className="input_box">
                                <input onChange={handleInfoChange} id="phoneNumber" name="phoneNumber" type="text" value={data.phoneNumber} />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="notes_row">
                        <div className="input_box_container">
                            <span><p>
                                <label htmlFor="extraNotes">Extra Notes</label>
                            </p></span>
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

export default PayeeForm;


{/* <section className="container">
    <div className="login-container">
        <div className="circle circle-one"></div>
        <div className="form-container">
            <h1 className="opacity">{id && data ? `Edit - ${data.name}` : "New Payee"}</h1>
            <form onSubmit={handleSubmit} autoComplete="off" >
                {message && <div>{message}</div>}
                {error && <div>{error}</div>}
                <input onChange={handleChange} name="name" type="text" placeholder="Name" value={data.name} required />
                <button type="submit" className="opacity">{id ? "Edit" : "Add"}</button>
            </form>
        </div>
        <div className="circle circle-two"></div>
    </div>
    <div className="theme-btn-container"></div>
</section> */}