import axios, { AxiosRequestConfig } from "axios";

const API = {
  get: async <T>(url: string, config?: AxiosRequestConfig<any>): Promise<T> => {
    const axiosResponse = await axios.get(url, config);
    return axiosResponse.data.data as unknown as T;
  },
};

export const loadXHR = (url: string): Promise<Blob> => {
  return new Promise(function (resolve, reject) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.onerror = function () {
        reject("Network error.");
      };
      xhr.onload = function () {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject("Loading error:" + xhr.statusText);
        }
      };
      xhr.send();
    } catch (err: unknown) {
      const error = err as Error;
      reject(error.message);
    }
  });
};

export default API;
