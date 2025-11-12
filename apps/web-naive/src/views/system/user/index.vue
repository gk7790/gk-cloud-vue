<template>
  <Page auto-content-height>
    <Grid ref="userGridRef" />
  </Page>
</template>

<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { getUserList } from './user';

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  wrapperClass: 'grid-cols-5',
  compact: true,
  commonConfig: {
    labelWidth: 10,
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('authentication.agree'),
      },
      fieldName: 'category',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: 'Please enter productName',
      },
      fieldName: 'productName',
    },
    {
      component: 'DatePicker',
      fieldName: 'datePicker',
    },
  ],
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'username', title: '用户名' },
    { field: 'tenantName', title: '租户' },
    { field: 'deptName', title: '部门' },
    { field: 'email', title: '邮箱' },
    { field: 'mobile', title: '手机' },
    { field: 'createdAt', formatter: 'formatDateTime', title: 'Date' },
  ],
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        return await getUserList({
          page: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
  toolbarConfig: {
    // @ts-ignore 正式环境时有完整的类型声明
    search: true,
    custom: true,
    export: false,
    refresh: true,
    zoom: true,
  },
};

const [Grid, userGridRef] = useVbenVxeGrid({ formOptions, gridOptions });
</script>
