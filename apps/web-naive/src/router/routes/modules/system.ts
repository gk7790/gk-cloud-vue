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
          title: '角色管理',
        },
        name: 'Role',
        path: '/sys/role',
        component: () => import('#/views/system/role/list.vue'),
      },
      {
        meta: {
          title: '用户管理',
        },
        name: 'User',
        path: '/sys/user',
        component: () => import('#/views/system/user/index.vue'),
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
    ],
  },
];

export default routes;
