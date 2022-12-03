import React, { useState } from "react";
import axios from "axios";
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
import { FooterP } from "../Landing/LandingPageElements";
import { UserContext } from "../../App.jsx";
import { useContext } from "react";

const ChangePassword = () => {
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
            setMessage("Password feilds are not the same!");
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
            setMessage("Double check your inputs!");
        }
    };
    return (
        <>
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form onSubmit={handleSubmit}>
                            <FormH1>Change Password</FormH1>
                            <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
                            <FormInput type="password" name="oldPassword" onChange={handleChange}></FormInput>
                            <FormLabel htmlFor="password">New Password</FormLabel>
                            <FormInput type="password" name="password" onChange={handleChange}></FormInput>
                            <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                            <FormInput type="password" name="confirmPassword" onChange={handleChange}></FormInput>
                            <FormButton>Change</FormButton>
                            {message &&
                                <Text>{message}</Text>
                            }
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
            <FooterP>&copy; Assad Anabosi {year}
                {user &&
                    <span> - Currently logged in as {user.username}</span>
                }
            </FooterP>
        </>
    )
}

export default ChangePassword;