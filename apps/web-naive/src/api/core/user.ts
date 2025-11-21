import type { Recordable, UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SysUserApi {
  export interface User {
    id: string;
    tenantId: string;
    deptId: string;
    username: string;
    nickname: string;
    password: string;
    realName: string;
    avatar: string;
    gender: number;
    email: string;
    mobile: string;
    status: number;
    type: number;
    remark: string;
  }
}

/**
 * 获取用户信息
 */
export async function getUserInfo(id: string) {
  return requestClient.get<SysUserApi.User>(`/sys/user/${id}`);
}

/**
 * 获取用户信息
 */
export async function getUserInfoApi() {
  return requestClient.get<UserInfo>('/sys/user/info');
}

/**
 * 获取用户信息
 */
export async function getUserList(params: any) {
  return requestClient.get<Array<any>>('/sys/user/page', { params });
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function postUser(body: any | SysUserApi.User) {
  return requestClient.post<any>('/sys/user', body);
}

/**
 * 更新部门
 * sys/dict/type/page
 */
export async function putUser(body: any | SysUserApi.User) {
  return requestClient.put<any>('/sys/user', body);
}

/**
 * 更新部门
 * sys/dict/type/page
 */
export async function putResetPassword(id: string, body: any) {
  return requestClient.put<any>(`/sys/user/reset-password/${id}`, body);
}

/**
 * 删除
 * @param params
 */
export async function deleteUser(params: Recordable<any>) {
  return requestClient.delete<any>('/sys/user', {
    params,
  });
}
