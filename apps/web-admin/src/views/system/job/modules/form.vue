<template>
  <Modal :title="getTitle">
    <NForm ref="formRef" :model="form" :rules="rules" label-width="100">
      <NFormItem label="beanName" path="beanName">
        <NInput v-model:value="form.beanName" />
      </NFormItem>
      <NFormItem label="参数" path="params">
        <MonacoEditor v-model="form.params" language="json" height="350px" />
      </NFormItem>
      <NFormItem label="cron表达式" path="cronExpression">
        <NInput v-model:value="form.cronExpression" />
      </NFormItem>
      <NFormItem :label="$t('core.remark')" path="remark">
        <NInput v-model:value="form.remark" />
      </NFormItem>
    </NForm>
  </Modal>
</template>

<script lang="ts" setup>
import type { SysJobApi } from '#/api/system/job';

import { computed, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { NForm, NFormItem, NInput } from 'naive-ui';

import { postJob, putJob } from '#/api/system/job';
import MonacoEditor from '#/components/MonacoEditor.vue';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const formData = ref();
const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('system.job.title')])
    : $t('ui.actionTitle.create', [$t('system.job.title')]);
});

const formRef = ref();

// 使用 computed 实现双向绑定
let form = reactive({
  beanName: '',
  params: '',
  cronExpression: '',
  remark: '',
});

const rules: any = {
  beanName: [
    {
      required: true,
      message: $t('ui.formRules.required', [$t('core.value')]),
      trigger: 'blur',
    },
  ],
  params: [
    {
      required: true,
      message: $t('ui.formRules.required', [$t('system.job.parms')]),
      trigger: 'blur',
    },
  ],
  cronExpression: [
    {
      required: true,
      message: $t('ui.formRules.required', ['cron']),
      trigger: 'blur',
    },
  ],
};

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    await formRef.value.validate();
    modalApi.lock();
    try {
      if (formData.value?.id) {
        putJob({ id: formData.value?.id, ...form }).then(() => {
          emit('success');
          modalApi.close();
        });
      } else {
        postJob(form).then(() => {
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
      const data = modalApi.getData<SysJobApi.SysJob>();
      if (data) {
        formData.value = data;
        form = formData.value;
        modalApi.setData(form);
      }
    }
  },
});
</script>
