import AuthLayout from '@/layouts/AuthLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/DashboardView.vue'),
        meta: { 
          title: 'KDS',
          requiresAuth: true
         },
      },
      {
        path: 'kds',
        name: 'KitchenDisplay',
        component: () => import('@/views/dashboard/KitchenDisplayView.vue'),
        meta: { requiresAuth: true  },
      } , 
      {
        path: 'kitchen',
        name: 'KitchenDisplay2',
        component: () => import('@/views/dashboard/KitchenDisplayView.vue'),
        meta: { requiresAuth: true  },
      } , 
      {
        path: 'table',
        name: 'TableItem',
        component: () => import('@/views/dashboard/TableItemView.vue'),
        meta: { requiresAuth: true  },
      } , 
      {
        path: 'item-detail/:id',
        name: 'ItemDetail',
        component: () => import('@/views/dashboard/ItemDetailView.vue'),
        meta: { 
          title: 'KDS Item Detail',
          requiresAuth: true
         },
        props: true,
        
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

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login'];
//   const authRequired = to.matched.some(record => record.meta.requiresAuth);
//   const loggedIn = localStorage.getItem('user');

//   if (authRequired && !loggedIn) {
//     return next('/login');
//   }
//   if (publicPages.includes(to.path) && loggedIn) {
//     return next('/');
//   }

//   next();
// });

router.beforeEach((to, from, next) => {
  document.title = `${(to.meta.title ?? 'KDS')} | Yubi POS`;
  next();
})

export default router;
