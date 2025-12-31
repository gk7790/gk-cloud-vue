<template>
  <Modal class="h-[70vh] w-[80vw]">
    <Page class="h-full flex-1 overflow-auto p-0">
      <Grid>
        <template #view="{ row }">
          <NButton
            quaternary
            type="info"
            style="background-color: transparent; border: none"
            @click="showResult(row)"
          >
            View
          </NButton>
        </template>
      </Grid>
    </Page>
    <NDrawer v-model:show="active" :width="502">
      <NDrawerContent :title="logHeader || 'Log'" :native-scrollbar="false">
        {{ logContent }}
      </NDrawerContent>
    </NDrawer>
  </Modal>
</template>

<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SysJobApi } from '#/api/system/job';

import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NButton, NDrawer, NDrawerContent } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getJobLogInfo, getJobLogPage } from '#/api/system/job';

const active = ref(false);
const logHeader = ref('');
const logContent = ref('');

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
const gridOptions: VxeGridProps<SysJobApi.SysJobLog> = {
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
      field: 'jobId',
      title: '任务Id',
    },
    {
      field: 'beanName',
      title: 'bean名称',
    },
    {
      field: 'params',
      title: '参数',
    },
    {
      cellRender: { name: 'CellTag' },
      field: 'status',
      title: $t('system.menu.status'),
    },
    {
      slots: { default: 'view' },
      field: 'result',
      title: $t('system.job.result'),
    },
    {
      field: 'times',
      title: $t('core.duration'),
    },
    {
      field: 'createdAt',
      title: $t('core.time'),
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
        return await getJobLogPage({
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

function showResult(row: any) {
  logHeader.value = `${row.beanName}(${row.createdAt})`;
  active.value = true;
  logContent.value = 'Loading ....';
  getJobLogInfo(row.id).then((resp) => {
    logContent.value = resp.result;
  });
}

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });

const [Modal] = useVbenModal({});
</script>
