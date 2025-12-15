<template>
  <Modal :title="getTitle">
    <!-- <Form class="mx-4" /> -->
    <NForm ref="formRef" :model="form" :rules="rules" label-width="100">
      <NFormItem label="编码" path="code">
        <NInput v-model:value="form.code" />
      </NFormItem>
      <NFormItem label="名称" path="name">
        <NInput v-model:value="form.name" />
      </NFormItem>
      <NFormItem label="状态" path="remark">
        <NRadioGroup
          size="medium"
          v-model:value="form.status"
          :default-value="1"
        >
          <NRadioButton :value="1">{{ $t('common.enabled') }}</NRadioButton>
          <NRadioButton :value="2">{{ $t('common.suspend') }}</NRadioButton>
          <NRadioButton :value="3">{{ $t('common.disabled') }}</NRadioButton>
        </NRadioGroup>
      </NFormItem>
    </NForm>
  </Modal>
</template>

<script lang="ts" setup>
import type { SysTenantApi } from '#/api/system/tenant';

import { computed, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { NForm, NFormItem, NInput, NRadioButton, NRadioGroup } from 'naive-ui';

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
  code: '',
  name: '',
  status: 1,
});

const rules: any = {
  code: [{ required: true, message: '请输入字典值', trigger: 'blur' }],
  name: [{ required: true, message: '请输入字典标签', trigger: 'blur' }],
};

// 提供给外部调用的校验方法
const validate = () => {
  return formRef.value?.validate();
};

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SysTenantApi.SysTenant>();
      if (data) {
        formData.value = data;
        form.value = formData.value;
      }
      modalApi.setData({ validate, getForm: () => form.value });
    }
  },
});
</script>
