<template>
  <Modal
    :title="$t('ui.actionTitle.edit', [$t('zap.client.title')])"
    class="w-full max-w-[800px]"
  >
    <Form class="mx-4" :layout="isHorizontal ? 'horizontal' : 'vertical'" />
  </Modal>
</template>

<script lang="ts" setup>
import type { ZapClientApi } from '#/api/zap/client';

import { computed, h, ref } from 'vue';

import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { NButton } from 'naive-ui';

import { z } from '#/adapter/form';
import { genSecret, putClient } from '#/api/zap/client';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const formData = ref<ZapClientApi.ZapClient>();

const breakpoints = useBreakpoints(breakpointsTailwind);
const isHorizontal = computed(() => breakpoints.greaterOrEqual('md').value);

const finalSchema = [
  {
    component: 'Input',
    componentProps: {
      placeholder: '编码',
      clearable: true,
      readonly: true,
    },
    fieldName: 'code',
    label: '编码',
    rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: $t('ui.formRules.required', ['名称']),
      clearable: true,
    },
    fieldName: 'name',
    label: '名称',
    rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
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
    defaultValue: 1,
    fieldName: 'protocol',
    label: '协议',
  },
  {
    component: 'Input',
    fieldName: 'secret',
    componentProps: {
      clearable: true,
    },
    label: '秘钥',
    rules: z.string().min(1, { message: '秘钥' }),
    suffix: () =>
      h(
        NButton,
        {
          text: true,
          size: 'tiny',
          onClick: () => {
            genSecret({ id: formData.value?.id }).then((resp) => {
              formApi.setFieldValue('secret', resp);
            });
          },
        },
        {
          default: () => h(IconifyIcon, { icon: 'material-symbols:autorenew' }),
        },
      ),
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
          putClient(data).then(() => {
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
      const data = modalApi.getData<ZapClientApi.ZapClient>();
      formData.value = data;
      formApi.setValues(formData.value);
    }
  },
});
</script>
