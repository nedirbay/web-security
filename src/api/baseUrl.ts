import axios from "axios";

const baseUrl = "http://127.0.0.1:5000/api/";


export const httpClient = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
    },
});

export default httpClient;