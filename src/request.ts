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
  // request.interceptors.response.use(
  //   (response) => {
  //     let data = response.data;
  //     return response;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  return request;
}

export default createInstance();
