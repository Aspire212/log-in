/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";

import "./Auth.css";
import { signIn } from "../../requests/request";

interface AuthProps {
    signIn: (arg0: (a: string) => void, b: object) => void;
    authKey: string;
    setAuthKey: (a: string) => void;
}

const Auth: React.FC<AuthProps> = ({ signIn, authKey, setAuthKey }) => {
    const validate = yup.object().shape({
        email: yup
            .string()
            .matches(
                /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                "invalid email",
            ),
        password: yup.string().min(4),
    });

    const checkUser = (email: string, password: string): void => {
        signIn(setAuthKey, {
            clientId: 1,
            email: email,
            password: password,
        });
    };

    return (
        <div>
            no logged
            <div>
                {authKey === "no-token" && (
                    <div className="error">
                        <p>user is not registered, please try again</p>
                    </div>
                )}
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    onSubmit={(values) => {
                        checkUser(values.email, values.password);
                        setTimeout(() => {
                            values.email = "";
                            values.password = "";
                        }, 1000);
                    }}
                    validationSchema={validate}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        isValid,
                        handleSubmit,
                        dirty,
                    }) => (
                        <div>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder="Enter your email"
                                />
                                <div className="error">
                                    {touched.email && errors.email && (
                                        <p>{errors.email}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <input
                                    name="password"
                                    type={"password"}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder="Enter your password"
                                />
                                <div className="error">
                                    {touched.password && errors.password && (
                                        <p>{errors.password}</p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={!isValid || !dirty}
                                    onClick={() =>
                                        checkUser(values.email, values.password)
                                    }>
                                    Sign In
                                </button>
                            </div>
                        </div>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Auth;
