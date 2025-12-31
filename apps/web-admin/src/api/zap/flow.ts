import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace ZapFlowApi {
  export interface ZapFlow {
    id: string;
    clientId: string;
    code: string;
    name: string;
    type?: number;
    status: number;
    protocol: string;
  }
}

/**
 * 获取角色列表数据
 */
export async function getFlowList(params: Recordable<any>) {
  return requestClient.get<Array<ZapFlowApi.ZapFlow>>('/zap/flow/page', {
    params,
  });
}
