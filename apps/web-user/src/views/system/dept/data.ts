import type { VxeTableGridOptions } from '@vben/plugins/vxe-table';

import type { VbenFormSchema } from '#/adapter/form';
import type { SysDeptApi } from '#/api/system/dept';

import { z } from '#/adapter/form';
import { getDeptList } from '#/api/system/dept';
import { $t } from '#/locales';

/**
 * 获取编辑表单的字段配置。如果没有使用多语言，可以直接export一个数组常量
 */
export function useSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'name',
      label: $t('system.dept.deptName'),
      rules: z
        .string()
        .min(2, $t('ui.formRules.minLength', [$t('system.dept.deptName'), 2]))
        .max(
          20,
          $t('ui.formRules.maxLength', [$t('system.dept.deptName'), 20]),
        ),
    },
    {
      component: 'ApiTreeSelect',
      componentProps: {
        allowClear: true,
        api: getDeptList,
        class: 'w-full',
        labelField: 'name',
        valueField: 'id',
        childrenField: 'children',
      },
      fieldName: 'pid',
      label: $t('system.dept.parentDept'),
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
      label: $t('system.dept.status'),
    },
    {
      component: 'Textarea',
      componentProps: {
        maxLength: 50,
        rows: 3,
        showCount: true,
      },
      fieldName: 'remark',
      label: $t('system.dept.remark'),
      rules: z
        .string()
        .max(50, $t('ui.formRules.maxLength', [$t('system.dept.remark'), 50]))
        .optional(),
    },
  ];
}

/**
 * 获取表格列配置
 * @description 使用函数的形式返回列数据而不是直接export一个Array常量，是为了响应语言切换时重新翻译表头
 * @param onActionClick 表格操作按钮点击事件
 */
export function useColumns(): VxeTableGridOptions<SysDeptApi.SysDept>['columns'] {
  return [
    {
      align: 'left',
      field: 'name',
      fixed: 'left',
      title: $t('system.dept.deptName'),
      treeNode: true,
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.dept.status'),
    },
    {
      field: 'parentName',
      title: $t('system.dept.parentName'),
    },
    {
      field: 'remark',
      title: $t('system.dept.remark'),
    },
    {
      field: 'createdAt',
      title: $t('system.dept.createTime'),
    },
    {
      align: 'right',
      slots: { default: 'action' },
      field: 'operation',
      fixed: 'right',
      headerAlign: 'center',
      showOverflow: false,
      title: $t('system.dept.operation'),
      width: 200,
    },
  ];
}
