import type { Ref } from 'vue';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { Label } from '#/api/core/core';

import { $t } from '#/locales';

export function useColumns(
  clientDict: Ref<Label[]>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'code',
      title: $t('zap.client.code'),
      width: 200,
    },
    {
      field: 'name',
      title: $t('zap.client.name'),
      width: 250,
    },
    {
      field: 'clientId',
      title: $t('zap.tunnel.clientName'),
      width: 250,
      formatter: ({ cellValue }) =>
        clientDict.value.find((v) => v.id === cellValue)?.label ?? cellValue,
    },
    {
      field: 'protocol',
      width: 100,
      title: $t('zap.client.protocol'),
    },
    {
      field: 'localAddr',
      cellRender: { name: 'CellTag' },
      title: '本地IP',
    },
    {
      field: 'localPort',
      cellRender: { name: 'CellTag' },
      title: '本地端口',
    },
    {
      field: 'createdAt',
      title: $t('core.createdAt'),
      width: 200,
    },
    {
      align: 'center',
      slots: { default: 'action' },
      field: 'operation',
      fixed: 'right',
      title: $t('core.operation'),
      width: 130,
    },
  ];
}

export function useFlowColumns(
  clientDict: Ref<Label[]>,
): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'clientId',
      title: $t('zap.tunnel.clientName'),
      formatter: ({ cellValue }) =>
        clientDict.value.find((v) => v.id === cellValue)?.label ?? cellValue,
    },
    {
      field: 'protocol',
      title: $t('zap.client.protocol'),
    },
    {
      field: 'reqBytes',
      title: '请求流量',
    },
    {
      field: 'respBytes',
      title: '响应流量',
    },
    {
      field: 'createdAt',
      title: $t('core.createdAt'),
    },
  ];
}
