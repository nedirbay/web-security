import { httpClient } from "./baseUrl";

export const blogCategories = () => {
    return httpClient.get(`blogcategory/`);
}

export const blogs = (params?: any) => {
    return httpClient.get(`blog/`, { params });
}

export const blogDetail = (id: number) => {
    return httpClient.get(`blog/${id}`);
}

export const scan = (data : any) => {
    return httpClient.post(`scan/`, data);
}

export const adminLogin = (data : any) => {
    return httpClient.post(`adminLogin/`, data);
}

export const scanList = () => {
    return httpClient.get(`scan/`);
}

export const scanDetail = (id: number) => {
    return httpClient.get(`scan/${id}`);
}


