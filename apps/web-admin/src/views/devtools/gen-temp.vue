<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <Grid>
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
            {{ $t('ui.actionMessage.deleteConfirm', [row.name]) }}
          </NPopconfirm>
        </NSpace>
      </template>
      <template #status="{ row }">
        <NSwitch
          v-model:value="row.status"
          size="small"
          :checked-value="1"
          :unchecked-value="0"
          disabled
        />
      </template>

      <!-- ✅ 工具栏插槽 -->
      <template #toolbarButtons>
        <NSpace justify="center">
          <NButton type="primary" size="small" @click="onForm()">
            {{ $t('common.create') }}
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

import { NButton, NPopconfirm, NSpace, NSwitch, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteTable, getTempPage } from '#/api/system/devtools';
import { $t } from '#/locales';

import { useTempColumns } from './data';
import FormTemp from './modules/form-temp.vue';

const message = useMessage();

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: FormTemp,
  destroyOnClose: true,
});

function onForm() {
  formModalApi.setData({}).open();
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
    columns: useTempColumns(),
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async (
          { page }: { page: { currentPage: number; pageSize: number } },
          formValues: Record<string, any>,
        ) => {
          return await getTempPage({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    pagerConfig: {
      pageSize: 20,
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
  } as unknown as VxeTableGridOptions<SysDveApi.DevTemp>,
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
  deleteTable({ id: row.id })
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
