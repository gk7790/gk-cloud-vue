import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SysRoleApi {
  export interface SysRole {
    [key: string]: any;
    id: string;
    name: string;
    permissions: string[];
    remark?: string;
    status: 0 | 1;
    menuIdList?: string[];
    deptIdList?: string[];
  }
}

/**
 * 获取角色列表数据
 */
async function getRoleList(params: Recordable<any>) {
  return requestClient.get<Array<SysRoleApi.SysRole>>('/sys/role/page', {
    params,
  });
}

/**
 * 获取角色列表数据
 */
async function getRoleDict() {
  return requestClient.get<any>(`/sys/role/dict`);
}

/**
 * 获取角色列表数据
 */
async function getRoleInfo(id: string) {
  return requestClient.get<any>(`/sys/role/${id}`);
}

/**
 * 创建角色
 * @param data 角色数据
 */
async function createRole(data: Omit<SysRoleApi.SysRole, 'id'>) {
  return requestClient.post('/sys/role', data);
}

/**
 * 更新角色
 *
 * @param id 角色 ID
 * @param data 角色数据
 */
async function updateRole(id: string, data: Omit<SysRoleApi.SysRole, 'id'>) {
  return requestClient.put(`/sys/role/${id}`, data);
}

/**
 * 删除角色
 * @param id 角色 ID
 */
async function deleteRole(id: string) {
  return requestClient.delete(`/sys/role/${id}`);
}

/**
 * 删除角色
 * @param id 角色 ID
 */
async function getRoleMenuList(id: string) {
  return requestClient.get(`/sys/role/menu?id=${id}`);
}

export {
  createRole,
  deleteRole,
  getRoleDict,
  getRoleInfo,
  getRoleList,
  getRoleMenuList,
  updateRole,
};
