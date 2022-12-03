import React, { useState, useContext } from "react";
import { UserContext } from "../../App.jsx";

import axios from "axios";
import { useTranslation } from "react-i18next";

import {
    Container,
    FormWrap,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    Text
} from "./Elements";

const ChangePassword = () => {
    const { t, i18n } = useTranslation();
    const year = new Date().getFullYear();
    const {user} = useContext(UserContext)
    document.title = "Manager - Change Password";
    const [data, setData] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const checkPassword = () => {
        if (data.password === data.confirmPassword) {
            setMessage("");
            return true;
        }
        else {
            setMessage(t("notSamePassword"));
            return false;
        }
    }
    function validate() {
        if (
            data.oldPassword.length && data.password.length && data.confirmPassword
            && checkPassword()
        ) {
            return true;
        }
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            setMessage("");
            try {
                const url = "/api/changePassword";
                const { data: res } = await axios.patch(url, data);
                setMessage(res.message);
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setMessage(error.response.data.message);
                }
            }
        }
        else {
            setMessage(t("doubleCheck"));
        }
    };
    return (
        <>
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form onSubmit={handleSubmit}>
                            <FormH1>{t("changePassword")}</FormH1>
                            <FormLabel htmlFor="oldPassword">{t("currentPassword")}</FormLabel>
                            <FormInput type="password" name="oldPassword" onChange={handleChange}></FormInput>
                            <FormLabel htmlFor="password">{t("newPassword")}</FormLabel>
                            <FormInput type="password" name="password" onChange={handleChange}></FormInput>
                            <FormLabel htmlFor="confirmPassword">{t("confirmNewPassword")}</FormLabel>
                            <FormInput type="password" name="confirmPassword" onChange={handleChange}></FormInput>
                            <FormButton>{t("change")}</FormButton>
                            {message &&
                                <Text>{message}</Text>
                            }
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default ChangePassword;