import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
async function getUserList(params: any) {
  return requestClient.get<Array<any>>('/sys/user/page', { params });
}

export { getUserList };
