import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App.jsx";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createWorker, findWorker, updateWorker } from "../../features/Workers/workersSlice";
import { setUserPermissions, setUserPassword } from "../../features/Users/userSlice";

import axios from "axios";
import { useTranslation } from "react-i18next";

import * as Containers from "../../containers";
import Loading from "../../components/Loading";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./WorkersForm.scss";

const WorkerForm = () => {
    const { t } = useTranslation();
    // worker id
    let { id } = useParams();
    const { user } = useContext(UserContext);

    document.title = id ? "Manager - Edit Worker" : "Manager - New Worker";

    const initialState = {
        name: "",
        username: "",
        password: "",
        email: "",
        phoneNumber: "",
    }

    const passwordsInitialState = {
        password: "",
        confirmPassword: ""
    }

    const [data, setData] = useState(initialState);

    const permissionsArray = ["User", "Spectator", "Supervisor", "Administrator"];
    const [permission, setPermission] = useState(permissionsArray[0]);

    const [password, setPassword] = useState(passwordsInitialState);

    const [msg, setMessage] = useState("");
    const [available, setAvailable] = useState(true);
    const [inValidPasswords, setInValidPasswords] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(findWorker({ id: id })).then(({ payload: { worker } }) => {
                setData({
                    name: worker.name,
                    email: worker.email,
                    phoneNumber: worker.phoneNumber,
                })
                setPermission(worker.accessLevel);
            }).catch((error) => {
                setMessage("Something went wrong!");
                return console.log(error);
            })
        }
    }, [])
    const { message, loading, error, workers } = useSelector((state) => state.workers);
    const userMsg = useSelector((state) => state.user.message);
    const username = workers?.worker?.username || "";


    //  Change Handlers 
    const handleInfoChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handlePasswordChange = ({ currentTarget: input }) => {
        setPassword({ ...password, [input.name]: input.value });
    };

    const handlePermissionChange = ({ currentTarget: input }) => {
        setPermission(permissionsArray[input.value])
    };

    // Validations

    const checkUsername = async ({ currentTarget: usernameInput }) => {
        const username = { username: usernameInput.value }
        if (username.username.length) {
            const url = "/api/checkUsername";
            await axios.post(url, username).then((res) => {
                setAvailable(true);
            }).catch((error) => {
                setAvailable(false);
            })
        }
    };
    const checkPassword = () => {
        if ((data.password === data.confirmPassword) && (password.password === password.confirmPassword)) {
            setMessage("");
            setInValidPasswords(false);
            return true;
        }
        else {
            setMessage(t("notSamePassword"));
            setInValidPasswords(true);
            return false;
        }
    }

    function validate() {
        if (
            data.name &&
            (data.username.length && available) &&
            data.password.length
        ) {
            if (id) {
                return true;
            } else {
                return checkPassword();
            }
        }
        return false;
    }


    // Click Handlers

    const clearState = () => {
        setData({ ...initialState });
        setPassword({ ...passwordsInitialState });
        setMessage("");
        setAvailable(true);
        setInValidPasswords(false);
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";

    };

    const updateUserInfo = event => {
        event.preventDefault();
        if (id) {
            dispatch(updateWorker({
                id,
                data: {
                    name: data.name,
                    email: data.email,
                    phoneNumber: data.phoneNumber
                }
            }
            ));
        } else {
            if (validate()) {
                dispatch(createWorker(data))
                clearState();
            }
            else {
                setMessage(t("doubleCheck"));
            }
        }
    };

    const updateUserPermissions = event => {
        event.preventDefault();
        dispatch(setUserPermissions({
            id,
            permission,
        }));
    }

    const updateUserPassword = event => {
        event.preventDefault();
        if (checkPassword()) {
            dispatch(setUserPassword({
                id,
                password: password.password,
            }))
            document.getElementById("password").value = "";
            document.getElementById("confirmPassword").value = "";
        }
    }

    return (
        <>
            <Containers.FormsHeader title="workers" />
            {loading && <Loading />}
            <section className="form_container">
                <div className="form_title">
                    <p>
                        <span>{id ?
                            <FontAwesomeIcon icon="fa-solid fa-pen-to-square" size="lg" />
                            :
                            <FontAwesomeIcon icon="fa-solid fa-plus" size="lg" />
                        }</span>
                        {id ? `${t("editWorker")}` : `${t("newWorker")}`}
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
                        {userMsg && <div className="message" id="message">
                            <p>
                                {userMsg}
                            </p>
                        </div>}
                        {error && <div className="message" id="error">
                            <p className="error">
                                {t("dupKey")}
                            </p>
                        </div>}
                    </div>
                </div>
                <form autoComplete="off" className="form" onSubmit={updateUserInfo}>
                    <div className="input_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="name">{t("workerName")}</label></p></span>
                            <div className="input_box">
                                <input onChange={handleInfoChange} id="name" name="name" type="text" value={data.name} />
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
                    <div className="two_inputs_equal_row">
                        <div className="input_box_container">
                            <span><p><label htmlFor="username">{t("username")}</label></p></span>
                            <div className="username_box">
                                <div className="icon_input" id={`${!available ? "invalid" : "valid"}`}>
                                    <span>
                                        <FontAwesomeIcon icon="fa-solid fa-at" size="lg" />
                                    </span>
                                    {!id ?
                                        <>
                                            <input onChange={handleInfoChange} id="username" name="username" type="text" onBlur={checkUsername} required />
                                            {available ?
                                                <span className="feedback valid">
                                                    <FontAwesomeIcon icon="fa-solid fa-circle-check" />
                                                </span>
                                                :
                                                <span className="feedback invalid">
                                                    <FontAwesomeIcon icon="fa-solid fa-circle-xmark" />
                                                </span>
                                            }
                                        </>
                                        :
                                        <p>{username}</p>
                                    }
                                </div>
                            </div>
                        </div>
                        {(id && user?.accessLevel === "Administrator") ?
                            <div className="input_box_container">
                                <span><p><label htmlFor="permission">{t("accessLevel")}</label></p></span>
                                <div className="slider_container">
                                    <p>
                                        {t(permission)}
                                    </p>
                                    <input type="range" name="accessLevel" id="permission" className="slider" min={0} max={3} step={1} value={permissionsArray.indexOf(permission)} onChange={handlePermissionChange} />
                                </div>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                    <hr />
                    {!id ?
                        <>
                            {/* New User password fields */}
                            <div className="two_inputs_equal_row">
                                <div className="input_box_container">
                                    <span><p><label htmlFor="password">{t("password")}</label></p></span>
                                    <div className="input_box" id={`${inValidPasswords ? "invalid" : ""}`}>
                                        <input onChange={handleInfoChange} id="password" name="password" type="password" />
                                    </div>
                                </div>
                                <div className="input_box_container">
                                    <span><p><label htmlFor="confirmPassword">{t("confirmPassword")}</label></p></span>
                                    <div className="input_box" id={`${inValidPasswords ? "invalid" : ""}`}>
                                        <input onChange={handleInfoChange} id="confirmPassword" name="confirmPassword" type="password" onBlur={checkPassword} />
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        user?.accessLevel === "Administrator" ?
                            <>
                                {/* Update User password fields */}
                                <div className="two_inputs_equal_row">
                                    <div className="input_box_container">
                                        <span><p><label htmlFor="password">{t("password")}</label></p></span>
                                        <div className="input_box" id={`${inValidPasswords ? "invalid" : ""}`}>
                                            <input type="password" id="password" name="password" onChange={handlePasswordChange} />
                                        </div>
                                    </div>
                                    <div className="input_box_container">
                                        <span><p><label htmlFor="confirmPassword">{t("confirmPassword")}</label></p></span>
                                        <div className="input_box" id={`${inValidPasswords ? "invalid" : ""}`}>
                                            <input type="password" id="confirmPassword" name="confirmPassword" onChange={handlePasswordChange} onBlur={checkPassword} />
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <div>

                            </div>

                    }

                    <div className="submit_row">
                        {(id && user?.accessLevel === "Administrator") ? <button className="button primary" onClick={updateUserPassword}>
                            {t("updatePassword")}
                        </button> :
                            <div></div>
                        }
                        {(id && user?.accessLevel === "Administrator") ? <button className="button primary" onClick={updateUserPermissions}>
                            {t("updatePermissions")}
                        </button> :
                            <div></div>
                        }
                        <button className="button primary" type="submit">
                            {id ? `${t("edit")}` : `${t("add")}`}
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default WorkerForm;