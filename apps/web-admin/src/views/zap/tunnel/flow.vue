<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <Grid :table-title="$t('zap.tunnel.title')" />
  </Page>
</template>

<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { Label } from '#/api/core/core';
import type { ZapProxiesApi } from '#/api/zap/tunnel';

import { onMounted, ref } from 'vue';

import { Page } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getClientDict } from '#/api/zap/client';
import { getFlowList } from '#/api/zap/flow';
import { $t } from '#/locales';

import { useFlowColumns } from './data';

const clientDict = ref<Label[]>([]);

onMounted(() => {
  getClientDict().then((resp) => {
    clientDict.value = resp;
  });
});

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
        component: 'Select',
        componentProps: () => ({
          placeholder: $t('ui.formRules.selectRequired', [
            $t('zap.client.title'),
          ]),
          isButton: true,
          buttonStyle: 'solid',
          options: clientDict.value.map((v) => ({
            value: v.id,
            label: v.label,
          })),
          optionType: 'button',
          class: `[&_.n-radio-button]:py-1`,
          clearable: true,
        }),
        fieldName: 'clientId',
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
    columns: useFlowColumns(clientDict),
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async (
          { page }: { page: { currentPage: number; pageSize: number } },
          formValues: Record<string, any>,
        ) => {
          return await getFlowList({
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
    },
  } as unknown as VxeTableGridOptions<ZapProxiesApi.ZapProxies>,
});

/**
 * 刷新表格
 */
function refreshGrid() {
  gridApi.query();
}
</script>
