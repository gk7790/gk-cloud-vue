import type { Recordable } from '@vben/types';

import type { Label } from '#/api/core/core';

import { requestClient } from '#/api/request';

export namespace ZapClientApi {
  export interface ZapClient {
    id: string;
    code: string;
    name: string;
    planType?: number;
    status: number;
  }
}

/**
 * 获取角色列表数据
 */
export async function getClientList(params: Recordable<any>) {
  return requestClient.get<Array<ZapClientApi.ZapClient>>('/zap/client/page', {
    params,
  });
}

/**
 * 获取角色列表数据
 */
export function getClientDict() {
  return requestClient.get<Array<Label>>('/zap/client/dict');
}

/**
 * 获取角色列表数据
 */
export async function genSecret(params: Recordable<any>) {
  return requestClient.get('/zap/client/genSecret', {
    params,
  });
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function postClient(body: any | ZapClientApi.ZapClient) {
  return requestClient.post<any>('/zap/client', body);
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function putClient(body: any | ZapClientApi.ZapClient) {
  return requestClient.put<any>('/zap/client', body);
}

/**
 * 删除
 * @param params
 */
export async function deleteClient(params: Recordable<any>) {
  return requestClient.delete<any>('/zap/client', {
    params,
  });
}
