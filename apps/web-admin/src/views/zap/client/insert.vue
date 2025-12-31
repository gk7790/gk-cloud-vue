<template>
  <Page auto-content-height>
    <FormModal @success="refreshGrid" />
    <NCard :title="$t('zap.client.title')">
      <BaseForm />
    </NCard>
  </Page>
</template>

<script lang="ts" setup>
import { Page } from '@vben/common-ui';

import { NCard, useMessage } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import { postClient } from '#/api/zap/client';
import { $t } from '#/locales';

const message = useMessage();

const [BaseForm, formApi] = useVbenForm({
  // 所有表单项共用，可单独在表单内覆盖
  commonConfig: {
    // 所有表单项
    componentProps: {
      class: 'w-full',
    },
  },
  // 提交函数
  handleSubmit: onSubmit,
  layout: 'horizontal',
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户名',
      },
      fieldName: 'name',
      label: '名称',
    },
    {
      component: 'RadioGroup',
      componentProps: {
        options: [
          {
            label: 'HTTPS',
            value: 'https',
          },
          {
            label: 'HTTP',
            value: 'http',
          },
          {
            label: 'TCP',
            value: 'tcp',
          },
        ],
      },
      fieldName: 'protocol',
      label: '协议',
    },
    // {
    //   component: 'Input',
    //   componentProps: {
    //     placeholder: '秘钥',
    //   },
    //   fieldName: 'secret',
    //   label: '秘钥',
    //   suffix: () =>
    //     h(
    //       NButton,
    //       {
    //         text: true,
    //         size: 'tiny',
    //         onClick: () => {
    //           formApi.setFieldValue('secret', crypto.randomUUID());
    //         },
    //       },
    //       {
    //         default: () =>
    //           h(IconifyIcon, { icon: 'material-symbols:autorenew' }),
    //       },
    //     ),
    // },
  ],
  wrapperClass: 'grid-cols-1',
});

function onSubmit(values: Record<string, any>) {
  postClient(values)
    .then(() => {
      message.success($t('ui.actionMessage.operationSuccess'));
      formApi.resetForm();
    })
    .catch((error) => {
      message.error(error);
      message.error(`$t('ui.actionMessage.operationFailed')`);
    });
}
</script>
