<template>
  <Page auto-content-height>
    <FormDrawer @success="onRefresh" />
    <Grid :table-title="$t('system.role.list')">
      <template #action="{ row }">
        <NSpace justify="center">
          <NButton text type="info" @click="onEdit(row)">编辑</NButton>
          <NPopconfirm @positive-click="onDelete(row)">
            <template #trigger>
              <NButton text type="error"> 删除 </NButton>
            </template>
            {{ $t('ui.actionMessage.deleteConfirm', [row.name]) }}
          </NPopconfirm>
        </NSpace>
      </template>
      <template #toolbar-tools>
        <NButton type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('system.role.name')]) }}
        </NButton>
      </template>
    </Grid>
  </Page>
</template>
<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SysRoleApi } from '#/api/system/role';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { Plus } from '@vben/icons';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteRole, getRoleList } from '#/api/system/role';
import { $t } from '#/locales';

import { useColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

const message = useMessage();

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    fieldMappingTime: [
      [
        'createTime',
        ['startTime', 'endTime'],
        (val) => (val ? new Date(val).getTime() / 1000 : undefined),
      ],
    ],
    schema: useGridFormSchema(),
    submitOnChange: false,
  },
  gridOptions: {
    columns: useColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getRoleList({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: {
      keyField: 'id',
    },

    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      search: true,
      zoom: true,
    },
  } as VxeTableGridOptions<SysRoleApi.SysRole>,
});

function onEdit(row: SysRoleApi.SysRole) {
  formDrawerApi.setData(row).open();
}

function onDelete(row: SysRoleApi.SysRole) {
  deleteRole(row.id)
    .then(() => {
      message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
      onRefresh();
    })
    .catch(() => {
      message.error($t('ui.actionMessage.operationFailed'));
    });
}

function onRefresh() {
  gridApi.query();
}

function onCreate() {
  formDrawerApi.setData({}).open();
}
</script>
