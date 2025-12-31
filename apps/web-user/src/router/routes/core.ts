import type { RouteRecordRaw } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';

import { $t } from '#/locales';

const BasicLayout = () => import('#/layouts/basic.vue');
const AuthPageLayout = () => import('#/layouts/auth.vue');
const PublicLayout = () => import('#/public/index.vue');

/** 全局404页面 */
const fallbackNotFoundRoute: RouteRecordRaw = {
  component: () => import('#/views/_core/fallback/not-found.vue'),
  meta: {
    hideInBreadcrumb: true,
    hideInMenu: true,
    hideInTab: true,
    title: '404',
  },
  name: 'FallbackNotFound',
  path: '/:path(.*)*',
};

/** 基本路由，这些路由是必须存在的 */
const coreRoutes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    name: 'zap',
    path: '/',
    redirect: '/home',
    children: [],
  },
  {
    component: PublicLayout,
    meta: {
      hideInBreadcrumb: true,
      ignoreAccess: true,
      title: 'Root',
    },
    name: 'Root',
    path: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('#/public/index.vue'),
        meta: {
          title: '官网首页',
          ignoreAccess: true,
        },
      },
      {
        path: '/features',
        name: 'Features',
        component: () => import('#/public/features.vue'),
        meta: {
          title: '产品功能',
          ignoreAccess: true,
        },
      },
      {
        path: '/pricing',
        name: 'Pricing',
        component: () => import('#/public/pricing.vue'),
        meta: {
          title: '价格方案',
          ignoreAccess: true,
        },
      },
    ],
  },
  {
    component: AuthPageLayout,
    meta: {
      hideInTab: true,
      title: 'Authentication',
    },
    name: 'Authentication',
    path: '/auth',
    redirect: LOGIN_PATH,
    children: [
      {
        name: 'Login',
        path: 'login',
        component: () => import('#/views/_core/authentication/login.vue'),
        meta: {
          title: $t('page.auth.login'),
        },
      },
      {
        name: 'CodeLogin',
        path: 'code-login',
        component: () => import('#/views/_core/authentication/code-login.vue'),
        meta: {
          title: $t('page.auth.codeLogin'),
        },
      },
      {
        name: 'QrCodeLogin',
        path: 'qrcode-login',
        component: () =>
          import('#/views/_core/authentication/qrcode-login.vue'),
        meta: {
          title: $t('page.auth.qrcodeLogin'),
        },
      },
      {
        name: 'ForgetPassword',
        path: 'forget-password',
        component: () =>
          import('#/views/_core/authentication/forget-password.vue'),
        meta: {
          title: $t('page.auth.forgetPassword'),
        },
      },
      {
        name: 'Register',
        path: 'register',
        component: () => import('#/views/_core/authentication/register.vue'),
        meta: {
          title: $t('page.auth.register'),
        },
      },
    ],
  },
];

export { coreRoutes, fallbackNotFoundRoute, publicRoutes };
