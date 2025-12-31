import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace ZapProxiesApi {
  export interface ZapProxies {
    id: string;
    clientId: string;
    code: string;
    name: string;
    type?: number;
    status: number;
    protocol: string;
  }
}

/**
 * 获取角色列表数据
 */
export async function getProxiesList(params: Recordable<any>) {
  return requestClient.get<Array<ZapProxiesApi.ZapProxies>>(
    '/zap/proxies/page',
    {
      params,
    },
  );
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function postProxies(body: any | ZapProxiesApi.ZapProxies) {
  return requestClient.post<any>('/zap/proxies', body);
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function putProxies(body: any | ZapProxiesApi.ZapProxies) {
  return requestClient.put<any>('/zap/proxies', body);
}

/**
 * 删除
 * @param params
 */
export async function deleteProxies(params: Recordable<any>) {
  return requestClient.delete<any>('/zap/proxies', {
    params,
  });
}
