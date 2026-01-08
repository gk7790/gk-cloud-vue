<template>
  <Modal
    :title="$t('ui.actionTitle.edit', [$t('zap.client.title')])"
    class="w-full max-w-[800px]"
  >
    <Form class="mx-4" :layout="isHorizontal ? 'horizontal' : 'vertical'" />
  </Modal>
</template>

<script lang="ts" setup>
import type { zapserverApi } from '#/api/zap/zapserver';

import { computed, ref } from 'vue';

import { useVbenForm, useVbenModal } from '@vben/common-ui';

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import { postRow, putRow } from '#/api/zap/zapserver';
import { $t } from '#/locales';

import { useFromSchema } from '../data';

const emit = defineEmits(['success']);

const formData = ref<zapserverApi.zapserver>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isHorizontal = computed(() => breakpoints.greaterOrEqual('md').value);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-1',
    labelWidth: 80,
  },
  layout: 'inline',
  showDefaultActions: false,
  schema: useFromSchema(),
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const data: any = await formApi.getValues();
      try {
        await (formData.value?.id
          ? putRow({ id: formData.value.id, ...data })
          : postRow(data));
        modalApi.close();
        emit('success');
      } finally {
        modalApi.lock(false);
      }
    }
  },
  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<zapserverApi.zapserver>();
      formData.value = data;
      formApi.setValues(formData.value);
    }
  },
});
</script>
