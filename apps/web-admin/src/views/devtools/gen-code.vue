<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <ImportModal @success="refreshGrid" />
    <GenModal @success="refreshGrid" />
    <Grid>
      <template #action="{ row }">
        <NSpace justify="center">
          <NButton text type="info" @click="onEdit(row)">
            {{ $t('common.edit') }}
          </NButton>
          <NButton text type="info" @click="onGen(row)">
            {{ $t('system.dev.generate') }}
          </NButton>
          <NPopconfirm @positive-click="deleteHandle(row)">
            <template #trigger>
              <NButton text type="error">
                {{ $t('common.delete') }}
              </NButton>
            </template>
            {{ $t('ui.actionMessage.deleteConfirm', [row.tableName]) }}
          </NPopconfirm>
        </NSpace>
      </template>
      <!-- ✅ 工具栏插槽 -->
      <template #toolbarButtons>
        <NSpace justify="center">
          <NButton type="primary" size="small" @click="onImport()">
            导入数据库表
          </NButton>
        </NSpace>
      </template>
    </Grid>
  </Page>
</template>

<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { SysDveApi } from '#/api/system/devtools';

import { Page, useVbenModal } from '@vben/common-ui';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteTable, getTablePage } from '#/api/system/devtools';
import { $t } from '#/locales';

import { useColumns } from './data';
import FormImport from './modules/form-import.vue';
import Form from './modules/form.vue';
import FormGen from './modules/from-gen.vue';

const message = useMessage();

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [GenModal, genModalApi] = useVbenModal({
  connectedComponent: FormGen,
  destroyOnClose: true,
});

const [ImportModal, importModalApi] = useVbenModal({
  connectedComponent: FormImport,
  destroyOnClose: true,
});

function onEdit(row: any) {
  formModalApi.setData(row).open();
}

function onGen(row: any) {
  genModalApi.setData(row).open();
}

function onImport() {
  importModalApi.setData({}).open();
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
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
          placeholder: '表名',
          clearable: true,
        },
        fieldName: 'tableName',
      },
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
  },
  gridOptions: {
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
    proxyConfig: {
      ajax: {
        query: async (
          { page }: { page: { currentPage: number; pageSize: number } },
          formValues: Record<string, any>,
        ) => {
          return await getTablePage({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    pagerConfig: {
      pageSize: 10,
      pageSizes: [10, 20, 50, 100],
    },
    toolbarConfig: {
      search: true,
      custom: true,
      zoom: true,
      slots: {
        // 自定义工具栏左侧插槽
        buttons: 'toolbarButtons',
      },
    },
  } as unknown as VxeTableGridOptions<SysDveApi.SysTable>,
});

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}

function deleteHandle(row: any) {
  deleteTable({ ids: row.id })
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
