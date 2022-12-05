import axios, { AxiosRequestConfig } from "axios";

const API = {
    get: async <T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> => {
        const axiosResponse = await axios.get(url, config);
        return axiosResponse.data.data as unknown as T;
    }
}
export default API;