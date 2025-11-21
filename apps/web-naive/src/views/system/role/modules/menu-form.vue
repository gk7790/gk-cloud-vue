<template>
  <Modal title="菜单权限" class="w-2/5">
    <Form class="mx-4">
      <template #menuIdList="slotProps">
        <NSpin :show="menuLoading" class="w-full">
          <Tree
            :tree-data="menuTree"
            multiple
            bordered
            :default-expanded-keys="expandedKeys"
            :get-node-class="getNodeClass"
            v-bind="slotProps"
            value-field="id"
            label-field="meta.title"
            icon-field="meta.icon"
            v-model:checked-keys="checkedMenuKeys"
          >
            <template #node="{ value }">
              <IconifyIcon v-if="value.meta.icon" :icon="value.meta.icon" />
              {{ $t(value.meta.title) }}
            </template>
          </Tree>
        </NSpin>
      </template>
    </Form>
    <template #prepend-footer>
      <div class="flex flex-auto items-center">
        <NCheckbox :checked="isAllSelected" @change="handleSelectAll">
          全选
        </NCheckbox>
        <NCheckbox :checked="isExpanded" @change="handleExpandAll">
          全部展开
        </NCheckbox>
      </div>
    </template>
  </Modal>
</template>

<script lang="ts" setup>
import type { Recordable } from '@vben/types';

import type { SysMenuApi } from '#/api/system/menu';
import type { SysRoleApi } from '#/api/system/role';

import { nextTick, ref } from 'vue';

import { Tree, useVbenModal } from '@vben/common-ui';
import { SystemMenuTypeEnum } from '@vben/constants';
import { IconifyIcon } from '@vben/icons';

import { NCheckbox, NSpin } from 'naive-ui';

import { useVbenForm } from '#/adapter/form';
import { message } from '#/adapter/naive';
import { getMenuList } from '#/api/system/menu';
import { getRoleMenuList } from '#/api/system/role';
import { $t } from '#/locales';

import { useAssignMenuFormSchema } from '../data';

const emit = defineEmits(['success']);

const menuTree = ref<SysMenuApi.SysMenu[]>([]); // 菜单树
const menuLoading = ref(false); // 加载菜单列表
const isAllSelected = ref(false); // 全选状态
const isExpanded = ref(false); // 展开状态
const expandedKeys = ref<string[]>([]); // 展开的节点
const checkedMenuKeys = ref<string[]>([]); // 展开的节点
const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: {
      class: 'w-full',
    },
    formItemClass: 'col-span-2',
    labelWidth: 80,
  },
  layout: 'horizontal',
  schema: useAssignMenuFormSchema(),
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const valid = await formApi.validate();
    if (!valid) {
      return;
    }
    modalApi.lock();
    // 提交表单
    const data = await formApi.getValues();
    try {
      console.log(data);
      // 关闭并提示
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      return;
    }
    // 加载菜单列表
    await loadMenuTree();
    const data = modalApi.getData<SysRoleApi.SysRole>();
    if (!data || !data.id) {
      return;
    }
    modalApi.lock();
    try {
      // 加载角色菜单
      const menuIds = await getRoleMenuList(data.id);
      data.menuIdList = menuIds;
      checkedMenuKeys.value = menuIds;
      // await formApi.setFieldValue('menuIdList', menuIds);
      // await formApi.setValues(data);
    } finally {
      await nextTick(); // 菜单过多，渲染较慢，需要等下一次事件循环
      modalApi.unlock();
    }
    // Wait for Vue to flush DOM updates (form fields mounted)
    await nextTick();
    if (data) {
      formApi.setValues(data);
    }
  },
});

/** 加载菜单树 */
async function loadMenuTree() {
  menuLoading.value = true;
  try {
    const data = await getMenuList();
    menuTree.value = data as SysMenuApi.SysMenu[];
  } finally {
    menuLoading.value = false;
  }
}

/** 全选/全不选 */
function handleSelectAll() {
  isAllSelected.value = !isAllSelected.value;
  if (isAllSelected.value) {
    const allIds = getAllNodeIds(menuTree.value);
    formApi.setFieldValue('menuIdList', allIds);
  } else {
    formApi.setFieldValue('menuIdList', []);
  }
}

/** 展开/折叠所有节点 */
function handleExpandAll() {
  isExpanded.value = !isExpanded.value;
  expandedKeys.value = isExpanded.value ? getAllNodeIds(menuTree.value) : [];
}

/** 递归获取所有节点 ID */
function getAllNodeIds(nodes: any[], ids: number[] = []): number[] {
  nodes.forEach((node: any) => {
    ids.push(node.id);
    if (node.children && node.children.length > 0) {
      getAllNodeIds(node.children, ids);
    }
  });
  return ids;
}

function getNodeClass(node: Recordable<any>) {
  const classes: string[] = [];
  if (node.value?.type === SystemMenuTypeEnum.BUTTON) {
    classes.push('inline-flex');
    if (node.index % 3 >= 1) {
      classes.push('!pl-0');
    }
  }

  return classes.join(' ');
}
</script>
