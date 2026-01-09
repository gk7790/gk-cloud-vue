<template>
  <Page auto-content-height>
    <Grid>
      <template #action="{ row }">
        <NSpace justify="center">
          <NButton text type="info" @click="onEdit(row)">
            {{ $t('common.edit') }}
          </NButton>
          <NPopconfirm @positive-click="deleteHandle(row)">
            <template #trigger>
              <NButton text type="error"> {{ $t('common.delete') }} </NButton>
            </template>
            {{ $t('ui.actionMessage.deleteConfirm', [row.name]) }}
          </NPopconfirm>
        </NSpace>
      </template>
      <!-- ✅ 工具栏插槽 -->
      <template #toolbar-tools>
        <NButton type="primary" size="small" @click="handleAdd()">
          {{ $t('common.create') }}
        </NButton>
      </template>
    </Grid>
    <FormModal @success="refreshGrid" />
  </Page>
</template>

<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { zapserverApi } from '#/api/zap/zapserver';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteRow, getPage } from '#/api/zap/zapserver';

import { useColumns, useSchema } from './data';
import Form from './modules/from.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

/**
 * 编辑部门
 * @param row
 */
function onEdit(row: any) {
  formModalApi.setData({ ...row }).open();
}

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}

const message = useMessage();

function deleteHandle(row: any) {
  deleteRow({ ids: row.id }).then(() => {
    message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
    gridApi.query();
  });
}

function handleAdd() {
  formModalApi.setData({}).open();
}

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  compact: true,
  wrapperClass: 'grid-cols-4',
  actionLayout: 'inline',
  actionPosition: 'right',
  commonConfig: {
    hideLabel: true,
    labelWidth: 1,
  },
  schema: useSchema(),
  submitButtonOptions: {
    content: $t('common.query'),
    size: 'small',
  } as any,
  resetButtonOptions: {
    show: false,
  },
  submitOnChange: false,
  submitOnEnter: false,
};

// 关键配置：确保启用了行右键事件
const gridOptions: VxeGridProps<zapserverApi.zapserver> = {
  height: 'auto',
  rowConfig: {
    isHover: true,
  },
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: useColumns(),
  keepSource: true,
  pagerConfig: {
    pageSize: 20,
    pageSizes: [10, 20, 50, 100],
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getPage({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  toolbarConfig: {
    search: true,
    custom: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
</script>
