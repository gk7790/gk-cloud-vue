<template>
  <Drawer :title="getDrawerTitle">
    <Form>
      <template #menuIdList>
        <NSpin :show="loadingMenuIdList" wrapper-class-name="w-full">
          <GkTree
            v-model="checkedMenuKeys"
            :data="menuIdList"
            key-field="id"
            label-field="meta.title"
            icon-field="meta.icon"
            :is-alias="true"
          />
        </NSpin>
      </template>
      <template #deptIdList>
        <NSpin :show="loadingDeptIdList" wrapper-class-name="w-full">
          <GkTree
            v-model="checkedDeptKeys"
            :data="deptIdList"
            key-field="id"
            label-field="name"
          />
        </NSpin>
      </template>
    </Form>
  </Drawer>
</template>
<script lang="ts" setup>
import type { SysRoleApi } from '#/api/system/role';

import { computed, nextTick, ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { NSpin } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import { getDeptList } from '#/api/system/dept';
import { getMenuList } from '#/api/system/menu';
import { createRole, getRoleInfo, updateRole } from '#/api/system/role';
import GkTree from '#/components/GkTree.vue';
import { $t } from '#/locales';

import { useFormSchema } from '../data';

const emits = defineEmits(['success']);

const formData = ref<SysRoleApi.SysRole>();

const [Form, formApi] = useVbenForm({
  schema: useFormSchema(),
  showDefaultActions: false,
});

const menuIdList = ref<any[]>([]);
const loadingMenuIdList = ref(false);

const deptIdList = ref<any[]>([]);
const loadingDeptIdList = ref(false);

const checkedMenuKeys = ref<string[]>([]);
const checkedDeptKeys = ref<string[]>([]);

const id = ref();
const [Drawer, drawerApi] = useVbenDrawer({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    const values = await formApi.getValues();
    values.menuIdList = checkedMenuKeys.value || [];
    values.deptIdList = checkedDeptKeys.value || [];
    drawerApi.lock();
    (id.value ? updateRole(id.value, values) : createRole(values))
      .then(() => {
        emits('success');
        drawerApi.close();
      })
      .catch(() => {
        drawerApi.unlock();
      });
  },

  async onOpenChange(isOpen) {
    if (isOpen) {
      const data = drawerApi.getData<SysRoleApi.SysRole>();
      formApi.resetForm();
      // 先加载树数据
      if (menuIdList.value.length === 0) await loadPermissions();
      if (deptIdList.value.length === 0) await loadPermisDept();

      if (data) {
        formData.value = data;
        if (data.id) {
          id.value = data.id;
          const resp = await getRoleInfo(data.id);
          // 等待 Vue 更新 DOM 并确保 treeData 已经准备好
          await nextTick();

          checkedMenuKeys.value = resp.menuIdList || [];
          await formApi.setFieldValue(
            'menuIdList',
            checkedMenuKeys.value || [],
          );
          checkedDeptKeys.value = resp.deptIdList || [];
          formApi.setFieldValue('deptIdList', checkedDeptKeys.value || []);
        }
      } else {
        id.value = undefined;
        checkedMenuKeys.value = [];
        checkedDeptKeys.value = [];
      }

      // Wait for Vue to flush DOM updates (form fields mounted)
      await nextTick();
      if (data) {
        formApi.setValues(data);
      }
    }
  },
});

async function loadPermissions() {
  loadingMenuIdList.value = true;
  try {
    const res = await getMenuList();
    menuIdList.value = res as unknown as any[];
  } finally {
    loadingMenuIdList.value = false;
  }
}

async function loadPermisDept() {
  loadingDeptIdList.value = true;
  try {
    const res = await getDeptList({});
    deptIdList.value = res as unknown as any[];
  } finally {
    loadingDeptIdList.value = false;
  }
}

const getDrawerTitle = computed(() => {
  return formData.value?.id
    ? $t('common.edit', $t('system.role.name'))
    : $t('common.create', $t('system.role.name'));
});
</script>
<style lang="css" scoped>
.n-spin-content {
  width: 100%;
}
</style>
