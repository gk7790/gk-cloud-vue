<template>
  <NDrawer
    v-model:show="internalVisible"
    :title="`修改字典 - ${data?.dictName || '-'}`"
    :default-width="800"
    resizable
    :mask-closable="false"
  >
    <NDrawerContent :title="data?.dictName || '修改'">
      <Grid>
        <template #action>
          <NSpace justify="center">
            <NButton text type="info">编辑</NButton>
            <NButton text type="error">删除</NButton>
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

import { NButton, NDrawer, NDrawerContent, NSpace } from 'naive-ui';

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

// 内部可控状态，避免直接修改 props
const internalVisible = ref(props.visible);

const form = reactive({
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
      form.dictName = props.data.dictName || '';
      form.dictType = props.data.dictType || '';
    }
  },
);

// 提交修改
function onSubmit() {
  // TODO: 调用接口保存
  emit('success'); // 通知父组件刷新 Table
  emit('update:visible', false); // 关闭 Drawer
}

const formOptions: VbenFormProps = {
  collapsed: false,
  wrapperClass: 'grid-cols-2',
  compact: true,
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: '字典名称',
      },
      fieldName: 'category',
    },
    {
      component: 'Input',
      componentProps: {
        placeholder: '字典类型',
      },
      fieldName: 'productName',
    },
  ],
  showCollapseButton: true,
  submitButtonOptions: {
    content: '查询',
  },
  submitOnChange: false,
  submitOnEnter: false,
};

interface RowType {
  dictName: string;
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
      field: 'sort',
      title: '排序',
      align: 'center',
    },
    {
      field: 'remark',
      title: '备注',
    },
    {
      field: 'createdAt',
      formatter: 'formatDateTime',
      title: '创建时间',
      align: 'center',
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
      query: async ({ page }) => {
        return await getDictDataList({
          page: page.currentPage,
          pageSize: page.pageSize,
          dictTypeId: '1894320809411260417',
        });
      },
    },
  },
  toolbarConfig: {
    // @ts-ignore
    search: true,
    custom: true,
    export: false,
    refresh: true,
    zoom: true,
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>
