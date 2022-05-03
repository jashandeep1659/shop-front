import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import reduxStore from "../store";
import { AUTHENTICATE_THE_USER } from "../actions";
import { configOptions } from "final-form";
const { dispatch } = reduxStore;

export const baseURL = "https://shop-backend-01.herokuapp.com/";
const axiosInstance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
});
axiosInstance.interceptors.request.use(
    async (config) => {
        if (localStorage.getItem("token")) {
            let AuthTokens = JSON.parse(localStorage.getItem("token"));
            const user = jwt_decode(AuthTokens.access);
            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
            if (!isExpired) {
                config.headers["Authorization"] = `Bearer ${AuthTokens.access}`;
                return config;
            } else if (isExpired) {
                dispatch(AUTHENTICATE_THE_USER());
                const sendata = () => {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${AuthTokens.access}`;
                    return config;
                };
                sendata();
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosInstance;
