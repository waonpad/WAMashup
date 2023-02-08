import React, {useContext, createContext, useState, ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { useErrorHandler } from "react-error-boundary";

import { API_URL } from "@/config";

export const axiosApp = axios.create({
    baseURL: API_URL,
});

axiosApp.defaults.baseURL = API_URL;
axiosApp.defaults.headers.post['Content-Type'] = 'application/json';
axiosApp.defaults.headers.post['Accept'] = 'application/json';
axiosApp.defaults.withCredentials = true;
axiosApp.interceptors.request.use(function(config){
    config.headers = config.headers ?? {};
    // const token = localStorage.getItem('auth_token');
    // config.headers.Authorization = token ? `Bearer ${token}` : '';

    // console.log(config);
    return config;
}, function(error) {
    return Promise.reject(error);
});
axiosApp.interceptors.response.use(
    async (response) => {
        return response;
    }, error => {
        const {status} = error.response;
        switch (status) {
            case 400:
                console.log(error.response);
            break;
            case 401:
                console.log("Unauthorized");
                // navigate('/login');
                return;
            break;
            case 404:
                console.log(error.response?.status);
            break;
            case 500:
                console.log("server error");
            break;
            default:
                console.log("an unknown error occurred");
            break;
        }

        console.log('error');
        return Promise.reject(error);
    },
);