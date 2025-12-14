<template>
  <Modal :title="getTitle" class="w-full max-w-[800px]">
    <Form class="mx-4" :layout="isHorizontal ? 'horizontal' : 'vertical'" />
  </Modal>
</template>

<script lang="ts" setup>
import type { SysUserApi } from '#/api/core/user';

import { computed, ref } from 'vue';

import { useVbenForm, useVbenModal } from '@vben/common-ui';

import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';

import { z } from '#/adapter/form';
import { getUserInfo, postUser, putUser } from '#/api/core/user';
import { getDeptList } from '#/api/system/dept';
import { getRoleDict } from '#/api/system/role';
import { getTenantDict } from '#/api/system/tenant';
import { $t } from '#/locales';

const emit = defineEmits(['success']);

const formData = ref<SysUserApi.User>();

const getTitle = computed(() => {
  return formData.value?.id
    ? $t('ui.actionTitle.edit', [$t('system.user.title')])
    : $t('ui.actionTitle.create', [$t('system.user.title')]);
});

const breakpoints = useBreakpoints(breakpointsTailwind);
const isHorizontal = computed(() => breakpoints.greaterOrEqual('md').value);

const finalSchema = [
  {
    component: 'ApiTreeSelect',
    componentProps: {
      filterable: true,
      allowClear: true,
      clearable: true,
      api: getDeptList,
      class: 'w-full',
      labelField: 'name',
      valueField: 'id',
      childrenField: 'children',
    },
    fieldName: 'deptId',
    label: $t('system.dept.parentDept'),
    rules: z
      .string({
        required_error: $t('ui.formRules.selectRequired', [
          $t('system.dept.parentDept'),
        ]),
      })
      .min(1, {
        message: $t('ui.formRules.selectRequired', [
          $t('system.dept.parentDept'),
        ]),
      }),
  },
  {
    component: 'ApiSelect',
    componentProps: {
      filterable: true,
      allowClear: true,
      clearable: true,
      api: getTenantDict,
      class: 'w-full',
      valueField: 'id',
      labelField: 'label',
    },
    fieldName: 'tenantId',
    label: $t('system.user.tenant'),
    rules: z
      .string({
        required_error: $t('ui.formRules.selectRequired', [
          $t('system.user.tenant'),
        ]),
      })
      .min(1, {
        message: $t('ui.formRules.selectRequired', [$t('system.user.tenant')]),
      }),
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: $t('authentication.usernameTip'),
      clearable: true,
    },
    fieldName: 'username',
    label: $t('authentication.username'),
    rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
  },
  {
    component: 'Input',
    componentProps: {
      placeholder: $t('ui.formRules.required', [$t('system.user.nickname')]),
      clearable: true,
    },
    fieldName: 'nickname',
    label: $t('system.user.nickname'),
    rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
  },
  {
    component: 'RadioGroup',
    componentProps: {
      isButton: true,
      buttonStyle: 'solid',
      options: [
        { label: $t('common.enabled'), value: 1 },
        { label: $t('common.suspend'), value: 2 },
        { label: $t('common.disabled'), value: 3 },
      ],
      optionType: 'button',
      class: `[&_.n-radio-button]:py-1`,
    },
    defaultValue: 1,
    fieldName: 'status',
    label: $t('system.dept.status'),
  },
  {
    component: 'Input',
    fieldName: 'realName',
    componentProps: {
      clearable: true,
    },
    label: $t('system.user.realName'),
    rules: z
      .string()
      .min(2, $t('ui.formRules.minLength', [$t('system.dept.deptName'), 2]))
      .max(20, $t('ui.formRules.maxLength', [$t('system.dept.deptName'), 20])),
  },
  {
    component: 'Input',
    // 对应组件的参数
    componentProps: {
      placeholder: $t('ui.formRules.required', [$t('authentication.mobile')]),
      clearable: true,
    },
    // 字段名
    fieldName: 'mobile',
    // 界面显示的label
    label: $t('authentication.mobile'),
    rules: z.string().min(1, { message: $t('authentication.mobileTip') }),
  },
  {
    component: 'Input',
    // 对应组件的参数
    componentProps: {
      placeholder: '请输入',
      clearable: true,
    },
    // 字段名
    fieldName: 'email',
    // 界面显示的label
    label: $t('authentication.email'),
    rules: z.string().email('请输入正确的邮箱'),
  },
  {
    component: 'ApiSelect',
    componentProps: {
      multiple: true,
      filterable: true,
      allowClear: true,
      clearable: true,
      api: getRoleDict,
      class: 'w-full',
      valueField: 'id',
      labelField: 'label',
    },
    fieldName: 'roleIdList',
    label: $t('system.user.role'),
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

const passwordSchemas = [
  {
    component: 'VbenInputPassword',
    componentProps: {
      passwordStrength: true,
      placeholder: $t('authentication.password'),
    },
    fieldName: 'password',
    label: $t('authentication.password'),
    renderComponentContent() {
      return {
        strengthText: () => $t('authentication.passwordStrength'),
      };
    },
    rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
  },
  {
    component: 'VbenInputPassword',
    componentProps: {
      placeholder: $t('authentication.confirmPassword'),
    },
    dependencies: {
      rules(values: any) {
        const { password } = values;
        return z
          .string({ required_error: $t('authentication.passwordTip') })
          .min(1, { message: $t('authentication.passwordTip') })
          .refine((value) => value === password, {
            message: $t('authentication.confirmPasswordTip'),
          });
      },
      triggerFields: ['password'],
    },
    fieldName: 'confirmPassword',
    label: $t('authentication.confirmPassword'),
  },
];

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (valid) {
      modalApi.lock();
      const data: any = await formApi.getValues();
      try {
        if (formData.value?.id) {
          data.id = formData.value?.id;
          putUser(data).then(() => {
            emit('success');
            modalApi.close();
          });
        } else {
          postUser(data).then(() => {
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
      const data = modalApi.getData<SysUserApi.User>();
      if (data?.id) {
        const resp = await getUserInfo(data.id);
        formData.value = resp;
        formApi.setValues(formData.value);
      } else {
        // 新增用户 → 追加密码字段
        formApi.setState({
          schema: [...finalSchema, ...passwordSchemas],
        });
        // 初始化 password 字段为空
        formApi.setValues({ password: '', confirmPassword: '' });
        // formApi.updateSchema([...finalSchema, ...passwordSchemas]); // 可选：插入位置
      }
    }
  },
});
</script>
