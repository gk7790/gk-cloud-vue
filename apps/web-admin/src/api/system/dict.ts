import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SysDictApi {
  export interface SysDictType {
    id: string;
    dictType: string;
    dictName: string;
    remark?: string;
    sort: number;
  }

  export interface SysDictData {
    id: string;
    dictTypeId: string;
    dictValue: string;
    dictLabel: string;
    attrType: string;
    remark?: string;
    status: number;
    sort: number;
  }
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function getDictList(dictType: string) {
  return requestClient.get(`/sys/dict/type/${dictType}`);
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function getDictTypeList(params: Recordable<any>) {
  return requestClient.get<Array<SysDictApi.SysDictType>>(
    '/sys/dict/type/page',
    { params },
  );
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function postDictType(body: any | SysDictApi.SysDictData) {
  return requestClient.post<any>('/sys/dict/type', body);
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function putDictType(body: SysDictApi.SysDictData) {
  return requestClient.put<any>('/sys/dict/type', body);
}

/**
 * 删除
 * @param params
 */
export async function deleteDictType(params: Recordable<any>) {
  return requestClient.delete<any>('sys/dict/type', {
    params,
  });
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function getDictDataList(params: Recordable<any>) {
  return requestClient.get<Array<SysDictApi.SysDictType>>(
    'sys/dict/data/page',
    { params },
  );
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function postDictData(body: any | SysDictApi.SysDictData) {
  return requestClient.post<any>('/sys/dict/data', body);
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function putDictData(body: SysDictApi.SysDictData) {
  return requestClient.put<any>('/sys/dict/data', body);
}

/**
 * 删除
 * @param params
 * @returns
 */
export async function deleteDictData(params: Recordable<any>) {
  return requestClient.delete<any>('sys/dict/data', {
    params,
  });
}
