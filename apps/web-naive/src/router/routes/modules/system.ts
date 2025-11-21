import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: '系统配置',
    },
    name: 'Demos1',
    path: '/demos1',
    children: [
      {
        meta: {
          title: '部门管理',
        },
        name: 'Dept',
        path: '/sys/dept',
        component: () => import('#/views/system/dept/list.vue'),
      },
      {
        meta: {
          title: '租户管理',
        },
        name: 'Tenant',
        path: '/sys/tenant',
        component: () => import('#/views/system/tenant/list.vue'),
      },
      {
        meta: {
          title: '菜单管理',
        },
        name: 'Menu',
        path: '/sys/menu',
        component: () => import('#/views/system/menu/list.vue'),
      },
      {
        meta: {
          title: '字典管理',
        },
        name: 'Dict',
        path: '/sys/dict',
        component: () => import('#/views/system/dict/index.vue'),
      },
      {
        meta: {
          title: '系统参数',
        },
        name: 'Params',
        path: '/sys/params',
        component: () => import('#/views/system/params/index.vue'),
      },
    ],
  },
];

export default routes;
