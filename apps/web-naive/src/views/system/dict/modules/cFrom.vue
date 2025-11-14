<template>
  <NForm ref="formRef" :model="form" :rules="rules" label-width="100">
    <NFormItem label="字典值" path="dictValue">
      <NInput v-model:value="form.dictValue" />
    </NFormItem>
    <NFormItem label="字典标签" path="dictLabel">
      <NInput v-model:value="form.dictLabel" />
    </NFormItem>
    <NFormItem label="回显样式" path="attrType">
      <NSelect v-model:value="form.attrType" :options="attrTypeOptions" />
    </NFormItem>
    <NFormItem label="排序" path="sort">
      <NInputNumber v-model:value="form.sort" :default-value="0" />
    </NFormItem>
    <NFormItem label="备注" path="remark">
      <NInput v-model:value="form.remark" />
    </NFormItem>
  </NForm>
</template>

<script setup lang="ts">
import type { FormRules } from 'naive-ui';

import type { SysDictApi } from '../api';

import { computed, ref } from 'vue';

import { NForm, NFormItem, NInput, NInputNumber, NSelect } from 'naive-ui';

const props = defineProps<{
  modelValue: Partial<SysDictApi.SysDictData>;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: SysDictApi.SysDictData];
}>();

const attrTypeOptions = [
  {
    label: 'Primary',
    value: 'primary',
  },
  {
    label: 'Info',
    value: 'info',
  },
  {
    label: 'Success',
    value: 'success',
  },
  {
    label: 'Warning',
    value: 'warning',
  },
  {
    label: 'Error',
    value: 'error',
  },
];

const formRef = ref();

// 使用 computed 实现双向绑定
const form = computed({
  get: () => props.modelValue,
  set: (value: any) => emit('update:modelValue', value),
});

const rules: FormRules = {
  dictValue: { required: true, message: '请输入字典值', trigger: 'blur' },
  dictLabel: { required: true, message: '请输入字典标签', trigger: 'blur' },
  sort: {
    required: true,
    type: 'number',
    message: '请输入排序',
    trigger: 'blur',
  },
};

// 暴露校验方法
const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((errors: any) => {
      if (errors) {
        reject(errors);
      } else {
        resolve(true);
      }
    });
  });
};

defineExpose({
  formRef,
  form,
  validate, // 暴露校验方法
});
</script>
