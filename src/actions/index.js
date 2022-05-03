import api from "../api/index";
import axios from "axios";

export const mainBannerApi = () => {
    return async (dispatch) => {
        const response = await api.get("/banner/");
        dispatch({ type: "mainBannerApi", payload: response.data });
    };
};

export const AllProducts = () => {
    return async (dispatch) => {
        const response = await api.get("/product/");
        dispatch({ type: "AllProducts", payload: response.data });
    };
};

export const AUTHENTICATE_THE_USER = () => {
    return async (dispatch) => {
        let status = false;
        if (localStorage.getItem("token")) {
            let AuthTokens = JSON.parse(localStorage.getItem("token"));
            const refresh = AuthTokens.refresh;
            const response = await axios
                .post("http://192.168.1.4:8000/api/token/refresh/", { refresh })
                .catch((error) => {
                    localStorage.removeItem("token");
                });
            status = true;
            localStorage.setItem("token", JSON.stringify(response.data));
        }
        dispatch({ type: "AUTHENTICATE_THE_USER", payload: status });
    };
};

export const CART_NUMBER_UPDATER = () => {
    return async (dispatch) => {
        const response = await api.get("cart/");
        dispatch({ type: "CART_NUMBER_UPDATER", payload: response.data });
    };
};
