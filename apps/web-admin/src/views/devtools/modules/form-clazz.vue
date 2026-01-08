<template>
  <Modal title="基础类">
    <NForm ref="formRef" :model="form" :rules="rules" label-placement="left">
      <NFormItem label="基类编码" path="code">
        <NInput v-model:value="form.code" />
      </NFormItem>
      <NFormItem label="基类包名" path="packageName">
        <NInput v-model:value="form.packageName" />
      </NFormItem>
      <NFormItem label="基类字段" path="fields">
        <NInput v-model:value="form.fields" />
      </NFormItem>
      <NFormItem label=" 备 注 " path="remark">
        <NInput v-model:value="form.remark" />
      </NFormItem>
    </NForm>
  </Modal>
</template>

<script lang="ts" setup>
import type { SysDveApi } from '#/api/system/devtools';

import { reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { NForm, NFormItem, NInput } from 'naive-ui';

import { postBaseClass, putBaseClass } from '#/api/system/devtools';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const formRef = ref();

// 使用 computed 实现双向绑定
let form = reactive({
  code: '',
  packageName: '',
  fields: '',
  remark: '',
});

const rules: any = {
  code: [
    {
      required: true,
      message: $t('ui.formRules.required', [$t('core.value')]),
      trigger: 'blur',
    },
  ],
  packageName: [
    {
      required: true,
      message: $t('ui.formRules.required', [$t('system.job.parms')]),
      trigger: 'blur',
    },
  ],
  fields: [
    {
      required: true,
      message: $t('ui.formRules.required', ['cron']),
      trigger: 'blur',
    },
  ],
};

const formData = ref();

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    await formRef.value.validate();
    modalApi.lock();
    try {
      if (formData.value?.id) {
        putBaseClass({ id: formData.value?.id, ...form }).then(() => {
          emit('success');
          modalApi.close();
        });
      } else {
        postBaseClass(form).then(() => {
          emit('success');
          modalApi.close();
        });
      }
    } finally {
      modalApi.lock(false);
    }
  },
  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SysDveApi.DevTemp>();
      if (data) {
        formData.value = data;
        form = formData.value;
        modalApi.setData(form);
      }
    }
  },
});
</script>
