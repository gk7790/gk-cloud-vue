import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace zapserverApi {
  export interface zapserver {
    id: number;
    code: string;
    name: string;
    ip: string;
    port: string;
    deviceId: string;
    rootPaths: string;
    createdBy: number;
    createdAt: string;
    updatedBy: number;
    updatedAt: string;
  }
}

/**
 * 获取角色列表数据
 */
export async function getPage(params: Recordable<any>) {
  return requestClient.get<Array<zapserverApi.zapserver>>('/zap/server/page', {
    params,
  });
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function postRow(body: any | zapserverApi.zapserver) {
  return requestClient.post<any>('/zap/server', body);
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function putRow(body: any | zapserverApi.zapserver) {
  return requestClient.put<any>('/zap/server', body);
}

/**
 * 删除
 * @param params
 */
export async function deleteRow(params: Recordable<any>) {
  return requestClient.delete<any>('/zap/server', {
    params,
  });
}
