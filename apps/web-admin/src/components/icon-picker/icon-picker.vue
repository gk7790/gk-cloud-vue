<template>
  <NPopover
    v-model:show="visible"
    :animated="false"
    trigger="click"
    placement="bottom-start"
    :show-arrow="false"
    :raw="true"
    style="padding: 0"
  >
    <template #trigger>
      <template v-if="props.type === 'input'">
        <NInput
          v-model:value="currentSelect"
          :placeholder="props.placeholder"
          clearable
          readonly
          class="cursor-pointer"
          :size="props.size"
          style="width: 100%"
          @click="visible = !visible"
        >
          <template #prefix>
            <div v-if="currentSelect" class="flex items-center">
              <Icon :icon="currentSelect" :size="16" />
            </div>
          </template>
          <template #suffix>
            <NIcon :size="16">
              <ChevronDown />
            </NIcon>
          </template>
        </NInput>
      </template>
      <div
        v-else
        class="inline-flex cursor-pointer items-center justify-center transition-opacity hover:opacity-80"
        :class="[
          props.iconClass,
          {
            'rounded border border-dashed border-gray-300 p-1': !currentSelect,
          },
        ]"
        @click="visible = !visible"
      >
        <Icon
          v-if="currentSelect"
          :icon="currentSelect"
          :size="props.iconSize"
        />
        <NIcon v-else :size="props.iconSize">
          <ImageOutline />
        </NIcon>
      </div>
    </template>

    <div class="flex flex-col" style="width: 400px; max-height: 500px">
      <!-- 头部搜索和选择器 -->
      <div class="space-y-3 border-b p-3">
        <div class="flex items-center gap-2">
          <NSelect
            v-model:value="currentCollection"
            :options="collectionOptions"
            :loading="loadingCollections"
            placeholder="选择图标集"
            size="small"
            style="width: 150px"
            @update:value="handleCollectionChange"
          />
          <NInput
            v-model:value="keyword"
            placeholder="搜索图标..."
            clearable
            size="small"
            style="flex: 1"
          >
            <template #prefix>
              <NIcon>
                <Search />
              </NIcon>
            </template>
          </NInput>
        </div>

        <!-- 预览当前选中图标 -->
        <div
          v-if="currentSelect"
          class="flex items-center gap-2 rounded bg-gray-50 p-2"
        >
          <div class="flex h-8 w-8 items-center justify-center">
            <Icon :icon="currentSelect" :size="20" />
          </div>
          <div class="flex-1 truncate text-sm">{{ currentSelect }}</div>
          <NButton size="tiny" quaternary @click="copyIconName(currentSelect)">
            复制名称
          </NButton>
        </div>
      </div>

      <!-- 图标网格 -->
      <div
        v-if="loadingIcons"
        class="flex flex-1 items-center justify-center py-10"
      >
        <NSpin size="small" />
      </div>

      <div v-else-if="filteredIcons.length > 0" class="flex-1 overflow-auto">
        <div class="grid grid-cols-8 gap-2 p-3">
          <div
            v-for="icon in paginatedIcons"
            :key="icon"
            class="group flex cursor-pointer flex-col items-center justify-center rounded p-2 transition-colors hover:bg-gray-100"
            :class="{
              'border border-blue-200 bg-blue-50':
                currentSelect === `${currentCollection}:${icon}`,
            }"
            @click="handleIconClick(icon)"
          >
            <div class="flex h-8 w-8 items-center justify-center">
              <Icon :icon="`${currentCollection}:${icon}`" :size="20" />
            </div>
            <div
              class="mt-1 w-full truncate text-center text-xs text-gray-500 group-hover:text-gray-700"
            >
              {{ icon }}
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div v-if="totalPages > 1" class="border-t px-3 py-2">
          <NPagination
            v-model:page="currentPage"
            :page-count="totalPages"
            :page-slot="5"
            size="small"
          />
        </div>
      </div>

      <!-- 空状态 -->
      <div
        v-else
        class="flex flex-1 flex-col items-center justify-center py-10 text-gray-400"
      >
        <NIcon size="40">
          <SearchOff />
        </NIcon>
        <div class="mt-2 text-sm">{{ noDataText }}</div>
      </div>
    </div>
  </NPopover>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';

import {
  NButton,
  NIcon,
  NInput,
  NPagination,
  NPopover,
  NSelect,
  NSpin,
  useMessage,
} from 'naive-ui';

