<template>
  <div class="vp-raw w-full">
    <Grid>
      <template #action="{ row }">
        <template v-if="hasEditStatus(row)">
          <NSpace justify="center">
            <NButton
              text
              target="_blank"
              type="primary"
              @click="saveRowEvent(row)"
            >
              保存
            </NButton>
            <NButton
              text
              target="_blank"
              type="primary"
              @click="cancelRowEvent(row)"
            >
              取消
            </NButton>
          </NSpace>
        </template>
        <template v-else>
          <NSpace justify="center">
            <NButton
              text
              target="_blank"
              type="primary"
              @click="editRowEvent(row)"
            >
              编辑
            </NButton>
            <NPopconfirm @positive-click="deleteHandle(row)">
              <template #trigger>
                <NButton text type="error">
                  {{ $t('common.delete') }}
                </NButton>
              </template>
              {{ $t('ui.actionMessage.deleteConfirm', [row.columnType]) }}
            </NPopconfirm>
          </NSpace>
        </template>
      </template>
      <template #toolbar-tools>
        <NButton type="primary" size="small" @click="handleAdd()">
          {{ $t('common.create') }}
        </NButton>
      </template>
    </Grid>
  </div>
</template>

<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SysDveApi } from '#/api/system/devtools';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteField,
  getFieldPage,
  postField,
  putField,
} from '#/api/system/devtools';
import { $t } from '#/locales';

const message = useMessage();

const gridOptions: VxeGridProps<SysDveApi.DevField> = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { editRender: { name: 'input' }, field: 'columnType', title: '字段类型' },
    { editRender: { name: 'input' }, field: 'attrType', title: '属性类型' },
    {
      editRender: { name: 'input' },
      field: 'packageName',
      title: '属性包名',
    },
    { field: 'createdAt', title: $t('core.createdAt') },
    { slots: { default: 'action' }, title: $t('core.operation') },
  ],
  editConfig: {
    mode: 'row',
    trigger: 'click',
  },
  pagerConfig: {
    pageSize: 20,
    pageSizes: [20, 50, 100],
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }) => {
        return await getFieldPage({
          page: page.currentPage,
          pageSize: page.pageSize,
        });
      },
    },
  },
  toolbarConfig: {
    custom: true,
    export: false,
    refresh: true,
    zoom: true,
  },
  showOverflow: true,
};

const [Grid, gridApi] = useVbenVxeGrid({ gridOptions });

function hasEditStatus(row: SysDveApi.DevField) {
  return gridApi.grid?.isEditByRow(row);
}

function handleAdd() {
  const newRow: SysDveApi.DevField = {
    id: undefined,
    columnType: '',
    attrType: '',
    packageName: '',
  } as unknown as SysDveApi.DevField;

  // 插入到表格顶部
  gridApi.grid?.insert(newRow).then(({ row }) => {
    // 立即进入编辑状态
    gridApi.grid?.setEditRow(row);
  });
}

function editRowEvent(row: SysDveApi.DevField) {
  gridApi.grid?.setEditRow(row);
}

async function saveRowEvent(row: SysDveApi.DevField) {
  await gridApi.grid?.clearEdit();
  if (row.id) {
    putField(row).then(() => {
      message.success($t('ui.actionMessage.operationSuccess'));
      gridApi.query();
    });
  } else {
    postField(row).then(() => {
      message.success($t('ui.actionMessage.operationSuccess'));
      gridApi.query();
    });
  }
}

function deleteHandle(row: SysDveApi.DevField) {
  deleteField({ id: row.id })
    .then(() => {
      message.success($t('ui.actionMessage.deleteSuccess', [row.columnType]));
      gridApi.query();
    })
    .catch(() => {
      message.error(`$t('ui.actionMessage.operationFailed')`);
    });
}

const cancelRowEvent = (_row: SysDveApi.DevField) => {
  gridApi.grid?.clearEdit();
};
</script>
