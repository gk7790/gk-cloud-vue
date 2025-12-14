<template>
  <Modal :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>

<script lang="ts" setup>
import type { SysDictApi } from '../api';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useMessage } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import { $t } from '#/locales';

import { postDictType, putDictType } from '../api';

const formData = ref();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('system.dict.title')])
    : $t('ui.actionTitle.create', [$t('system.dict.title')]);
});

const message = useMessage();

const [Form, formApi] = useVbenForm({
  layout: 'vertical',
  schema: [
    {
      component: 'Input',
      fieldName: 'dictName',
      label: $t('system.dict.name'),
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'dictType',
      label: $t('system.dict.type'),
      rules: 'required',
    },
    {
      component: 'InputNumber',
      fieldName: 'sort',
      label: $t('system.dict.sort'),
      defaultValue: 0,
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'remark',
      label: $t('system.dict.remark'),
    },
  ],
  showDefaultActions: true,
  resetButtonOptions: {
    show: false,
  },
  handleSubmit: onSubmit,
});

function onSubmit(values: any) {
  // 模拟新增或编辑
  if (formData.value?.id) {
    values.id = formData.value.id;
    putDictType(values).then(() => {
      message.success($t('ui.actionMessage.operationSuccess'));
      modalApi.onConfirm();
      // 关闭弹窗 & 通知父组件
      modalApi.close();
    });
  } else {
    postDictType(values).then(() => {
      message.success($t('ui.actionMessage.operationSuccess'));
      modalApi.onConfirm();
      // 关闭弹窗 & 通知父组件
      modalApi.close();
    });
  }
}

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SysDictApi.SysDictType>();
      if (data) {
        formData.value = data;
        formApi.setValues(formData.value);
      }
    }
  },
});
</script>
