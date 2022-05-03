import React, { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../api";
import { CART_NUMBER_UPDATER } from "../actions/index";

const Navbar = (props) => {
    const [screenWidth, setscreenWidth] = useState(window.innerWidth);
    const [navClosed, setnavClosed] = useState(true);
    const [quantity, setquantity] = useState(0);
    const [brandlist, setbrandlist] = useState([]);
    const brandList = () => {
        api.get("brand/").then((response) => {
            setbrandlist(response.data);
        });
    };
    useEffect(() => {
        brandList();
        return () => {
            setbrandlist([]);
        };
    }, []);

    const BrandListRender = brandlist.map((item, index) => {
        return (
            <li key={index}>
                <Link to={`brand/${item.slug}/`}>{item.name}</Link>
            </li>
        );
    });

    useEffect(() => {
        setnavClosed(true);
        if (props.userStatus) {
            props.CART_NUMBER_UPDATER();
        }
    }, [useLocation()]);

    useEffect(() => {
        let quantity = 0;
        let data = props.CART_NUMBER_PROVIDER;
        data.forEach((element) => {
            quantity = element.quantity + quantity;
        });
        setquantity(quantity);
    }, [props.CART_NUMBER_PROVIDER]);

    function useWindowSize() {
        useLayoutEffect(() => {
            function updateSize() {
                setscreenWidth(window.innerWidth);
            }
            window.addEventListener("resize", updateSize);
            updateSize();
            return () => window.removeEventListener("resize", updateSize);
        }, []);
        return screenWidth;
    }
    useWindowSize();

    if (screenWidth >= 768) {
        return (
            <section id="Navbar" className="border-b">
                <div className="cart">
                    <Link to="/cart">
                        <div>
                            <i className="bx bx-cart-alt"></i>
                            <span>{quantity}</span>
                        </div>
                    </Link>
                </div>
                <Link to="/" className="logo ">
                    Deep Store
                </Link>
                <div className="urls">
                    <ul className="urls ">
                        <li className="urls">
                            <Link className="urls" to="/">
                                Home
                            </Link>
                            <div className="dropdown">
                                Brands <i className="bx bx-down-arrow"></i>
                                <div className="dropdown-menu">
                                    <ul>{BrandListRender}</ul>
                                </div>
                            </div>
                            {!props.userStatus ? (
                                <Link className="urls" to="/signup">
                                    Sign Up
                                </Link>
                            ) : null}
                        </li>
                    </ul>
                </div>
            </section>
        );
    } else {
        return (
            <>
                <section id="Mobile-Navbars" className="border-b">
                    <section id="Mobile-Navbar" className="border-b">
                        <div className="cart">
                            <Link to="/cart">
                                <div>
                                    <i className="bx bx-cart-alt"></i>
                                    <span>{quantity}</span>
                                </div>
                            </Link>
                        </div>
                        <div className="logo text-2xl">
                            <Link to="/">
                                <img src="./dumy/logo.png" />
                            </Link>
                        </div>
                        <div className="urls ">
                            <i
                                className={`bx ${
                                    navClosed ? "bx-menu-alt-right" : "bx-x"
                                }`}
                                onClick={() => setnavClosed(!navClosed)}
                            ></i>
                        </div>
                    </section>
                    <div
                        className={`black ${!navClosed ? "block" : "hidden"}`}
                        onClick={() => setnavClosed(!navClosed)}
                    ></div>
                    <div
                        className={`links bg-gray-100 px-3 ${
                            navClosed ? "hidden" : "block"
                        }`}
                    >
                        <div className="py-3 border-b ">
                            <Link className="" to="/">
                                Home
                            </Link>
                        </div>
                        <div className="py-3 border-b ">
                            <Link className="" to="/cart">
                                Cart
                            </Link>
                        </div>
                        <div className="py-3 border-b ">
                            <Link className="" to="/login">
                                Login
                            </Link>
                        </div>
                        {!props.userStatus ? (
                            <div className="py-3 border-b ">
                                <Link className="" to="/signup">
                                    Sign Up
                                </Link>
                            </div>
                        ) : null}
                    </div>
                </section>
            </>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        userStatus: state.AUTHENTICATE_THE_USER,
        CART_NUMBER_PROVIDER: state.CART_NUMBER_PROVIDER,
    };
};
export default connect(mapStateToProps, { CART_NUMBER_UPDATER })(Navbar);
