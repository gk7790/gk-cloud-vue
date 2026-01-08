import type { Recordable } from '@vben/types';

import { requestClient } from '#/api/request';

export namespace SysDveApi {
  export interface SysTable {
    id: string;
    datasourceId: string;
    tableComment: string;
    tableName: string;
    className: string;
    baseclassId: string;
    moduleName: string;
    subModuleName: string;
    packageName: string;
    version: string;
    author: string;
    email: string;
    backendPath: string;
    frontendPath: string;
  }

  export interface Datasource {
    id: string;
    dbType: string;
    connName: string;
    connUrl: string;
    username: string;
  }

  export interface DevTemp {
    id: string;
    status: any;
    name: string;
  }

  export interface DevField {
    id: string;
    columnType: string;
    attrType: string;
    packageName: string;
    createDate: string;
    list: boolean;
    query: boolean;
    queryType: string;
    formType: string;
    form: string;
    required: string;
    dictName: string;
  }
}

/**
 * 获取字典列表数据
 * sys/dict/type/page
 */
export async function getTablePage(params: Recordable<any>) {
  return requestClient.get<Array<SysDveApi.SysTable>>('/devtools/table/page', {
    params,
  });
}

export async function getDatasourceList() {
  return requestClient.get<Array<SysDveApi.Datasource>>(
    '/devtools/datasource/list',
  );
}

export async function getDataTableList() {
  return requestClient.get<Array<SysDveApi.Datasource>>(
    `/devtools/datasource/table/list/0`,
  );
}

export async function genDataTable(body: SysDveApi.SysTable) {
  return requestClient.post<Array<SysDveApi.Datasource>>(
    `/devtools/datasource/table`,
    body,
  );
}

export async function generator(body: SysDveApi.SysTable) {
  return requestClient.post<any>(`/devtools/generator`, body);
}

export async function getTableFields(tabelId: string) {
  return requestClient.get<any>(`/devtools/table/${tabelId}`);
}

/**
 * 更新部门
 * sys/dict/type/page
 */
export async function putTable(body: any | SysDveApi.SysTable) {
  return requestClient.put<any>(`/devtools/table`, body);
}

/**
 * 更新部门
 * sys/dict/type/page
 */
export async function putTableField(
  tabelId: string,
  body: any | SysDveApi.SysTable,
) {
  return requestClient.put<any>(`/devtools/table/field/${tabelId}`, body);
}

/**
 * 删除
 * @param params
 */
export async function deleteTable(params: Recordable<any>) {
  return requestClient.delete<any>('/devtools/table', { params });
}

export async function getTempPage(params: any) {
  return requestClient.get<Array<SysDveApi.DevTemp>>(
    '/devtools/template/page',
    {
      params,
    },
  );
}

export async function postTemp(body: any) {
  return requestClient.post<any>('/devtools/template', body);
}

export async function putTemp(body: any) {
  return requestClient.put<any>(`/devtools/template`, body);
}

export async function getFieldPage(params: any) {
  return requestClient.get<Array<SysDveApi.DevTemp>>(
    '/devtools/field-type/page',
    {
      params,
    },
  );
}

export async function postField(body: any) {
  return requestClient.post<any>('/devtools/field-type', body);
}

export async function putField(body: any) {
  return requestClient.put<any>('/devtools/field-type', body);
}

export async function deleteField(params: any) {
  return requestClient.delete<any>('/devtools/field-type', {
    params,
  });
}

export async function getBaseClass(params: any) {
  return requestClient.get<Array<SysDveApi.DevTemp>>(
    '/devtools/baseclass/page',
    {
      params,
    },
  );
}

export async function getBaseClassDict() {
  return requestClient.get<Array<SysDveApi.DevTemp>>(
    '/devtools/baseclass/list',
  );
}

export async function postBaseClass(body: any) {
  return requestClient.post<any>('/devtools/baseclass', body);
}

export async function putBaseClass(body: any) {
  return requestClient.put<any>('/devtools/baseclass', body);
}

export async function deleteBaseClass(params: any) {
  return requestClient.delete<any>('/devtools/baseclass', {
    params,
  });
}
