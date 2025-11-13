<template>
  <Page auto-content-height>
    <Grid>
      <template #action="{ row }">
        <NSpace justify="center">
          <NButton text type="info" @click="onConfig(row)">配置</NButton>
          <NButton text type="info" @click="onEdit(row)">编辑</NButton>
          <NPopconfirm @positive-click="handlePositiveClick(row)">
            <template #trigger>
              <NButton text type="error"> 删除 </NButton>
            </template>
            {{ $t('ui.actionMessage.deleteConfirm', [row.dictName]) }}
            是否要删除
          </NPopconfirm>
        </NSpace>
      </template>
    </Grid>
  </Page>
  <!-- 引入 Drawer 组件 -->
  <ConfigDrawer
    v-model:visible="cdVisible"
    :data="currentRow"
    @success="onRefresh"
  />
  <FormModal @success="refreshGrid" />
  <!-- 引入 Drawer 组件 -->
  <EditDrawer
    v-model:visible="drawerVisible"
    :data="currentRow"
    @success="onRefresh"
  />
</template>

<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { h, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { deleteDictType, getDictTypeList } from './api';
import ConfigDrawer from './modules/config.vue';
import EditDrawer from './modules/EditDrawer.vue';
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
  formModalApi.setData(row).open();
}

// Drawer 组件
function onRefresh() {
  gridApi.query();
}

const drawerVisible = ref(false);
const cdVisible = ref(false);

const currentRow = ref<null | RowType>(null);

function onConfig(row: any) {
  currentRow.value = { ...row }; // 拷贝数据
  cdVisible.value = true; // 打开 Drawer
}
/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}

const message = useMessage();

function handlePositiveClick(row: any) {
  deleteDictType({ ids: row.id })
    .then((result) => {
      message.success(result);
      message.success(`$t('ui.actionMessage.deleteSuccess')`);
    })
    .catch((error) => {
      message.error(error);
      message.error(`$t('ui.actionMessage.operationFailed')`);
    });
}

// const formData = reactive({
//   dictName: '',
//   dictType: '',
// });

interface RowType {
  id: string;
  dictName: string;
  dictType: string;
  sort: number;
  remark: string;
  createdAt: string;
  category: string;
  productName: string;
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
        placeholder: '字典名称',
        size: 'small',
        clearable: true,
      },
      fieldName: 'dictName',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '字典类型',
        size: 'small',
        clearable: true,
      },
      fieldName: 'dictType',
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
const gridOptions: VxeGridProps<RowType> = {
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
      title: '序号',
      type: 'seq',
      width: 60,
      align: 'center',
    },
    {
      field: 'dictName',
      title: '字典名称',
      minWidth: 120,
    },
    {
      field: 'dictType',
      title: '字典类型',
      minWidth: 150,
      slots: {
        default: ({ row }: any) => {
          return h(
            NButton,
            {
              text: true,
              type: 'info',
              onClick: () => {
                onConfig(row);
              },
            },
            () => row.dictType,
          );
        },
      },
    },
    {
      field: 'sort',
      title: '排序',
      width: 80,
      align: 'center',
    },
    {
      field: 'remark',
      title: '备注',
      minWidth: 200,
    },
    {
      field: 'createdAt',
      formatter: 'formatDateTime',
      title: '创建时间',
      width: 180,
      align: 'center',
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
        message.success(`Query params: ${JSON.stringify(formValues)}`);

        return await getDictTypeList({
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
    export: false,
    refresh: true,
    zoom: true,
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
</script>
