import axios from "axios";
import { parseCookies } from "nookies";

const {'shopchat.token' : token} = parseCookies();

export const api = axios.create({
    baseURL:'http://localhost:4000'
});

if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

