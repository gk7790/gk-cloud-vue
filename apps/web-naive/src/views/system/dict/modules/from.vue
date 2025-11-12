<template>
  <Modal :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>

<script lang="ts" setup>
import type { SysDictApi } from '../api';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { $t } from '#/locales';

const formData = ref();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('system.dept.name')])
    : $t('ui.actionTitle.create', [$t('system.dept.name')]);
});

const [Form, formApi] = useVbenForm({
  layout: 'vertical',
  schema: [
    {
      component: 'Input',
      fieldName: 'dictName',
      label: '字典名称',
    },
    {
      component: 'Input',
      fieldName: 'dictType',
      label: '字典类型',
    },
    {
      component: 'InputNumber',
      fieldName: 'sort',
      label: '排序',
    },
    {
      component: 'Input',
      fieldName: 'remark',
      label: '备注',
    },
  ],
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SysDictApi.SysDictType>();
      if (data) {
        if (data.pid === 0) {
          data.pid = undefined;
        }
        formData.value = data;
        formApi.setValues(formData.value);
      }
    }
  },
});
</script>
