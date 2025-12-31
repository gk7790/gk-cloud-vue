import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

export function useColumns(): VxeTableGridOptions['columns'] {
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
      field: 'protocol',
      width: 100,
      title: $t('zap.client.protocol'),
    },
    {
      field: 'secret',
      cellRender: { name: 'CellTag' },
      title: $t('zap.client.secret'),
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
