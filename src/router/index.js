import AuthLayout from '@/layouts/AuthLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'kitchen display',
        name: 'Kitchen Display',
        component: () => import('@/views/dashboard/KitchenDisplayView.vue'),
        meta: { requiresAuth: true  },
      }
    ],
  },
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/auth/LoginView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  if (publicPages.includes(to.path) && loggedIn) {
    return next('/dashboard');
  }

  next();
});

export default router;