import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Base API path for all requests
const basePath = 'https://api.vecii.com.co/api/v1/';

type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface RequestConfig extends AxiosRequestConfig { }

async function request<T>(
    method: HttpMethod,
    url: string,
    data?: any,
    config: RequestConfig = {}
): Promise<T> {
    try {
        // Prepend basePath if url is relative
        const fullUrl = url.startsWith('https') ? url : basePath + url.replace(/^\/+/, '');
        let response: AxiosResponse<T>;
        if (method === 'get' || method === 'delete') {
            response = await axios[method]<T>(fullUrl, config);
        } else {
            response = await axios[method]<T>(fullUrl, data, config);
        }
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw {
                status: error.response.status,
                statusText: error.response.statusText,
                body: error.response.data,
            };
        }
        throw error;
    }
}

const http = {
    get<T = any>(url: string, config?: RequestConfig) {
        return request<T>('get', url, undefined, config);
    },
    post<T = any>(url: string, data?: any, config?: RequestConfig) {
        return request<T>('post', url, data, config);
    },
    put<T = any>(url: string, data?: any, config?: RequestConfig) {
        return request<T>('put', url, data, config);
    },
    patch<T = any>(url: string, data?: any, config?: RequestConfig) {
        return request<T>('patch', url, data, config);
    },
    delete<T = any>(url: string, config?: RequestConfig) {
        return request<T>('delete', url, undefined, config);
    },
};

export default http;