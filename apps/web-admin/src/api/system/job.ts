import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SysJobApi {
  export interface SysJob {
    id: string;
    pid?: number;
    name: string;
    code: string;
    sort: number;
    parentName: string;
    status: number;
  }

  export interface SysJobLog {
    id: string;
    jobId?: number;
    beanName: string;
    params: string;
    sort: number;
    result: string;
    status: number;
    times: number;
    error: string;
    created_at: string;
  }
}

/**
 * 获取定时任务列表数据
 * sys/dict/type/page
 */
export async function getJobPage(params: Recordable<any>) {
  return requestClient.get<Array<SysJobApi.SysJob>>('/sys/schedule/page', {
    params,
  });
}

/**
 * 获取定时任务列表数据
 * sys/dict/type/page
 */
export async function postJob(body: any | SysJobApi.SysJob) {
  return requestClient.post<any>('/sys/schedule', body);
}

/**
 * 更新定时任务
 * sys/dict/type/page
 */
export async function putJob(body: any | SysJobApi.SysJob) {
  return requestClient.put<any>(`/sys/schedule`, body);
}

/**
 * 更新定时任务
 * sys/dict/type/page
 */
export async function pauseJob(body: any | SysJobApi.SysJob) {
  return requestClient.put<any>(`/sys/schedule/pause`, body);
}

/**
 * 更新定时任务
 * sys/dict/type/page
 */
export async function resumeJob(body: any | SysJobApi.SysJob) {
  return requestClient.put<any>(`/sys/schedule/resume`, body);
}

/**
 * 更新定时任务
 * sys/dict/type/page
 */
export async function runJob(body: any | SysJobApi.SysJob) {
  return requestClient.put<any>(`/sys/schedule/run`, body);
}

/**
 * 删除定时任务
 * @param params
 */
export async function deleteJob(params: Recordable<any>) {
  return requestClient.delete<any>('/sys/schedule', {
    params,
  });
}

/**
 * 获取定时任务列表数据
 * sys/dict/type/page
 */
export async function getJobLogPage(params: Recordable<any>) {
  return requestClient.get<Array<SysJobApi.SysJob>>('/sys/scheduleLog/page', {
    params,
  });
}

/**
 * 获取定时任务列表数据
 * sys/dict/type/page
 */
export async function getJobLogInfo(id: string) {
  return requestClient.get<SysJobApi.SysJobLog>(`/sys/scheduleLog/${id}`);
}
