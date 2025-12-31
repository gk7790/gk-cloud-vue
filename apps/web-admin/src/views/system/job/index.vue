<template>
  <Page auto-content-height>
    <Grid>
      <template #action="{ row }">
        <NSpace justify="center">
          <NButton text type="info" @click="onEdit(row)">
            {{ $t('common.edit') }}
          </NButton>
          <NButton
            v-if="row.status === 1"
            text
            type="warning"
            @click="pause(row)"
          >
            {{ $t('system.job.pause') }}
          </NButton>
          <NButton
            v-if="row.status === 2"
            text
            type="success"
            @click="resume(row)"
          >
            {{ $t('system.job.resume') }}
          </NButton>
          <NPopconfirm @positive-click="execute(row)">
            <template #trigger>
              <NButton text color="#8a2be2">
                {{ $t('system.job.execute') }}
              </NButton>
            </template>
            {{
              $t('ui.actionMessage.customConfirm', [$t('system.job.execute')])
            }}
          </NPopconfirm>
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
        <NSpace size="small">
          <NButton type="primary" size="small" @click="handleAdd()">
            {{ $t('common.create') }}
          </NButton>

          <NButton type="primary" size="small" @click="showLog()">
            {{ $t('system.job.logList') }}
          </NButton>
        </NSpace>
      </template>
    </Grid>
    <FormModal @success="refreshGrid" />
    <LogModal />
  </Page>
</template>

<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SysJobApi } from '#/api/system/job';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteJob,
  getJobPage,
  pauseJob,
  resumeJob,
  runJob,
} from '#/api/system/job';

import Form from './modules/form.vue';
import LogForm from './modules/job-log.vue';

const message = useMessage();

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

const [LogModal, logModalApi] = useVbenModal({
  connectedComponent: LogForm,
  destroyOnClose: true,
  closeOnClickModal: false,
  showCancelButton: false,
  showConfirmButton: false,
});

function handleAdd() {
  formModalApi.setData({}).open();
}

function showLog() {
  logModalApi.setData({}).open();
}

/**
 * 编辑部门
 * @param row
 */
function onEdit(row: any) {
  formModalApi.setData({ ...row }).open();
}

/**
 * 编辑部门
 * @param row
 */
function pause(row: any) {
  pauseJob([row.id]).then(() => {
    message.success($t('ui.actionMessage.operationSuccess'));
    gridApi.query();
  });
}

/**
 * 编辑部门
 * @param row
 */
function resume(row: any) {
  resumeJob([row.id]).then(() => {
    message.success($t('ui.actionMessage.operationSuccess'));
    gridApi.query();
  });
}

/**
 * 编辑部门
 * @param row
 */
function execute(row: any) {
  runJob([row.id]).then(() => {
    message.success($t('ui.actionMessage.operationSuccess'));
  });
}

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}

function deleteHandle(row: any) {
  deleteJob({ ids: row.id })
    .then(() => {
      message.success($t('ui.actionMessage.deleteSuccess', [row.dictName]));
      gridApi.query();
    })
    .catch((error) => {
      message.error(error);
      message.error(`$t('ui.actionMessage.operationFailed')`);
    });
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
      fieldName: 'beanName',
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
const gridOptions: VxeGridProps<SysJobApi.SysJob> = {
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
      field: 'beanName',
      title: 'bean名称',
      minWidth: 120,
    },
    {
      field: 'params',
      title: '参数',
      minWidth: 150,
    },
    {
      field: 'cronExpression',
      title: 'cron表达式',
      minWidth: 150,
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.menu.status'),
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
      width: 250,
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
        return await getJobPage({
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
  },
};

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });
</script>
