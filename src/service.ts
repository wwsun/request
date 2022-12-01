import type { AxiosRequestConfig } from 'axios';
import request from './request';

export interface CreateServiceConfig extends AxiosRequestConfig {
  /**
   * 响应格式化
   */
  formatter?: (res: unknown) => any;
  /**
   * 参数格式化
   */
  normalizer?: (payload: unknown) => any;
}

export function createService(config: CreateServiceConfig) {
  const { normalizer, formatter, method = 'get', url, ...otherConfig } = config;
  return async (payload: unknown, requestConfig: AxiosRequestConfig) => {
    if (typeof normalizer === 'function') {
      payload = normalizer(payload);
    }

    try {
      let res = await request({
        url,
        method,
        data: payload,
        params: method === 'get' ? payload : undefined,
        ...otherConfig,
        ...requestConfig,
      });

      if (typeof formatter === 'function') {
        res = formatter(res);
      }

      return res;
    } catch (err) {
      throw err;
    }
  };
}

export type CreateServicesConfig = Record<string, CreateServiceConfig>;
export type CreateServicesReturnType = Record<
  string,
  ReturnType<typeof createService>
>;

export function createServices(
  configs: CreateServicesConfig,
  baseConfig: CreateServiceConfig
): CreateServicesReturnType {
  return Object.keys(configs).reduce((services, name) => {
    services[name] = createService({
      ...baseConfig,
      ...configs[name],
    });
    return services;
  }, {});
}
