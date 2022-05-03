import axios from "axios";
import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import { Link } from "react-router-dom";
import api from "../api";
// import { FORM_ERROR } from "final-form";
// {submitError ? (
//     <p className="font-bold text-red-500">
//         {submitError}
//     </p>
// ) : null}
const SignupPage = (props) => {
    const [sendingdata, setsendingdata] = useState(false);
    const [submitFormError, setsubmitFormError] = useState("");
    const onSubmit = (values) => {
        setsendingdata(true);
        api.post("user/create/", values)
            .then((response) => {
                if (response && response.status === 200) {
                    console.log("this works well");
                    setsubmitFormError("");
                }
                setsendingdata(false);
            })
            .catch((error) => {
                if (error && error.response.status === 500) {
                    console.log("user already esi");
                    setsubmitFormError("User already exist");
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
                            Create your account
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
                            if (!values.full_name) {
                                errors.full_name = "Name required";
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
                                <Field name="full_name">
                                    {({ input, meta }) => (
                                        <div>
                                            <label className="font-medium  mb-2 block">
                                                Full Name:
                                            </label>
                                            <input
                                                {...input}
                                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-lg"
                                                type="text"
                                                placeholder="John"
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
                                        <div className="flex items-center justify-center">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                required
                                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                            />
                                            <label
                                                htmlFor="remember-me"
                                                className="ml-2 block text-sm text-gray-900"
                                            >
                                                {" "}
                                                Agree terms and conditions
                                            </label>
                                        </div>

                                        <div className="text-sm flex justify-center md:mt-0 mt-4">
                                            <Link
                                                to="/login"
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Already have account?
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
                                                Sign Up
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

export default SignupPage;

/* <Field name="password">
              {({ input, meta }) => (
                <div>
                  <label>Password</label>
                  <input type="password" placeholder="Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>*/
