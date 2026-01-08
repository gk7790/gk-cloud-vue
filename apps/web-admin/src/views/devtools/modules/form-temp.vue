<template>
  <Modal title="导入数据表" class="min-w-[80vw]">
    <NForm
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="100"
      label-placement="left"
    >
      <NGrid x-gap="12" :cols="2">
        <NGi>
          <NFormItem label="name" path="name">
            <NInput v-model:value="form.name" />
          </NFormItem>
        </NGi>
        <NGi>
          <NFormItem label="fileName" path="fileName">
            <NInput v-model:value="form.fileName" />
          </NFormItem>
        </NGi>
      </NGrid>
      <NGrid x-gap="12" :cols="2">
        <NGi>
          <NFormItem label="path" path="path">
            <NInput v-model:value="form.path" />
          </NFormItem>
        </NGi>
        <NGi>
          <NFormItem :label="$t('core.status')" path="remark">
            <NSwitch
              v-model:value="form.status"
              :checked-value="1"
              :unchecked-value="0"
            />
          </NFormItem>
        </NGi>
      </NGrid>
      <NFormItem label="参数" path="content">
        <MonacoEditor
          v-model="form.content"
          language="python"
          :min-height="600"
        />
      </NFormItem>
    </NForm>
  </Modal>
</template>

<script lang="ts" setup>
import type { SysDveApi } from '#/api/system/devtools';

import { reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { NForm, NFormItem, NGi, NGrid, NInput, NSwitch } from 'naive-ui';

import { postTemp, putTemp } from '#/api/system/devtools';
import MonacoEditor from '#/components/MonacoEditor.vue';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const formRef = ref();

// 使用 computed 实现双向绑定
let form = reactive({
  name: '',
  params: '',
  fileName: '',
  path: '',
  content: '',
  status: 1,
});

const rules: any = {
  name: [
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

const formData = ref();

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    await formRef.value.validate();
    modalApi.lock();
    try {
      if (formData.value?.id) {
        putTemp({ id: formData.value?.id, ...form }).then(() => {
          emit('success');
          modalApi.close();
        });
      } else {
        postTemp(form).then(() => {
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
