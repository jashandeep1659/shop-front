import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import api from "../api";
import { CART_NUMBER_UPDATER } from "../actions/index";
import { Link } from "react-router-dom";
import { Form, Field } from "react-final-form";

const CartPage = (props) => {
    const [cartIsEmpty, setcartIsEmpty] = useState(true);
    const onSubmit = (values) => {
        console.log(values);
    };

    const [totalPrice, settotalPrice] = useState(0);
    useEffect(() => {
        if (props.CART_NUMBER_PROVIDER.length === 0) {
            setcartIsEmpty(true);
        } else {
            setcartIsEmpty(false);
        }
        let price = 0;
        let data = props.CART_NUMBER_PROVIDER;
        data.forEach((element) => {
            price = element.product.price * element.quantity + price;
        });
        settotalPrice(price);
    }, [props.CART_NUMBER_PROVIDER]);

    const removeFromCart = (id) => {
        api.delete(`cart/${id}/`).then((response) => {
            props.CART_NUMBER_UPDATER();
        });
    };

    const addFromCart = (id) => {
        let data = { action: "add" };
        api.put(`cart/${id}/`, data).then((response) => {
            props.CART_NUMBER_UPDATER();
        });
    };
    const minusFromCart = (id) => {
        let data = { action: "minus" };
        api.put(`cart/${id}/`, data).then((response) => {
            props.CART_NUMBER_UPDATER();
        });
    };

    const CartItemRender = props.cart_items.map((item, index) => {
        return (
            <div
                className="cart-item flex rounded-lg p-2 align-center "
                key={index}
            >
                <Link to={`/product/${item.product.slug}/`}>
                    <img className=" w-32" src={item.product.card_banner} />
                </Link>
                <div className="text flex flex-col justify-center ml-2">
                    <Link to={`/product/${item.product.slug}/`}>
                        <h1 className="text-lg font-bold">
                            {item.product.name}
                        </h1>
                    </Link>

                    <h1 className="text-md">${item.product.price}</h1>
                    <h1 className="text-sm">
                        quantity :
                        <button
                            className="mx-2 px-2  bg-green-300 rounded"
                            onClick={() => addFromCart(item.id)}
                        >
                            +
                        </button>
                        {item.quantity}
                        <button
                            className={`mx-2 px-2  ${
                                item.quantity > 1 ? "bg-red-300" : "bg-red-100"
                            } rounded`}
                            disabled={item.quantity > 1 ? false : true}
                            onClick={() => minusFromCart(item.id)}
                        >
                            -
                        </button>
                    </h1>
                    <div className="flx">
                        <button
                            className="mt-2 text-red-600 font-lighter text-sm "
                            onClick={() => removeFromCart(item.id)}
                        >
                            Remove Item
                        </button>
                    </div>
                </div>
            </div>
        );
    });

    if (cartIsEmpty) {
        return (
            <div className="md:mx-48 md:px-48 mx-12 pt-12">
                <img className="w-full" src="./images/empty.svg" />
            </div>
        );
    } else {
        return (
            <section className="md:grid grid-cols-4 mx-6  gap-4" id="Cart">
                <div className="cart col-span-3 ">
                    {CartItemRender}
                    <div className="p-4  flex justify-end ">
                        <h1 className="text-xl font-bold">
                            Total: ${totalPrice}
                        </h1>
                    </div>
                </div>
                <div className="">
                    <div className="checkout w-full  mt-6 p-3 bg-blue-100 rounded-xl py-6">
                        <h1 className="font-bold text-xl">Checkout Form</h1>
                        <div className="">
                            <Form
                                onSubmit={onSubmit}
                                validate={(values) => {
                                    const errors = {};
                                    if (!values.city) {
                                        errors.city = "City required";
                                    }
                                    if (!values.address) {
                                        errors.address = "Address required";
                                    }
                                    if (!values.zip_code) {
                                        errors.zip_code = "Zip Code required";
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
                                        className="bg-blue-100 mt-5 space-y-3"
                                    >
                                        <Field name="zip_code">
                                            {({ input, meta }) => (
                                                <div>
                                                    <label className="font-medium  mb-2 block">
                                                        Zip Code:
                                                    </label>
                                                    <input
                                                        {...input}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-lg"
                                                        type="text"
                                                        placeholder="your@email.com"
                                                    />
                                                    {meta.error &&
                                                        meta.touched && (
                                                            <span className="text-sm text-red-400 font-medium">
                                                                {meta.error}
                                                            </span>
                                                        )}
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="city">
                                            {({ input, meta }) => (
                                                <div>
                                                    <label className="font-medium  mb-2 block">
                                                        City:
                                                    </label>
                                                    <input
                                                        {...input}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-lg"
                                                        type="text"
                                                        placeholder="street "
                                                    />
                                                    {meta.error &&
                                                        meta.touched && (
                                                            <span className="text-sm text-red-400 font-medium">
                                                                {meta.error}
                                                            </span>
                                                        )}
                                                </div>
                                            )}
                                        </Field>
                                        <Field name="address">
                                            {({ input, meta }) => (
                                                <div>
                                                    <label className="font-medium  mb-2 block">
                                                        Address:
                                                    </label>
                                                    <textarea
                                                        {...input}
                                                        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm rounded-lg"
                                                        type="text"
                                                        placeholder="Address "
                                                    />
                                                    {meta.error &&
                                                        meta.touched && (
                                                            <span className="text-sm text-red-400 font-medium">
                                                                {meta.error}
                                                            </span>
                                                        )}
                                                </div>
                                            )}
                                        </Field>
                                        <div>
                                            <button className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
                                                Checkout
                                            </button>
                                        </div>
                                    </form>
                                )}
                            />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        cart_items: state.CART_NUMBER_PROVIDER,
        CART_NUMBER_PROVIDER: state.CART_NUMBER_PROVIDER,
    };
};
export default connect(mapStateToProps, { CART_NUMBER_UPDATER })(CartPage);
