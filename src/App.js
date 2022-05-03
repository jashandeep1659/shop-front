import React, { useEffect, useLayoutEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import { AUTHENTICATE_THE_USER } from "./actions/";
import { connect } from "react-redux";
import BrandPage from "./pages/BrandPage";

const App = (props) => {
    const [paddingTop, setpaddingTop] = useState("0");
    const Wrapper = ({ children }) => {
        const location = useLocation();
        useLayoutEffect(() => {
            document.documentElement.scrollTo(0, 0);
        }, [location.pathname]);
        return children;
    };
    useEffect(() => {
        props.AUTHENTICATE_THE_USER();
        try {
            if (document.querySelector("#Navbar")) {
                setpaddingTop(document.querySelector("#Navbar").clientHeight);
            }
        } catch (err) {
            console.log(err);
        }
        try {
            if (document.querySelector("#Mobile-Navbar")) {
                setpaddingTop(
                    document.querySelector("#Mobile-Navbar").clientHeight
                );
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <div>
            <BrowserRouter>
                <Wrapper>
                    <Navbar />
                    <div className="" style={{ marginTop: paddingTop + "px" }}>
                        <Routes>
                            <Route exact path="/" element={<HomePage />} />
                            <Route
                                exact
                                path="/product/:productID"
                                element={<ProductPage />}
                            />
                            <Route
                                exact
                                path="/brand/:slug"
                                element={<BrandPage />}
                            />
                            <Route
                                path="/signup"
                                exact
                                element={<SignUpPage />}
                            />
                            <Route
                                exact
                                path="/login"
                                element={<LoginPage />}
                            />
                            <Route exact path="/cart" element={<CartPage />} />
                        </Routes>
                        <Footer />
                    </div>
                </Wrapper>
            </BrowserRouter>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        userStatus: state.AUTHENTICATE_THE_USER,
    };
};
export default connect(mapStateToProps, { AUTHENTICATE_THE_USER })(App);