interface Props {
  modelValue?: string;
  type?: 'icon' | 'input';
  size?: 'large' | 'medium' | 'small' | 'tiny';
  placeholder?: string;
  iconSize?: number;
  iconClass?: string;
  pageSize?: number;
  defaultCollection?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'input',
  size: 'medium',
  placeholder: '请选择图标',
  iconSize: 24,
  iconClass: '',
  pageSize: 48,
  defaultCollection: 'material-symbols',
});

const emit = defineEmits<{
  change: [value: string];
  'update:modelValue': [value: string];
}>();

const message = useMessage();
const visible = ref(false);
const currentSelect = ref(props.modelValue);
const currentCollection = ref(props.defaultCollection);
const keyword = ref('');
const loadingCollections = ref(false);
const loadingIcons = ref(false);
const currentPage = ref(1);

// 图标集合数据
const collections = ref<Array<{ label: string; value: string }>>([]);
const collectionIcons = ref<Record<string, string[]>>({});
const totalIcons = ref(0);

// 初始化获取图标集合
onMounted(async () => {
  await loadCollections();
});

// 加载图标集合
const loadCollections = async () => {
  loadingCollections.value = true;
  try {
    const response = await fetch('https://api.iconify.design/collections');
    const data = await response.json();

    collections.value = Object.entries(data)
      .filter(([_, info]: [string, any]) => info.total > 0)
      .map(([name, info]: [string, any]) => ({
        label: `${info.name} (${info.total})`,
        value: name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    // 加载默认集合的图标
    await loadIcons(currentCollection.value);
  } catch (error) {
    console.error('Failed to load collections:', error);
    message.error('加载图标集失败');
  } finally {
    loadingCollections.value = false;
  }
};

// 加载图标
const loadIcons = async (collection: string) => {
  if (collectionIcons.value[collection]) return;

  loadingIcons.value = true;
  try {
    const response = await fetch(
      `https://api.iconify.design/collection?prefix=${collection}`,
    );
    const data = await response.json();

    if (data.icons) {
      collectionIcons.value[collection] = data.icons;
      totalIcons.value = data.total || data.icons.length;
    }
  } catch (error) {
    console.error(`Failed to load icons for ${collection}:`, error);
    message.error(`加载 ${collection} 图标失败`);
    collectionIcons.value[collection] = [];
  } finally {
    loadingIcons.value = false;
  }
};

// 处理集合切换
const handleCollectionChange = async (collection: string) => {
  currentPage.value = 1;
  await loadIcons(collection);
};

// 过滤图标
const filteredIcons = computed(() => {
  const icons = collectionIcons.value[currentCollection.value] || [];
  if (!keyword.value) return icons;

  const searchTerm = keyword.value.toLowerCase();
  return icons.filter((icon) => icon.toLowerCase().includes(searchTerm));
});

// 分页图标
const paginatedIcons = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize;
  const end = start + props.pageSize;
  return filteredIcons.value.slice(start, end);
});

// 计算总页数
const totalPages = computed(() => {
  return Math.ceil(filteredIcons.value.length / props.pageSize);
});

// 空状态文本
const noDataText = computed(() => {
  if (keyword.value) return '没有找到匹配的图标';
  return '该图标集暂无图标';
});

// 集合选项
const collectionOptions = computed(() => {
  return collections.value;
});

// 处理图标点击
const handleIconClick = (iconName: string) => {
  const fullIconName = `${currentCollection.value}:${iconName}`;
  currentSelect.value = fullIconName;
  emit('update:modelValue', fullIconName);
  emit('change', fullIconName);
  visible.value = false;
};

// 复制图标名称
const copyIconName = (iconName: string) => {
  copyToClipboard(iconName)
    .then(() => {
      message.success('已复制图标名称');
    })
    .catch(() => {
      message.error('复制失败');
    });
};

// 监听外部值变化
watch(
  () => props.modelValue,
  (newVal) => {
    currentSelect.value = newVal;
  },
);

// 监听关键词变化重置分页
watch(
  () => keyword.value,
  () => {
    currentPage.value = 1;
  },
);
</script>

<style scoped>
.grid-cols-8 {
  grid-template-columns: repeat(8, minmax(0, 1fr));
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.transition-colors {
  transition: background-color 0.2s ease;
}

.transition-opacity {
  transition: opacity 0.2s ease;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
