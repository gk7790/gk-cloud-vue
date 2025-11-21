import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SysParamsApi {
  export interface SysParams {
    id: string;
    paramCode: string;
    paramValue: string;
    remark?: string;
  }
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function getParamsList(params: Recordable<any>) {
  return requestClient.get<Array<SysParamsApi.SysParams>>('/sys/params/page', {
    params,
  });
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function postParams(body: any | SysParamsApi.SysParams) {
  return requestClient.post<any>('/sys/params', body);
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function putParams(body: SysParamsApi.SysParams) {
  return requestClient.put<any>('/sys/params', body);
}

/**
 * 删除
 * @param params
 */
export async function deleteParams(params: Recordable<any>) {
  return requestClient.delete<any>('/sys/params', {
    params,
  });
}
