<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <ResetPassword />
    <Grid>
      <template #action="{ row }">
        <NSpace justify="center">
          <NDropdown
            trigger="click"
            :options="options"
            :show-arrow="true"
            @select="(option) => handleOptions(option, row)"
          >
            <NButton text type="info">{{ $t('core.operation') }}</NButton>
          </NDropdown>

          <!-- <NButton text type="info" @click="onEdit(row)">编辑</NButton> -->
          <NPopconfirm @positive-click="onDelete(row)">
            <template #trigger>
              <NButton text type="error"> 删除 </NButton>
            </template>
            {{ $t('ui.actionMessage.deleteConfirm', [row.nickname]) }}
          </NPopconfirm>
        </NSpace>
      </template>
      <!-- ✅ 工具栏插槽 -->
      <template #toolbarButtons>
        <NButton type="primary" size="small" @click="onAdd()">
          {{ $t('common.create') }}
        </NButton>
      </template>
    </Grid>
  </Page>
</template>

<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SysUserApi } from '#/api/core/user';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NButton, NDropdown, NPopconfirm, NSpace } from 'naive-ui';

import { message } from '#/adapter/naive';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteUser, getUserList } from '#/api/core/user';

import Form from './modules/from.vue';
import ResetPasswordForm from './modules/reset-password.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [ResetPassword, resetPasswordApi] = useVbenModal({
  connectedComponent: ResetPasswordForm,
  destroyOnClose: true,
});

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}

function onAdd() {
  formModalApi.setData({}).open();
}

function handleOptions(key: any, row: any) {
  if (key === 'edit') {
    formModalApi.setData(row).open();
  } else if (key === 'resetPassword') {
    resetPasswordApi.setData(row).open();
  }
}

function onDelete(row: any) {
  deleteUser({ ids: row.id }).then(() => {
    message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
    gridApi.query();
  });
}

const options = [
  {
    label: $t('common.edit'),
    key: 'edit',
  },
  {
    label: $t('system.user.resetPassword'),
    key: 'resetPassword',
  },
];

const formOptions: VbenFormProps = {
  // 默认展开
  showCollapseButton: false,
  compact: true,
  wrapperClass: 'grid-cols-5',
  commonConfig: {
    hideLabel: true,
    labelWidth: 1,
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.username'),
        clearable: true,
      },
      fieldName: 'username',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('system.user.nickname'),
        clearable: true,
      },
      fieldName: 'nickname',
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
    },
  ],
  fieldMappingTime: [
    [
      'createTime',
      ['startTime', 'endTime'],
      (val) => (val ? new Date(val).getTime() / 1000 : undefined),
    ],
  ],
  submitButtonOptions: {
    content: '查询',
    size: 'small',
  } as any,
  resetButtonOptions: {
    show: false,
  },
  // 是否在字段值改变时提交表单
  submitOnChange: false,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeGridProps<SysUserApi.User> = {
  height: 'auto',
  rowConfig: {
    isHover: true,
  },
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'username', title: $t('core.name') },
    { field: 'tenantName', title: '租户' },
    { field: 'deptName', title: '部门' },
    { field: 'email', title: '邮箱' },
    { field: 'mobile', title: '手机' },
    { field: 'createdAt', formatter: 'formatDateTime', title: 'Date' },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: $t('core.operation'),
      width: 150,
    },
  ],
  keepSource: true,
  pagerConfig: {
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getUserList({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  toolbarConfig: {
    // @ts-ignore
    search: true,
    custom: true,
    zoom: true,
    slots: {
      // 自定义工具栏左侧插槽
      buttons: 'toolbarButtons',
    },
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
</script>
