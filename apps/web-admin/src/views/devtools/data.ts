import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'tableName',
      title: '表名',
    },
    {
      field: 'tableComment',
      title: '表描述',
    },
    {
      field: 'className',
      title: '类名',
    },
    {
      field: 'createdAt',
      title: $t('core.createdAt'),
    },
    {
      align: 'center',
      slots: { default: 'action' },
      field: 'operation',
      fixed: 'right',
      title: $t('core.operation'),
      width: 250,
    },
  ];
}

export function useTempColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'name',
      title: '模版名',
      width: 300,
    },
    {
      field: 'fileName',
      title: '文件名',
      width: 300,
    },
    {
      field: 'path',
      title: '生成路径',
    },
    {
      field: 'status',
      title: $t('system.menu.status'),
      width: 80,
      slots: {
        default: 'status',
      },
    },
    {
      field: 'createdAt',
      title: $t('core.createdAt'),
      width: 180,
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

export function useClazzColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'name',
      title: '模版名',
      width: 300,
    },
    {
      field: 'fileName',
      title: '文件名',
      width: 300,
    },
    {
      field: 'path',
      title: '生成路径',
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.menu.status'),
      width: 80,
    },
    {
      field: 'createdAt',
      title: $t('core.createdAt'),
      width: 180,
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
