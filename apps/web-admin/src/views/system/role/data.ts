import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.role.roleName'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'auth',
      label: $t('system.role.auth'),
      rules: 'required',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        isButton: true,
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.suspend'), value: 2 },
          { label: $t('common.disabled'), value: 3 },
        ],
        optionType: 'button',
        class: `[&_.n-radio-button]:py-1`,
      },
      defaultValue: 1,
      fieldName: 'status',
      label: $t('system.role.status'),
    },
    {
      component: 'Textarea',
      fieldName: 'remark',
      label: $t('system.role.remark'),
    },
    {
      component: 'Input',
      fieldName: 'menuIdList',
      formItemClass: 'items-start',
      label: $t('system.role.permitMenu'),
      modelPropName: 'modelValue',
    },
    {
      component: 'Input',
      fieldName: 'deptIdList',
      formItemClass: 'items-start',
      label: $t('system.role.permitDept'),
      modelPropName: 'modelValue',
    },
  ];
}

/** 分配菜单的表单 */
export function useAssignMenuFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'id',
      component: 'Input',
      dependencies: {
        triggerFields: [''],
        show: () => false,
      },
    },
    {
      fieldName: 'name',
      label: '角色名称',
      component: 'Input',
      componentProps: {
        disabled: true,
      },
    },
    {
      fieldName: 'menuIdList',
      label: '菜单权限',
      component: 'Input',
      formItemClass: 'items-start',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'auth',
      componentProps: {
        placeholder: $t('system.role.auth'),
        size: 'small',
        clearable: true,
      },
      label: $t('system.role.auth'),
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.role.roleName'),
      componentProps: {
        placeholder: $t('system.role.roleName'),
        size: 'small',
        clearable: true,
      },
    },
    {
      component: 'Select',
      componentProps: {
        isButton: true,
        buttonStyle: 'solid',
        options: [
          { label: $t('common.enabled'), value: 1 },
          { label: $t('common.suspend'), value: 2 },
          { label: $t('common.disabled'), value: 3 },
        ],
        optionType: 'button',
        class: `[&_.n-radio-button]:py-1`,
        clearable: true,
      },
      fieldName: 'status',
      label: $t('system.role.status'),
    },
    {
      component: 'Input',
      fieldName: 'remark',
      componentProps: {
        placeholder: $t('system.role.remark'),
        size: 'small',
        clearable: true,
      },
      label: $t('system.role.remark'),
    },
    {
      component: 'DatePicker',
      componentProps: {
        type: 'datetimerange',
        format: 'yyyy-MM-dd HH:mm',
        clearable: true,
        defaultTime: ['00:00:00', '23:59:59'],
      },
      fieldName: 'createTime',
      label: $t('system.role.createTime'),
    },
  ];
}

export function useColumns(): VxeTableGridOptions['columns'] {
  return [
    {
      field: 'auth',
      title: $t('system.role.auth'),
      width: 200,
    },
    {
      field: 'name',
      title: $t('system.role.roleName'),
      width: 200,
    },
    {
      field: 'id',
      title: $t('system.role.id'),
      width: 250,
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.role.status'),
      width: 100,
    },
    {
      field: 'remark',
      minWidth: 100,
      title: $t('system.role.remark'),
    },
    {
      field: 'createdAt',
      title: $t('system.role.createTime'),
      width: 200,
    },
    {
      align: 'center',
      slots: { default: 'action' },
      field: 'operation',
      fixed: 'right',
      title: $t('system.role.operation'),
      width: 130,
    },
  ];
}
