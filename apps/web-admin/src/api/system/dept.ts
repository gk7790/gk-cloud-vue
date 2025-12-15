import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SysDeptApi {
  export interface SysDept {
    id: string;
    pid?: number;
    name: string;
    code: string;
    sort: number;
    parentName: string;
    children: any;
  }
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function getDeptList(params: Recordable<any>) {
  return requestClient.get<Array<SysDeptApi.SysDept>>('/sys/dept/list', {
    params,
  });
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function postDept(body: any | SysDeptApi.SysDept) {
  return requestClient.post<any>('/sys/dept', body);
}

/**
 * 更新部门
 * sys/dict/type/page
 */
export async function putDept(
  id: string,
  body: Omit<SysDeptApi.SysDept, 'children' | 'id'>,
) {
  return requestClient.put<any>(`/sys/dept/${id}`, body);
}

/**
 * 删除
 * @param params
 */
export async function deleteDept(params: Recordable<any>) {
  return requestClient.delete<any>('/sys/dept', {
    params,
  });
}
