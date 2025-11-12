import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SysDictApi {
  export interface SysDictType {
    [key: string]: any;
    id: string;
    name: string;
    permissions: string[];
    remark?: string;
    status: 0 | 1;
  }
}

export { deleteDictType, getDictDataList, getDictType, getDictTypeList };

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
async function getDictTypeList(params: Recordable<any>) {
  return requestClient.get<Array<SysDictApi.SysDictType>>(
    '/sys/dict/type/page',
    { params },
  );
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
async function getDictType(params: Recordable<any>) {
  return requestClient.get<Array<SysDictApi.SysDictType>>(
    '/sys/dict/type/page',
    { params },
  );
}

/**
 * 删除
 * @param params
 * @returns
 */
async function deleteDictType(params: Recordable<any>) {
  return requestClient.delete<any>('sys/dict/data', {
    params,
  });
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
async function getDictDataList(params: Recordable<any>) {
  return requestClient.get<Array<SysDictApi.SysDictType>>(
    'sys/dict/data/page',
    { params },
  );
}
