import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { AUTHENTICATE_THE_USER } from "../actions";
import { connect } from "react-redux";

const LoginPage = (props) => {
    let navigate = useNavigate();
    const [sendingdata, setsendingdata] = useState(false);
    const [submitFormError, setsubmitFormError] = useState("");
    const onSubmit = (values) => {
        setsubmitFormError("");
        values["email"] = values["email"].toLowerCase();
        setsendingdata(true);
        api.post("api/token/", values)
            .then((response) => {
                if (response) {
                    if (response.status === 200) {
                        localStorage.setItem(
                            "token",
                            JSON.stringify(response.data)
                        );
                        props.AUTHENTICATE_THE_USER();
                        navigate("/");
                    }
                    setsendingdata(false);
                }
            })
            .catch((error) => {
                if (error) {
                    props.AUTHENTICATE_THE_USER();
                    if (error.response.status === 401) {
                        console.log("email or password is worng");
                        setsubmitFormError("Email or password is wrong");
                    } else {
                        console.log("something went wrong");
                        setsubmitFormError("Something went wrong");
                    }
                }
                setsendingdata(false);
            });
    };
    return (
        <section className="">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Welcome Back
                        </h2>
                    </div>
                    <Form
                        onSubmit={onSubmit}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = "Email required";
                            }
                            if (!values.password) {
                                errors.password = "Password required";
                            }

                            return errors;
                        }}
                        render={({
                            submitError,
                            handleSubmit,
                            form,
                            submitting,
                            pristine,
                            values,
                        }) => (
                            <form
                                onSubmit={handleSubmit}
                                className="bg-blue-100 py-6 px-6 rounded-lg mt-8 space-y-3"
                            >
                                <p className="font-bold text-red-500">
                                    {submitFormError}
                                </p>
                                <Field name="email">
                                    {({ input, meta }) => (
                                        <div>
                                            <label className="font-medium  mb-2 block">
                                                Email:
                                            </label>
                                            <input
                                                {...input}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-lg"
                                                type="email"
                                                placeholder="your@email.com"
                                            />
                                            {meta.error && meta.touched && (
                                                <span className="text-sm text-red-400 font-medium">
                                                    {meta.error}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </Field>

                                <Field name="password">
                                    {({ input, meta }) => (
                                        <div>
                                            <label className="font-medium  mb-2 block">
                                                Password:
                                            </label>
                                            <input
                                                {...input}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-lg"
                                                type="password"
                                                placeholder="*******"
                                            />
                                            {meta.error && meta.touched && (
                                                <span className="text-sm text-red-400 font-medium">
                                                    {meta.error}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </Field>
                                <div className="mt-4">
                                    <div className="md:flex items-center justify-between py-4">
                                        <div className="text-sm text-center md:mt-0 mt-3">
                                            <a
                                                href="#"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                {" "}
                                                Forgot your password?{" "}
                                            </a>
                                        </div>

                                        <div className="text-sm text-center md:mt-0 mt-3">
                                            <Link
                                                to="/signup"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                {" "}
                                                Don't have account?{" "}
                                            </Link>
                                        </div>
                                    </div>

                                    <div>
                                        {!sendingdata ? (
                                            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                    <svg
                                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                                Sign In
                                            </button>
                                        ) : (
                                            <button
                                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                disabled
                                            >
                                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                    <svg
                                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </span>
                                                <i className="bx bx-loader m-0 animate-spin"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        )}
                    />
                </div>
            </div>
        </section>
    );
};

export default connect(null, { AUTHENTICATE_THE_USER })(LoginPage);
