<template>
  <div class="home-page">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="hero-title">欢迎使用我们的产品</h1>
        <p class="hero-description">提供最优质的服务，助力您的业务增长</p>
        <div class="hero-actions">
          <button class="btn-primary" @click="goToFeatures">了解功能</button>
          <button class="btn-secondary" @click="goToAuth">立即开始</button>
        </div>
      </div>
    </section>
    
    <!-- 功能预览 -->
    <section class="features-preview">
      <h2>核心功能</h2>
      <div class="features-grid">
        <div class="feature-card" v-for="feature in features" :key="feature.title">
          <div class="feature-icon" :style="{ backgroundColor: feature.color }">
            <span class="icon">{{ feature.icon }}</span>
          </div>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const features = [
  {
    title: '高性能',
    description: '快速响应，极致体验',
    icon: '⚡',
    color: '#e6f7ff'
  },
  {
    title: '安全可靠',
    description: '多重保护，数据安全',
    icon: '🛡️',
    color: '#f6ffed'
  },
  {
    title: '易于使用',
    description: '简洁界面，操作便捷',
    icon: '🎯',
    color: '#fff7e6'
  },
  {
    title: '强大功能',
    description: '丰富功能，满足需求',
    icon: '🚀',
    color: '#f9f0ff'
  }
]

const goToFeatures = () => {
  router.push('/features')
}

const goToAuth = () => {
  router.push('/auth/login')
}
</script>

<style scoped>
.home-page {
  width: 100%;
}

.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 120px 24px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 24px;
}

.hero-description {
  font-size: 20px;
  margin-bottom: 40px;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.btn-primary, .btn-secondary {
  padding: 12px 32px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border: none;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.1);
}

.features-preview {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 24px;
}

.features-preview h2 {
  text-align: center;
  font-size: 36px;
  margin-bottom: 48px;
  color: #333;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 32px;
}

.feature-card {
  text-align: center;
  padding: 32px 24px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-4px);
}

.feature-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.feature-icon .icon {
  font-size: 24px;
}

.feature-card h3 {
  font-size: 20px;
  margin-bottom: 12px;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn-primary, .btn-secondary {
    width: 100%;
    max-width: 300px;
  }
}
</style>
