<template>
  <Modal title="导入数据表" class="min-w-[40vw]">
    <NForm
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="110"
      label-placement="left"
    >
      <NGrid x-gap="12" :cols="2">
        <NGi>
          <NFormItem label="表名" path="tableName">
            <NInput v-model:value="form.tableName" readonly />
          </NFormItem>
        </NGi>
        <NGi>
          <NFormItem label="功能名" path="tableComment">
            <NInput v-model:value="form.tableComment" />
          </NFormItem>
        </NGi>
      </NGrid>
      <NGrid x-gap="12" :cols="2">
        <NGi>
          <NFormItem label="类名" path="className">
            <NInput v-model:value="form.className" />
          </NFormItem>
        </NGi>
        <NGi>
          <NFormItem label="基类" path="baseclassId">
            <NSelect
              v-model:value="form.baseclassId"
              filterable
              value-field="id"
              label-field="code"
              :options="clazzDict"
            />
          </NFormItem>
        </NGi>
      </NGrid>
      <NGrid x-gap="12" :cols="2">
        <NGi>
          <NFormItem label="模块名" path="moduleName">
            <NInput v-model:value="form.moduleName" />
          </NFormItem>
        </NGi>
        <NGi>
          <NFormItem label="子模块名" path="subModuleName">
            <NInput v-model:value="form.subModuleName" />
          </NFormItem>
        </NGi>
      </NGrid>
      <NGrid x-gap="12" :cols="2">
        <NGi>
          <NFormItem label="项目包名" path="packageName">
            <NInput v-model:value="form.packageName" />
          </NFormItem>
        </NGi>
        <NGi>
          <NFormItem label="版本号" path="version">
            <NInput v-model:value="form.version" />
          </NFormItem>
        </NGi>
      </NGrid>
      <NGrid x-gap="12" :cols="2">
        <NGi>
          <NFormItem label="默认作者" path="author">
            <NInput v-model:value="form.author" />
          </NFormItem>
        </NGi>
        <NGi>
          <NFormItem label="作者邮箱" path="email">
            <NInput v-model:value="form.email" />
          </NFormItem>
        </NGi>
      </NGrid>
      <NFormItem label="后端生成路径" path="backendPath">
        <NInput v-model:value="form.backendPath" />
      </NFormItem>
      <NFormItem label="前端生成路径" path="frontendPath">
        <NInput v-model:value="form.frontendPath" />
      </NFormItem>
    </NForm>
    <template #append-footer>
      <NButton type="warning" @click="genCode"> 生成代码 </NButton>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type { SysDveApi } from '#/api/system/devtools';

import { onMounted, reactive, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import {
  NButton,
  NForm,
  NFormItem,
  NGi,
  NGrid,
  NInput,
  NSelect,
} from 'naive-ui';

import { generator, getBaseClassDict, putTable } from '#/api/system/devtools';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const formRef = ref();

// 使用 computed 实现双向绑定
let form: SysDveApi.SysTable = reactive({
  id: '',
  tableName: '',
  tableComment: '',
  datasourceId: '0',
  className: '',
  baseclassId: '',
  moduleName: '',
  subModuleName: '',
  packageName: '',
  version: '',
  author: '',
  email: '',
  backendPath: '',
  frontendPath: '',
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

const clazzDict = ref();

onMounted(() => {
  getBaseClassDict().then((resp) => {
    clazzDict.value = resp;
  });
});

async function genCode() {
  await formRef.value.validate();
  modalApi.lock();
  try {
    generator(form).then(() => {
      emit('success');
      modalApi.close();
    });
  } finally {
    modalApi.lock(false);
  }
}

const [Modal, modalApi] = useVbenModal({
  confirmText: $t('core.save'),
  async onConfirm() {
    await formRef.value.validate();
    modalApi.lock();
    try {
      putTable(form).then(() => {
        emit('success');
        modalApi.close();
      });
    } finally {
      modalApi.lock(false);
    }
  },
  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = modalApi.getData<SysDveApi.SysTable>();
      if (data) {
        form = data;
        modalApi.setData(form);
      }
    }
  },
});
</script>
