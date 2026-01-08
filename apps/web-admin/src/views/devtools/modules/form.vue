<template>
  <Modal class="min-w-[80vw]">
    <Grid>
      <template #checkList="{ row }">
        <NCheckbox v-model:checked="row.list" />
      </template>
      <template #checkQuery="{ row }">
        <NCheckbox v-model:checked="row.query" />
      </template>
      <template #selectQuery="{ row }">
        <NSelect v-model:value="row.queryType" :options="queryList" />
      </template>
      <template #checkForm="{ row }">
        <NCheckbox v-model:checked="row.form" />
      </template>
      <template #checkRequired="{ row }">
        <NCheckbox v-model:checked="row.required" />
      </template>
      <template #selectFormType="{ row }">
        <NSelect v-model:value="row.formType" :options="formTypeList" />
      </template>
      <template #selectDict="{ row }">
        <NSelect
          filterable
          v-model:value="row.dictName"
          value-field="label"
          :options="dictList"
        />
      </template>
    </Grid>
  </Modal>
</template>

<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { SysDveApi } from '#/api/system/devtools';

import { onMounted, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { NCheckbox, NSelect, useMessage } from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getTableFields, putTableField } from '#/api/system/devtools';
import { getDictList } from '#/api/system/dict';

const message = useMessage();

const tableId = ref('');
const dictList = ref([]);

const queryList = reactive([
  { label: '=', value: '=' },
  { label: '!=', value: '!=' },
  { label: '>', value: '>' },
  { label: '>=', value: '>=' },
  { label: '<', value: '<' },
  { label: '<=', value: '<=' },
  { label: 'like', value: 'like' },
  { label: 'left like', value: 'left like' },
  { label: 'right like', value: 'right like' },
]);

const formTypeList = ref([
  { label: '单行文本', value: 'text' },
  { label: '多行文本', value: 'textarea' },
  { label: '富文本编辑器', value: 'editor' },
  { label: '下拉框', value: 'select' },
  { label: '单选按钮', value: 'radio' },
  { label: '复选框', value: 'checkbox' },
  { label: '日期', value: 'date' },
  { label: '日期时间', value: 'datetime' },
]);

onMounted(() => {
  getDictList('dict').then((resp) => {
    dictList.value = resp;
  });
});

const gridOptions: VxeGridProps<SysDveApi.DevField> = {
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { field: 'columnName', title: '字段名' },
    { editRender: { name: 'input' }, field: 'attrName', title: '属性名' },
    { field: 'columnType', title: '字段类型' },
    { editRender: { name: 'input' }, field: 'attrType', title: '属性类型' },
    {
      editRender: { name: 'input' },
      field: 'columnComment',
      title: '字段说明',
    },
    {
      slots: { default: 'checkList' },
      field: 'list',
      title: '列表',
      width: 80,
    },
    {
      slots: { default: 'checkQuery' },
      field: 'query',
      title: '查询',
      width: 80,
    },
    {
      slots: { default: 'selectQuery' },
      field: 'queryType',
      title: '查询方式',
      width: 150,
    },
    {
      slots: { default: 'checkForm' },
      field: 'form',
      title: '表单',
      width: 80,
    },
    {
      slots: { default: 'checkRequired' },
      field: 'required',
      title: '必填',
      width: 80,
    },
    {
      slots: { default: 'selectFormType' },
      field: 'formType',
      title: '表单类型',
      width: 150,
    },
    {
      slots: { default: 'selectDict' },
      field: 'dictName',
      title: '字典名称',
      width: 180,
    },
  ],
  border: 'full',
  editConfig: {
    mode: 'row',
    trigger: 'click',
  },
  pagerConfig: {
    enabled: false,
  },
  proxyConfig: {
    response: {
      list: 'data',
      message: 'msg',
    },
    ajax: {
      query: async () => {
        const list = await getTableFields(tableId.value);
        return { data: list };
      },
    },
  },
  showOverflow: true,
};

const [Grid, fromApi] = useVbenVxeGrid({ gridOptions });

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const data = fromApi.grid.getTableData().fullData;
    modalApi.lock();
    try {
      putTableField(tableId.value, data).then(() => {
        message.success($t('ui.actionMessage.operationSuccess'));
        modalApi.close();
      });
    } finally {
      modalApi.lock(false);
    }
  },
  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SysDveApi.SysTable>();
      if (data.id) {
        tableId.value = data.id;
        // gridApi.query();
      }
    }
  },
});
</script>
