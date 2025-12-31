<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <Grid :table-title="$t('zap.client.list')">
      <template #action="{ row }">
        <NSpace justify="center">
          <NButton text type="info" @click="onEdit(row)">
            {{ $t('common.edit') }}
          </NButton>
          <NPopconfirm @positive-click="deleteHandle(row)">
            <template #trigger>
              <NButton text type="error">
                {{ $t('common.delete') }}
              </NButton>
            </template>
            {{ $t('ui.actionMessage.deleteConfirm', [row.dictName]) }}
          </NPopconfirm>
        </NSpace>
      </template>
    </Grid>
  </Page>
</template>

<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SysRoleApi } from '#/api/system/role';

import { Page, useVbenModal } from '@vben/common-ui';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteClient, getClientList } from '#/api/zap/client';
import { $t } from '#/locales';

import { useColumns } from './data';
import Form from './modules/form.vue';

const message = useMessage();

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [Grid, gridApi] = useVbenVxeGrid({
  gridOptions: {
    columns: useColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async (page: any) => {
          return await getClientList({
            page: page.currentPage,
            pageSize: page.pageSize,
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
  } as unknown as VxeTableGridOptions<SysRoleApi.SysRole>,
});

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}

function onEdit(row: any) {
  formModalApi.setData(row).open();
}

function deleteHandle(row: any) {
  deleteClient({ id: row.id })
    .then(() => {
      message.success($t('ui.actionMessage.deleteSuccess', [row.dictName]));
      gridApi.query();
    })
    .catch((error) => {
      message.error(error);
      message.error(`$t('ui.actionMessage.operationFailed')`);
    });
}
</script>
