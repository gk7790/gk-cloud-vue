<template>
  <NDrawer
    :default-width="width"
    :resizable="resizable"
    :mask-closable="maskClosable"
    :show="visible"
    placement="right"
    @update:show="onClose"
  >
    <NDrawerContent :title="title" closable @close="onClose">
      <slot :data="data"></slot>
      <div class="mt-4 flex justify-end gap-2">
        <NButton @click="handleCancel">取消</NButton>
        <NButton type="primary" @click="handleConfirm">确认</NButton>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

import { NButton, NDrawer, NDrawerContent } from 'naive-ui';

const props = defineProps<{
  data?: any; // 传入数据
  maskClosable?: boolean; // 点击遮罩是否关闭
  modelValue: boolean; // 控制显示
  onCancel?: () => void;
  onConfirm?: (data: any) => void;
  resizable?: boolean; // 是否可拉伸
  title?: string; // 抽屉标题
  width?: number | string; // 宽度
}>();

const emit = defineEmits(['update:modelValue']);

const visible = ref(props.modelValue);
const data = ref(props.data || {});
const title = props.title || '抽屉';
const width = props.width || 600;
const resizable = props.resizable ?? true;
const maskClosable = props.maskClosable ?? true;

watch(
  () => props.modelValue,
  (val) => {
    visible.value = val;
  },
);

watch(
  () => props.data,
  (val) => {
    data.value = val;
  },
);

function handleConfirm() {
  props.onConfirm?.(data.value);
  onClose();
}

function handleCancel() {
  props.onCancel?.();
  onClose();
}

function onClose() {
  visible.value = false;
  emit('update:modelValue', false);
}
</script>
