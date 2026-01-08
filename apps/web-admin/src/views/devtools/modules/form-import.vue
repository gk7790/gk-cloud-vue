<template>
  <Modal title="Table">
    <Form class="mx-4" :layout="isHorizontal ? 'horizontal' : 'vertical'" />
  </Modal>
</template>

<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';
import type { SysDveApi } from '#/api/system/devtools';

import { computed, ref } from 'vue';

import { useVbenForm, useVbenModal } from '@vben/common-ui';

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import { z } from '#/adapter/form';
import { genDataTable, getDataTableList } from '#/api/system/devtools';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const formData = ref<SysDveApi.SysTable>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isHorizontal = computed(() => breakpoints.greaterOrEqual('md').value);

const finalSchema: VbenFormSchema[] = [
  {
    component: 'ApiSelect',
    componentProps: {
      placeholder: $t('ui.formRules.selectRequired', ['Table']),
      filterable: true,
      allowClear: true,
      clearable: true,
      api: getDataTableList,
      class: 'w-full',
      valueField: 'tableName',
      labelField: 'tableName',
    },
    fieldName: 'tableName',
    label: 'Table',
    rules: z.string().min(1, {
      message: $t('ui.formRules.required', ['Table']),
    }),
  },
];

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-1',
    labelWidth: 50,
  },
  schema: finalSchema,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const data: any = await formApi.getValues();
      try {
        genDataTable({ datasourceId: 0, ...data }).then(() => {
          emit('success');
          modalApi.close();
        });
      } finally {
        modalApi.lock(false);
      }
    }
  },
  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SysDveApi.SysTable>();
      formData.value = data;
      formApi.setValues(formData.value);
    }
  },
});
</script>
