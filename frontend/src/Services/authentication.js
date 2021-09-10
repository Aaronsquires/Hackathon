import axios from "axios";
import { base_URL } from "../Utils/constants";

export const authInstance = axios.create({
    baseURL: base_URL,
    timeout: 10000,
    headers: {
        Authorization: localStorage.getItem('access_token') ? 'JWT ' + localStorage.getItem('access_token') : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});
