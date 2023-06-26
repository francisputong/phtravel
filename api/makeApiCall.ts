import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

type Response<T> = {
    errorCode?: string;
    message: string;
    successResponse: boolean;
    data: T;
};

export interface UseApiRequestOptions<T>
    extends UseQueryOptions<AxiosResponse<Response<T>>> {
    method?: Method;
    data?: T;
}

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Method for making ajax calls to the site's api
 * @param {String} endpoint - the endpoint url
 * @param {Method | undefined} method api methid POST | GET | DELETE | PUT
 * @param {Object|String} [data] - key:value pairs of the data to be sent to server
 * @returns {Promise}
 */
export default async function makeApiRequest<T>(
    endpoint: string,
    method?: Method,
    data?: any | undefined
) {
    // const auth = getAuth();

    const request: AxiosRequestConfig = {
        method: method || 'GET',
        url: endpoint,
        data: data || '',
        headers: {
            'Content-Type': 'application/json',
            // authorization: `Bearer ${auth ? auth.token : ''}`
        },
    };

    const response: AxiosResponse<Response<T>> = await api(request);

    return response;
}

export const useReactQueryRequest = <T>(
    key: string,
    endpoint: string,
    { method, data, ...options }: UseApiRequestOptions<T> = {}
) => {
    return useQuery<AxiosResponse<Response<T>>>(
        [key, endpoint, method, data],
        () => makeApiRequest<T>(endpoint, method, data),
        options
    );
};
