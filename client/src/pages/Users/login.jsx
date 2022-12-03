import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

import { useDispatch } from "react-redux";
import { loginUser } from "../../features/Users/userSlice";

const Login = () => {
    document.title = "Manager - Login";
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (data.username.length && data.password.length) {
            setMessage("");
            try {
                dispatch(loginUser(data)).then(({ payload }) => {
                    if (!payload.success) {
                        setMessage(payload.message)
                    }
                    else {
                        if (location.state?.from) {
                            navigate(location.state.from.pathname);
                        }
                        else {
                            navigate("/");
                        }
                    }
                }).catch((error) => {
                    setMessage("Something went wrong!");
                    return console.log(error);
                })
            }
            catch (error) {
                setMessage(error.message);
            }
        }
        else {
            setMessage("All feilds are required!");
        }
    };
    return (
        <>
            <Container>
                <FormWrap>
                    <FormContent>
                        <Form onSubmit={handleSubmit}>
                            <FormH1>Login to your acount</FormH1>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <FormInput type="text" name="username" onChange={handleChange}></FormInput>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormInput type="password" name="password" onChange={handleChange}></FormInput>
                            <FormButton>Login</FormButton>
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

export default Login