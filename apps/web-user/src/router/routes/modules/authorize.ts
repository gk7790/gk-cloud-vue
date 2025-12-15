import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: '权限管理',
    },
    name: 'authorize',
    path: '/authorize',
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
    ],
  },
];

export default routes;
