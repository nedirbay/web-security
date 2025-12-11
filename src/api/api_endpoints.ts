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

export const scan = () => {
    return httpClient.get(`scan/`);
}

export const adminLogin = (data : any) => {
    return httpClient.post(`adminLogin/`, data);
}
