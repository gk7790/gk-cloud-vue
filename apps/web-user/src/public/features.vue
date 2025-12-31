<template>
  <NLayout class="public-home">
    <NLayoutHeader height="70px" class="header">
      <div class="logo">My Product</div>
      <NSpace align="center" justify="end" class="nav-links">
        <NButton tertiary @click="goTo('features')">功能</NButton>
        <NButton tertiary @click="goTo('pricing')">价格</NButton>
        <NButton tertiary @click="goLogin">登录</NButton>
      </NSpace>
    </NLayoutHeader>

    <!-- Hero Section -->
    <NLayoutContent class="hero-section">
      <NSpace vertical align="center" size="large">
        <h1 class="hero-title">欢迎来到我们的产品</h1>
        <p class="hero-subtitle">简单、快速、强大的后台管理解决方案</p>
        <NSpace>
          <NButton size="large" type="primary" @click="goTo('features')">
            了解更多
          </NButton>
          <NButton size="large" type="success" @click="goRegister">
            免费试用
          </NButton>
        </NSpace>
      </NSpace>
    </NLayoutContent>

    <!-- Features Preview -->
    <NLayoutContent class="features-preview">
      <NSpace vertical size="large" align="center">
        <h2>产品亮点</h2>
        <NGrid :x-gap="24" :y-gap="24" cols="3">
          <NGridItem v-for="item in featureList" :key="item.title">
            <NCard :title="item.title">
              {{ item.desc }}
            </NCard>
          </NGridItem>
        </NGrid>
      </NSpace>
    </NLayoutContent>

    <NLayoutFooter class="footer">
      © 2025 My Company
    </NLayoutFooter>
  </NLayout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

import {
  NButton,
  NCard,
  NGrid,
  NGridItem,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NSpace
} from 'naive-ui';

const router = useRouter();

const featureList = [
  { title: '功能一', desc: '无缝权限控制与动态路由' },
  { title: '功能二', desc: '可定制化 Layout 与主题' },
  { title: '功能三', desc: '高性能开发体验' }
];

function goTo(name: string) {
  router.push(`/${name}`);
}
function goLogin() {
  router.push('/auth/login');
}
function goRegister() {
  router.push('/auth/register');
}
</script>

<style scoped>
.header {
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  background-color: white;
}
.logo {
  font-size: 24px;
  font-weight: bold;
}
.nav-links > * {
  margin-left: 12px;
}
.hero-section {
  text-align: center;
  padding: 64px 24px;
}
.hero-title {
  font-size: 36px;
  font-weight: bold;
}
.hero-subtitle {
  font-size: 18px;
  color: #555;
}
.features-preview {
  padding: 48px 24px;
}
.footer {
  text-align: center;
  padding: 16px;
  color: #888;
}
</style>
