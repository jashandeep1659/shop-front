import { combineReducers } from "redux";

const mainBannerApi = (state = {}, action) => {
    switch (action.type) {
        case "mainBannerApi":
            return (state = action.payload);
        default:
            return state;
    }
};

const AllProducts = (state = {}, action) => {
    switch (action.type) {
        case "AllProducts":
            return (state = action.payload);
        default:
            return state;
    }
};

const AUTHENTICATE_THE_USER = (state = false, action) => {
    switch (action.type) {
        case "AUTHENTICATE_THE_USER":
            return (state = action.payload);
        default:
            return state;
    }
};

const CART_NUMBER_PROVIDER = (state = [], action) => {
    switch (action.type) {
        case "CART_NUMBER_UPDATER":
            return (state = action.payload);
        default:
            return state;
    }
};

export default combineReducers({
    mainBannerApi: mainBannerApi,
    AllProducts,
    AUTHENTICATE_THE_USER,
    CART_NUMBER_PROVIDER,
});
