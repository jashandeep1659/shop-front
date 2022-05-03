import React, { useState } from "react";
import { Field, Form } from "react-final-form";

const NewsLetter = () => {
    const [errorfield, seterrorfield] = useState("");
    const onSubmit = (values) => {
        console.log(values);
    };

    return (
        <div className="newletter text-center mt-12 py-12  md:px-12 px-6">
            <h1 className="font-bold text-3xl">Subscribe to Our Newsletter</h1>
            <p className="text-gray-500 text-sm mt-4">
                Get all the updates of the latest offers by Email.
            </p>
            <span className="text-sm  text-red-400   font-medium mt-12 block">
                {errorfield}
            </span>
            <div className="flex justify-center mb-12">
                <Form
                    onSubmit={onSubmit}
                    validate={(values) => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = "Email required";
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
                            className="md:flex  justify-center md:w-1/2"
                        >
                            <Field name="email">
                                {({ input, meta }) => (
                                    <div className="w-full">
                                        <input
                                            {...input}
                                            type="email"
                                            name="email"
                                            className="py-2 px-5  border w-full"
                                            placeholder="your@email.com"
                                        />
                                        {meta.error &&
                                            meta.touched &&
                                            seterrorfield(meta.error)}
                                    </div>
                                )}
                            </Field>
                            <button className="py-2 px-3 md:mt-0 mt-6">
                                Submit
                            </button>
                        </form>
                    )}
                />
            </div>
            {/* <form>
                <input
                type="email"
                name="email"
                className="py-2 px-5 my-12 border "
                placeholder="your@email.com"
                />
                <button className="py-2 px-3">Submit</button>
            </form> */}
        </div>
    );
};

export default NewsLetter;
