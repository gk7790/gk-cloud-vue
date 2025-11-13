<template>
  <NDrawer
    v-model:show="internalVisible"
    :default-width="800"
    resizable
    :mask-closable="false"
  >
    <NDrawerContent :title="`修改字典 - ${data?.dictName || '-'}`" closable>
      <Grid>
        <template #action="{ row }">
          <NSpace justify="center">
            <NButton text type="info">编辑</NButton>
            <NPopconfirm @positive-click="handlePositiveClick(row)">
              <template #trigger>
                <NButton text type="error"> 删除 </NButton>
              </template>
              {{ $t('ui.actionMessage.deleteConfirm', [row.dictLabel]) }}
              是否要删除
            </NPopconfirm>
          </NSpace>
        </template>
      </Grid>
    </NDrawerContent>
  </NDrawer>
</template>

<script lang="ts" setup>
import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';

import { reactive, ref, watch } from 'vue';

import {
  NButton,
  NDrawer,
  NDrawerContent,
  NPopconfirm,
  NSpace,
  useMessage,
} from 'naive-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';

import { getDictDataList } from '../api';

const props = defineProps<{
  data: null | Record<string, any>;
  visible: boolean;
}>();
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'success'): void;
}>();
const message = useMessage();
// 内部可控状态，避免直接修改 props
const internalVisible = ref(props.visible);

const form = reactive({
  id: '',
  dictName: '',
  dictType: '',
});

// 当父组件修改 visible 时，同步到内部
watch(
  () => props.visible,
  (val) => {
    internalVisible.value = val;
  },
);

// 当内部状态变化时通知父组件
watch(internalVisible, (val) => {
  emit('update:visible', val);
});

// 当 Drawer 打开时把数据拷贝到表单
watch(
  () => internalVisible.value,
  (val) => {
    if (val && props.data) {
      form.id = props.data.id || '';
    }
  },
);

function handlePositiveClick(row: any) {
  message.success(`$t('ui.actionMessage.deleteSuccess')`);
}

const formOptions: VbenFormProps = {
  showCollapseButton: false,
  wrapperClass: 'grid-cols-3  !mb-0 !border-0',
  compact: true,
  actionLayout: 'inline',
  commonConfig: {
    hideLabel: true,
    labelWidth: 1,
  },
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '字典值',
        size: 'small',
        clearable: true,
      },
      fieldName: 'dictValue',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '字典标签',
        size: 'small',
        clearable: true,
      },
      fieldName: 'dictLabel',
    },
  ],
  submitButtonOptions: {
    content: '查询',
    size: 'small',
  } as any,
  resetButtonOptions: {
    show: false,
  },
  submitOnChange: false,
  submitOnEnter: false,
};

interface RowType {
  id: string;
  dictLabel: string;
  dictType: string;
}

// 关键配置：确保启用了行右键事件
const gridOptions: VxeGridProps<RowType> = {
  height: 'auto',
  rowConfig: {
    isHover: true,
  },
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    {
      field: 'dictValue',
      title: '字典值',
    },
    {
      field: 'dictLabel',
      title: '字典标签',
    },
    {
      field: 'attrType',
      title: '颜色',
    },
    {
      field: 'sort',
      title: '排序',
      align: 'center',
    },
    {
      field: 'remark',
      title: '备注',
    },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: '操作',
    },
  ],
  keepSource: true,
  pagerConfig: {
    pageSize: 10,
    pageSizes: [10, 20, 50, 100],
  },
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        return await getDictDataList({
          page: page.currentPage,
          pageSize: page.pageSize,
          dictTypeId: form.id,
          ...formValues,
        });
      },
    },
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>
