import axios, { AxiosRequestConfig } from 'axios';

export function createInstance(
  instanceConfig?: AxiosRequestConfig,
  origin = axios
) {
  const request = axios.create(instanceConfig);
  Object.keys(origin).forEach((name) => {
    if (!request[name]) {
      request[name] = origin[name];
    }
  });

  // add interceptors & methods
  request.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return request;
}

export default createInstance();
