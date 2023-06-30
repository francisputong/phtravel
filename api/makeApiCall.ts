import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
// import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { GOOGLE_PLACE_API_URL } from '@env';

type Response<T> = {
    errorCode?: string;
    message: string;
    successResponse: boolean;
    data: T;
};

// export interface UseApiRequestOptions<T>
//     extends UseQueryOptions<AxiosResponse<Response<T>>> {
//     method?: Method;
//     data?: T;
// }
const api = axios.create();

const ApiUrls = {
    google: GOOGLE_PLACE_API_URL,
    host: '',
};

export default async function makeApiRequest<T>(
    endpoint: string,
    method?: Method,
    data?: any | undefined,
    params?: Record<any, any>,
    type: 'google' | 'host' = 'host'
) {
    // const auth = getAuth();

    const request: AxiosRequestConfig = {
        baseURL: ApiUrls[type],
        method: method || 'GET',
        url: endpoint,
        data: data || '',
        params: params || {},
        headers: {
            // authorization: `Bearer ${auth ? auth.token : ''}`
        },
    };

    const response: AxiosResponse<T> = await api(request);
    // console.log('TEST');
    // const response: AxiosResponse<T> = await axios.get(
    //     GOOGLE_PLACE_API_URL + request.url,
    //     { params: params }
    // );

    return response;
}

// export const useReactQueryRequest = <T>(
//     key: string,
//     endpoint: string,
//     { method, data, ...options }: UseApiRequestOptions<T> = {}
// ) => {
//     return useQuery<AxiosResponse<Response<T>>>(
//         [key, endpoint, method, data],
//         () => makeApiRequest<T>(endpoint, method, data),
//         options
//     );
// };
