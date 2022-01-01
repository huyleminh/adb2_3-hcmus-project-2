import axios from "axios";
import AuthService from "./AuthService";

const ClientAPI = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // headers: {
    //     "Content-Type": "application/json",
    // },
});

ClientAPI.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        const token = AuthService.getUserToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
ClientAPI.interceptors.response.use(
    function (response) {
        // code, statusText, ..., data
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        if (response && response.status === 200) {
            if (response && (response.data.status === 403 || response.data.status === 401)) {
                AuthService.removeUser();
                return response.data;
            }
        }
        return response.data;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    }
);

export default ClientAPI;
