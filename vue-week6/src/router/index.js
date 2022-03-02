import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/ProductsView.vue'),
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../views/ProductView.vue'),
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/CartView.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/DashboardLogin.vue'),
  },
  {
    path: '/admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: '/DashboardProducts',
        component: () => import('../views/DashboardProducts.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
