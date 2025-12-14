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
            {{ $t('ui.actionMessage.deleteConfirm', [row.paramCode]) }}
          </NPopconfirm>
        </NSpace>
      </template>
      <!-- ✅ 工具栏插槽 -->
      <template #toolbarButtons>
        <NButton type="primary" size="small" @click="handleAdd()">
          {{ $t('common.create') }}
        </NButton>
      </template>
    </Grid>
    <FormModal @success="refreshGrid" />
  </Page>
</template>

<script lang="ts" setup>
import type { SysParamsApi } from './modules/api';

import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import Form from '#/views/system/params/modules/from.vue';

import {
  deleteParams,
  getParamsList,
  postParams,
  putParams,
} from './modules/api';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
  onConfirm: async () => {
    const data = formModalApi.getData();
    try {
      await data.validate();
      const form = data.getForm();
      if (form?.id) {
        putParams(form).then(() => {
          gridApi.query();
          formModalApi.close();
        });
      } else {
        postParams(form).then(() => {
          gridApi.query();
          formModalApi.close();
        });
      }
    } catch {
      return false;
    }
  },
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
  deleteParams({ ids: row.id })
    .then(() => {
      message.success($t('ui.actionMessage.deleteSuccess', [row.dictName]));
      gridApi.query();
    })
    .catch((error) => {
      message.error(error);
      message.error(`$t('ui.actionMessage.operationFailed')`);
    });
}

function handleAdd() {
  formModalApi.setData({}).open();
}

const formOptions: VbenFormProps = {
  wrapperClass: 'grid-cols-2',
  showCollapseButton: false,
  compact: true,
  actionLayout: 'inline',
  actionPosition: 'right',
  commonConfig: {
    hideLabel: true,
    labelWidth: 1,
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: $t('core.name'),
        size: 'small',
        clearable: true,
      },
      fieldName: 'paramCode',
    },
  ],
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
const gridOptions: VxeGridProps<SysParamsApi.SysParams> = {
  height: 'auto',
  rowConfig: {
    isHover: true,
  },
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    {
      field: 'paramCode',
      title: $t('core.code'),
      minWidth: 120,
    },
    {
      field: 'paramValue',
      title: $t('core.value'),
      minWidth: 150,
    },
    {
      field: 'remark',
      title: $t('core.remark'),
      minWidth: 200,
    },
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
        return await getParamsList({
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
