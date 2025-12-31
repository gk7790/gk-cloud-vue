<template>
  <Modal
    :title="$t('ui.actionTitle.edit', [$t('zap.tunnel.title')])"
    class="w-full max-w-[800px]"
  >
    <Form class="mx-4" :layout="isHorizontal ? 'horizontal' : 'vertical'" />
  </Modal>
</template>

<script lang="ts" setup>
import type { VbenFormSchema } from '#/adapter/form';
import type { ZapProxiesApi } from '#/api/zap/tunnel';

import { computed, ref } from 'vue';

import { useVbenForm, useVbenModal } from '@vben/common-ui';

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import { z } from '#/adapter/form';
import { getClientDict } from '#/api/zap/client';
import { postProxies, putProxies } from '#/api/zap/tunnel';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const formData = ref<ZapProxiesApi.ZapProxies>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isHorizontal = computed(() => breakpoints.greaterOrEqual('md').value);

const finalSchema: VbenFormSchema[] = [
  {
    component: 'ApiSelect',
    componentProps: {
      placeholder: $t('ui.formRules.selectRequired', [$t('zap.client.title')]),
      filterable: true,
      allowClear: true,
      clearable: true,
      api: getClientDict,
      class: 'w-full',
      valueField: 'id',
      labelField: 'label',
    },
    fieldName: 'clientId',
    label: $t('zap.client.title'),
    rules: z.string().min(1, {
      message: $t('ui.formRules.required', [$t('zap.client.title')]),
    }),
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: $t('ui.formRules.required', [$t('core.code')]),
      clearable: true,
      readonly: true,
    },
    dependencies: {
      show: (_) => !!formData.value?.id,
      triggerFields: ['id'],
    },
    fieldName: 'code',
    label: $t('core.code'),
    rules: z
      .string()
      .min(1, { message: $t('ui.formRules.required', [$t('core.code')]) }),
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: $t('ui.formRules.required', [$t('core.name')]),
      clearable: true,
    },
    fieldName: 'name',
    label: $t('core.name'),
    rules: z
      .string()
      .min(1, { message: $t('ui.formRules.required', [$t('core.name')]) }),
  },
  {
    component: 'RadioGroup',
    componentProps: {
      isButton: true,
      buttonStyle: 'solid',
      options: [
        { label: 'HTTP', value: 'http' },
        { label: 'HTTPS', value: 'https' },
        { label: 'TCP', value: 'tcp' },
      ],
      optionType: 'button',
      class: `[&_.n-radio-button]:py-1`,
    },
    defaultValue: 'http',
    fieldName: 'protocol',
    label: $t('zap.protocol'),
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: $t('ui.formRules.required', ['IP']),
      clearable: true,
    },
    fieldName: 'localAddr',
    label: $t('zap.tunnel.localAddr'),
    defaultValue: '127.0.0.1',
    rules: z.string().min(1, {
      message: $t('ui.formRules.required', [$t('zap.tunnel.localAddr')]),
    }),
  },
  {
    component: 'InputNumber',
    componentProps: {
      placeholder: $t('ui.formRules.required', [$t('zap.tunnel.localPort')]),
      clearable: true,
    },
    fieldName: 'localPort',
    label: $t('zap.tunnel.localPort'),
    defaultValue: 8080,
    rules: z.number().min(80, {
      message: $t('ui.formRules.rangeValue', [
        $t('zap.tunnel.localPort'),
        80,
        65_535,
      ]),
    }),
  },
];

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
  schema: finalSchema,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const data: any = await formApi.getValues();
      try {
        if (formData.value?.id) {
          data.id = formData.value?.id;
          putProxies(data).then(() => {
            emit('success');
            modalApi.close();
          });
        } else {
          postProxies(data).then(() => {
            emit('success');
            modalApi.close();
          });
        }
      } finally {
        modalApi.lock(false);
      }
    }
  },
  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<ZapProxiesApi.ZapProxies>();
      formData.value = data;
      formApi.setValues(formData.value);
    }
  },
});
</script>
