import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

export function useFromSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: {
        placeholder: '服务编码',
        size: 'small',
        clearable: true,
      },
      fieldName: 'code',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '名称',
        size: 'small',
        clearable: true,
      },
      fieldName: 'name',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '服务ip',
        size: 'small',
        clearable: true,
      },
      fieldName: 'ip',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '服务端口',
        size: 'small',
        clearable: true,
      },
      fieldName: 'port',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '设备id',
        size: 'small',
        clearable: true,
      },
      fieldName: 'deviceId',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '根路径(需要排除)',
        size: 'small',
        clearable: true,
      },
      fieldName: 'rootPaths',
    },
  ];
}

export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      componentProps: {
        placeholder: '服务编码',
        size: 'small',
        clearable: true,
      },
      fieldName: 'code',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '名称',
        size: 'small',
        clearable: true,
      },
      fieldName: 'name',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '服务ip',
        size: 'small',
        clearable: true,
      },
      fieldName: 'ip',
    },
  ];
}

export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'code',
      title: '服务编码',
    },
    {
      field: 'name',
      title: '名称',
    },
    {
      field: 'ip',
      title: '服务ip',
    },
    {
      field: 'port',
      title: '服务端口',
    },
    {
      field: 'deviceId',
      title: '设备id',
    },
    {
      field: 'rootPaths',
      title: '根路径(需要排除)',
    },
    {
      field: 'createdAt',
      title: '创建时间',
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
