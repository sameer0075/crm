import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { toast } from 'react-toastify';

class API {
  private instance: AxiosInstance;

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this.instance.interceptors.request.use(
      this.requestInterceptor,
      this.requestErrorInterceptor
    );

    this.instance.interceptors.response.use(
      this.responseInterceptor,
      this.responseErrorInterceptor
    );
  }

  private requestInterceptor(config: any) {
    const token = sessionStorage.getItem('token');
    console.log('token data', token);
    if (token !== undefined && config.headers) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  }

  private requestErrorInterceptor(error: AxiosError) {
    return Promise.reject(error);
  }

  private responseInterceptor(response: AxiosResponse): AxiosResponse {
    // Extract token from the response headers
    const token =
      response.headers['authorization'] || response.headers['Authorization'];
    // If token exists, store it in sessionStorage
    if (token) {
      sessionStorage.setItem('token', token);
    }

    return response;
  }

  private responseErrorInterceptor(error: AxiosError) {
    if (error.response) {
      console.log('error', error);
    } else if (error.request) {
      toast.error('No response received from the server');
    } else {
      toast.error('Error occurred while making the request');
    }
    return Promise.reject(error);
  }

  public get(url: string, config?: AxiosRequestConfig) {
    return this.instance.get(url, config).then(this.handleApiResponse);
  }

  public post(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.post(url, data, config).then(this.handleApiResponse);
  }

  public put(url: string, data?: any, config?: AxiosRequestConfig) {
    return this.instance.put(url, data, config).then(this.handleApiResponse);
  }

  public delete(url: string, config?: AxiosRequestConfig) {
    return this.instance.delete(url, config).then(this.handleApiResponse);
  }

  private handleApiResponse(response: AxiosResponse) {
    return response.data;
  }
}

const api = new API(process.env.NEXT_PUBLIC_BACKEND_URL as string);
export default api;
