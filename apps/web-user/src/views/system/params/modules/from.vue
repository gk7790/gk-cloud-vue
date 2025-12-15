<template>
  <Modal :title="getTitle">
    <!-- <Form class="mx-4" /> -->
    <NForm ref="formRef" :model="form" :rules="rules" label-width="100">
      <NFormItem :label="$t('core.value')" path="paramCode">
        <NInput v-model:value="form.paramCode" />
      </NFormItem>
      <NFormItem :label="$t('core.label')" path="paramValue">
        <MonacoEditor
          v-model="form.paramValue"
          language="json"
          height="350px"
        />
      </NFormItem>
      <NFormItem :label="$t('core.remark')" path="remark">
        <NInput v-model:value="form.remark" />
      </NFormItem>
    </NForm>
  </Modal>
</template>

<script lang="ts" setup>
import type { SysParamsApi } from './api';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { NForm, NFormItem, NInput } from 'naive-ui';

import MonacoEditor from '#/components/MonacoEditor.vue';
import { $t } from '#/locales';

const formData = ref();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('system.dict.title')])
    : $t('ui.actionTitle.create', [$t('system.dict.title')]);
});

const formRef = ref();

// 使用 computed 实现双向绑定
const form = ref({
  paramCode: '',
  paramValue: '',
  remark: '',
});

const rules: any = {
  paramCode: [
    {
      required: true,
      message: $t('ui.formRules.required', [$t('core.value')]),
      trigger: 'blur',
    },
  ],
  paramValue: [
    {
      required: true,
      message: $t('ui.formRules.required', [$t('core.label')]),
      trigger: 'blur',
    },
  ],
};

// 提供给外部调用的校验方法
const validate = () => {
  return formRef.value?.validate();
};

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SysParamsApi.SysParams>();
      if (data) {
        formData.value = data;
        form.value = formData.value;
      }
      modalApi.setData({ validate, getForm: () => form.value });
    }
  },
});
</script>
