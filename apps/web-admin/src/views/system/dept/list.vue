<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <Grid table-title="部门列表">
      <template #toolbar-tools>
        <NButton type="primary" @click="onCreate">
          <Plus class="size-5" />
          {{ $t('ui.actionTitle.create', [$t('system.dept.name')]) }}
        </NButton>
      </template>
      <template #action="{ row }">
        <NSpace justify="center">
          <NButton text type="info" @click="onAppend(row)">
            {{ $t('ui.actionTitle.create', '') }}
          </NButton>
          <NButton text type="info" @click="onEdit(row)">
            {{ $t('common.edit') }}
          </NButton>
          <NPopconfirm @positive-click="onDelete(row)">
            <template #trigger>
              <NButton text type="error"> {{ $t('common.delete') }} </NButton>
            </template>
            {{ $t('ui.actionMessage.deleteConfirm', [row.paramCode]) }}
          </NPopconfirm>
        </NSpace>
      </template>
    </Grid>
  </Page>
</template>
<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SysDeptApi } from '#/api/system/dept';

import { Page, useVbenModal } from '@vben/common-ui';
import { Plus } from '@vben/icons';
import { $t } from '@vben/locales';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteDept, getDeptList } from '#/api/system/dept';
import Form from '#/views/system/dept/modules/form.vue';

import { useColumns } from './data';

const message = useMessage();

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}

function onRefresh() {
  gridApi.query();
}

function onEdit(row: SysDeptApi.SysDept) {
  formModalApi.setData(row).open();
}

function onCreate() {
  formModalApi.setData({}).open();
}

function onAppend(row: SysDeptApi.SysDept) {
  formModalApi.setData({ pid: row.id }).open();
}

function onDelete(row: SysDeptApi.SysDept) {
  deleteDept({ id: row.id })
    .then(() => {
      message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
      onRefresh();
    })
    .catch((error) => {
      message.error(error);
    });
}

const [Grid, gridApi] = useVbenVxeGrid({
  gridEvents: {},
  gridOptions: {
    columns: useColumns(),
    height: 'auto',
    keepSource: true,
    pagerConfig: {
      enabled: false,
    },
    proxyConfig: {
      response: {
        list: 'data',
        message: 'msg',
      },
      ajax: {
        query: async () => {
          const list = await getDeptList({});
          return { data: list };
        },
      },
    },
    toolbarConfig: {
      custom: true,
      export: false,
      refresh: true,
      zoom: true,
    },
    treeConfig: {
      parentField: 'pid',
      rowField: 'id',
      transform: false,
    },
  } as VxeTableGridOptions,
});
</script>
