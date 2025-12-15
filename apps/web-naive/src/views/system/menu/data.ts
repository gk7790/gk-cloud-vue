import type { SysMenuApi } from './api';

import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

export function getMenuTypeOptions() {
  return [
    {
      type: 'info',
      label: $t('system.menu.typeCatalog'),
      value: '1',
    },
    { type: 'default', label: $t('system.menu.typeMenu'), value: '2' },
    { type: 'error', label: $t('system.menu.typeButton'), value: '5' },
    {
      type: 'success',
      label: $t('system.menu.typeEmbedded'),
      value: '3',
    },
    { type: 'warning', label: $t('system.menu.typeLink'), value: '4' },
  ];
}

export function useColumns(): VxeTableGridOptions<SysMenuApi.SysMenu>['columns'] {
  return [
    {
      align: 'left',
      field: 'meta.title',
      fixed: 'left',
      slots: { default: 'title' },
      title: $t('system.menu.menuTitle'),
      treeNode: true,
      width: 250,
    },
    {
      align: 'center',
      cellRender: { name: 'CellTag', options: getMenuTypeOptions() },
      field: 'type',
      title: $t('system.menu.type'),
      width: 100,
    },
    {
      field: 'authCode',
      title: $t('system.menu.authCode'),
      width: 200,
    },
    {
      align: 'left',
      field: 'path',
      title: $t('system.menu.path'),
      width: 200,
    },
    {
      align: 'left',
      field: 'component',
      formatter: ({ row }) => {
        switch (row.type) {
          case 'catalog':
          case 'menu': {
            return row.component ?? '';
          }
          case 'embedded': {
            return row.meta?.iframeSrc ?? '';
          }
          case 'link': {
            return row.meta?.link ?? '';
          }
        }
        return '';
      },
      minWidth: 200,
      title: $t('system.menu.component'),
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.menu.status'),
      width: 100,
    },
    {
      align: 'right',
      fixed: 'right',
      slots: { default: 'action' },
      headerAlign: 'center',
      showOverflow: false,
      title: $t('system.menu.operation'),
      width: 200,
    },
  ];
}
