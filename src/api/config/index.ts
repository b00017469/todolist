import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '436bdb38-bfa3-4dcc-b208-6cacf9b3b7d8'
    },
});