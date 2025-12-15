<template>
  <NCard :bordered="true" class="w-full" style="max-width: 500px">
    <NSpace justify="start">
      <!-- 全选 -->
      <NCheckbox
        :checked="isAllChecked"
        :indeterminate="indeterminate"
        @update:checked="handleCheckedChange"
      />
      <!-- 展开/收起 -->
      <NButton size="tiny" type="primary" text @click="toggleExpand">
        <div class="flex items-center gap-1">
          <span>{{
            isExpandedAll ? $t('core.collapse') : $t('core.expand')
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

    <!-- Tree -->
    <NTree
      block-line
      checkable
      cascade
      :data="data"
      :show-line="showLine"
      :key-field="keyField"
      :checked-keys="innerCheckedKeys"
      :expanded-keys="expandedKeys"
      @update:checked-keys="updateCheckedKeys"
      @update:expanded-keys="updateExpandedKeys"
      :render-prefix="renderPrefix"
      :render-label="renderLabel"
    />
  </NCard>
</template>

<script lang="ts" setup>
import type { TreeOption } from 'naive-ui';

import { computed, h, ref, watch } from 'vue';

import { ChevronDown, IconifyIcon } from '@vben/icons';
import { getNestedValue } from '@vben/utils';

import { NButton, NCard, NCheckbox, NDivider, NSpace, NTree } from 'naive-ui';

import { $t } from '#/locales';

/** ---------- Props / Emits ---------- */
const props = defineProps({
  /** Tree 数据 */
  data: {
    type: Array as () => TreeOption[], // 或自定义类型
    default: () => [],
  },
  /** 选中的 keys */
  modelValue: { type: Array, default: () => [] },
  /** 节点文本字段名（默认 label） */
  labelField: { type: String, default: 'label' },
  /** 节点 key 字段名（默认 key） */
  keyField: { type: String, default: 'id' },
  iconField: { type: String, default: '' },
  /** 是否展示连接线 */
  showLine: { type: Boolean, default: false },
  isAlias: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

/** ---------- 内部状态 ---------- */
const innerCheckedKeys = ref<any>([...props.modelValue]);
const expandedKeys = ref([]);

/** 同步外部 v-model */
watch(
  () => props.modelValue,
  (val) => {
    innerCheckedKeys.value = [...val];
  },
);

/** 通用 DFS：获取所有节点 key */
function getAllNodeKeys(nodes: any) {
  const res: any = [];
  const dfs = (list: any) => {
    list.forEach((item: any) => {
      res.push(item[props.keyField]);
      if (item.children) dfs(item.children);
    });
  };
  dfs(nodes);
  return res;
}

function renderPrefix({ option }: { option: any }) {
  if (!props.iconField) {
    return h('span');
  }
  const icon = getNestedValue(option, props.iconField);
  return icon
    ? h(IconifyIcon, {
        icon,
        class: 'inline-block',
        style: {
          width: '16px',
          height: '16px',
          verticalAlign: 'middle',
        },
      })
    : h('span');
}

function renderLabel({ option }: { option: any }) {
  return props.isAlias
    ? h('span', {}, $t(getNestedValue(option, props.labelField)))
    : h('span', {}, getNestedValue(option, props.labelField));
}

const allKeys = computed(() => getAllNodeKeys(props.data));

/** ---------- 全选逻辑 ---------- */
const indeterminate = computed(
  () =>
    innerCheckedKeys.value.length > 0 &&
    innerCheckedKeys.value.length !== allKeys.value.length,
);

const isAllChecked = computed(
  () => innerCheckedKeys.value.length === allKeys.value.length,
);

function handleCheckedChange(checked) {
  innerCheckedKeys.value = checked ? [...allKeys.value] : [];
  emit('update:modelValue', innerCheckedKeys.value);
}

/** ---------- Tree 勾选 ---------- */
function updateCheckedKeys(keys) {
  innerCheckedKeys.value = keys;
  emit('update:modelValue', keys);
}

/** ---------- 展开/收起 ---------- */
const isExpandedAll = computed(
  () => expandedKeys.value.length === allKeys.value.length,
);

function toggleExpand() {
  expandedKeys.value = isExpandedAll.value ? [] : [...allKeys.value];
}

function updateExpandedKeys(keys) {
  expandedKeys.value = keys;
}
</script>
