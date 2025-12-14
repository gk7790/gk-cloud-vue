<template>
  <NCard :bordered="true" style="max-width: 500px">
    <NSpace justify="left">
      <NCheckbox @update:checked="handleCheckedChange" />
      <!-- 展开/收起 切换按钮 + 图标 -->
      <NButton size="tiny" type="primary" text @click="toggleExpand">
        <div class="flex items-center gap-1">
          <span>{{
            isExpandedAll ? $t('system.collapse') : $t('system.expand')
          }}</span>
          <ChevronDown
            class="size-4 transition-transform duration-200"
            :style="{
              transform: isExpandedAll ? 'rotate(180deg)' : 'rotate(0deg)',
            }"
          />
        </div>
      </NButton>
    </NSpace>
    <NDivider />
    <NTree
      block-line
      checkable
      cascade
      :data="treeData"
      :checked-keys="checkedKeys"
      :expanded-keys="expandedKeys"
      @update:checked-keys="handleCheck"
      @update:expanded-keys="handleExpand"
    />
  </NCard>
</template>

<script setup>
import { computed, ref } from 'vue';

import { ChevronDown } from '@vben/icons';

import { NButton, NCard, NCheckbox, NDivider, NSpace, NTree } from 'naive-ui';

/** ---------- Tree 数据 ---------- */
const treeData = [
  {
    label: '菜单 1',
    key: '1',
    children: [
      {
        label: '菜单 1-1',
        key: '1-1',
      },
      {
        label: '菜单 1-2',
        key: '1-2',
        children: [
          { label: '菜单 1-2-1', key: '1-2-1' },
          { label: '菜单 1-2-2', key: '1-2-2' },
        ],
      },
    ],
  },
  {
    label: '菜单 2',
    key: '2',
    children: [{ label: '菜单 2-1', key: '2-1' }],
  },
];

/** ---------- 多选（受控） ---------- */
const checkedKeys = ref([]);

/** ---------- 展开状态（受控） ---------- */
const expandedKeys = ref([]);

/** ---------- 多选更新 ---------- */
function handleCheck(keys) {
  checkedKeys.value = keys;
}

/** ---------- 展开更新 ---------- */
function handleExpand(keys) {
  expandedKeys.value = keys;
}

/** ---------- 全选处理 ---------- */
function getAllNodeKeys(nodes) {
  const keys = [];
  const dfs = (list) => {
    list.forEach((n) => {
      keys.push(n.key);
      if (n.children) dfs(n.children);
    });
  };
  dfs(nodes);
  return keys;
}

const allKeys = getAllNodeKeys(treeData);

function handleCheckedChange(checked) {
  checkedKeys.value = checked ? [...allKeys] : [];
}

/** *************** 展开/收起 切换逻辑 */
const isExpandedAll = computed(
  () => expandedKeys.value.length === allKeys.length,
);

function toggleExpand() {
  expandedKeys.value = isExpandedAll.value ? [] : [...allKeys];
}
</script>
