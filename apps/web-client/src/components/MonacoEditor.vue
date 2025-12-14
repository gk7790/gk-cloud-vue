<template>
  <div ref="editorRef" class="monaco-editor-container"></div>
</template>

<script setup lang="ts">
import type * as monacoType from 'monaco-editor';

import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

import loader from '@monaco-editor/loader';

interface EditorOptions {
  automaticLayout?: boolean;
  minimap?: { enabled: boolean };
  readOnly?: boolean;
  [key: string]: any;
}

const props = defineProps({
  modelValue: { type: String, default: '' },
  language: { type: String, default: 'json' },
  theme: { type: String, default: 'vs-dark' },
  readOnly: { type: Boolean, default: false },
  options: { type: Object as () => EditorOptions, default: () => ({}) },
  autoFormat: { type: Boolean, default: true }, // 是否自动格式化
});

const emit = defineEmits(['update:modelValue']);

const editorRef = ref<HTMLElement | null>(null);
let editor: monacoType.editor.IStandaloneCodeEditor | null = null;

onMounted(async () => {
  const monaco = await loader.init();

  editor = monaco.editor.create(editorRef.value!, {
    value: props.modelValue,
    language: props.language,
    theme: props.theme,
    readOnly: props.readOnly,
    lineNumbers: 'off',
    automaticLayout: true,
    minimap: { enabled: false },
    ...props.options,
  });

  if (props.autoFormat) {
    setTimeout(() => {
      editor?.getAction('editor.action.formatDocument')?.run();
    }, 200);
  }

  // 监听内容变化
  editor.onDidChangeModelContent(() => {
    emit('update:modelValue', editor?.getValue() ?? '');
  });
});

// 销毁编辑器
onBeforeUnmount(() => {
  editor?.dispose();
  editor = null;
});

// 外部 modelValue 变化时更新编辑器内容
watch(
  () => props.modelValue,
  (value) => {
    if (editor && value !== editor.getValue()) {
      editor.setValue(value);
    }
  },
);
</script>

<style scoped>
.monaco-editor-container {
  width: 100%;
  height: 100%;
  min-height: 200px; /* 默认高度 */
  border-radius: 8px; /* 圆角 */
  border: 1px solid #ccc; /* 边框 */
  overflow: hidden; /* 防止内容溢出圆角 */
}
</style>
