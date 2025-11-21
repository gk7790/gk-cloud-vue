import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SysTenantApi {
  export interface SysTenant {
    id: string;
    code: string;
    name: string;
    planType?: number;
    status: number;
  }
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function getTenantList(params: Recordable<any>) {
  return requestClient.get<Array<SysTenantApi.SysTenant>>('/sys/tenant/page', {
    params,
  });
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function getTenantDict(params: Recordable<any>) {
  return requestClient.get<Array<SysTenantApi.SysTenant>>('/sys/tenant/dict', {
    params,
  });
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function postTenant(body: any | SysTenantApi.SysTenant) {
  return requestClient.post<any>('/sys/tenant', body);
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function putTenant(body: SysTenantApi.SysTenant) {
  return requestClient.put<any>('/sys/tenant', body);
}

/**
 * 删除
 * @param params
 */
export async function deleteTenant(params: Recordable<any>) {
  return requestClient.delete<any>('/sys/tenant', {
    params,
  });
}
