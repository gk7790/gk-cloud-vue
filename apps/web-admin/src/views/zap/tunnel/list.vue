<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <Grid :table-title="$t('zap.tunnel.title')">
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
      <!-- ✅ 工具栏插槽 -->
      <template #toolbar-tools>
        <NButton type="primary" size="small" @click="onAdd()">
          {{ $t('common.create') }}
        </NButton>
      </template>
    </Grid>
  </Page>
</template>

<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { Label } from '#/api/core/core';
import type { ZapProxiesApi } from '#/api/zap/tunnel';

import { onMounted, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';

import { NButton, NPopconfirm, NSpace, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getClientDict } from '#/api/zap/client';
import { deleteProxies, getProxiesList } from '#/api/zap/tunnel';
import { $t } from '#/locales';

import { useColumns } from './data';
import Form from './modules/form.vue';

const message = useMessage();

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

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
        component: 'Input',
        componentProps: {
          placeholder: $t('zap.client.code'),
          clearable: true,
        },
        fieldName: 'code',
      },
      {
        component: 'Input',
        componentProps: {
          placeholder: $t('zap.client.name'),
          clearable: true,
        },
        fieldName: 'name',
      },
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
    columns: useColumns(clientDict),
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async (
          { page }: { page: { currentPage: number; pageSize: number } },
          formValues: Record<string, any>,
        ) => {
          return await getProxiesList({
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
  } as unknown as VxeTableGridOptions<ZapProxiesApi.ZapProxies>,
});

function onAdd() {
  formModalApi.setData({}).open();
}

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
  deleteProxies({ id: row.id })
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
