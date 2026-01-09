<template>
  <Page auto-content-height>
    <Grid>
      <template #action="{ row }">
        <NSpace justify="center">
          <NButton text type="info" @click="onEdit(row)">编辑</NButton>
          <NPopconfirm @positive-click="deleteHandle(row)">
            <template #trigger>
              <NButton text type="error"> 删除 </NButton>
            </template>
            {{ $t('ui.actionMessage.deleteConfirm', [row.name]) }}
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
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SysTenantApi } from '#/api/system/tenant';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteTenant,
  getTenantList,
  postTenant,
  putTenant,
} from '#/api/system/tenant';
import Form from '#/views/system/tenant/modules/from.vue';

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
  onConfirm: async () => {
    const data = formModalApi.getData();
    try {
      await data.validate();
      const form = data.getForm();
      if (form?.id) {
        putTenant(form).then(() => {
          gridApi.query();
          formModalApi.close();
        });
      } else {
        postTenant(form).then(() => {
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
  deleteTenant({ id: row.id }).then(() => {
    message.success($t('ui.actionMessage.deleteSuccess', [row.dictName]));
    gridApi.query();
  });
}

function handleAdd() {
  formModalApi.setData({}).open();
}

const formOptions: VbenFormProps = {
  wrapperClass: 'grid-cols-3',
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
        placeholder: '编码',
        size: 'small',
        clearable: true,
      },
      fieldName: 'code',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '名称',
        size: 'small',
        clearable: true,
      },
      fieldName: 'name',
    },
  ],
  submitButtonOptions: {
    content: '查询',
    size: 'small',
  } as any,
  resetButtonOptions: {
    show: false,
  },
  submitOnChange: false,
  submitOnEnter: false,
};

// 关键配置：确保启用了行右键事件
const gridOptions: VxeGridProps<SysTenantApi.SysTenant> = {
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
      field: 'code',
      title: '编码',
      minWidth: 120,
    },
    {
      field: 'name',
      title: '租户',
      minWidth: 150,
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.menu.status'),
      width: 100,
    },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
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
        return await getTenantList({
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
