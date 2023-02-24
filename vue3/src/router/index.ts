import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: () => import(/* webpackChunkName: "HomeView" */ '@/views/HomeView.vue'),
      meta: {layout: 'Default',},
    },
    {
      path: '/auth',
      name: 'Auth',
      meta: {layout: 'Auth',},
      children: [
        {
          path: 'login',
          component: () => import(/* webpackChunkName: "LoginView" */ '@/views/auth/LoginView.vue'),
        },
        {
          path: 'register',
          component: () => import(/* webpackChunkName: "RegisterView" */ '@/views/auth/RegisterView.vue'),
        },
        {
          path: 'verify-email',
          component: () => import(/* webpackChunkName: "VerifyEmail" */ '@/views/auth/VerifyEmail.vue'),
        },
        {
          path: 'reset-password',
          component: () => import(/* webpackChunkName: "ResetPassword" */ '@/views/auth/ResetPassword.vue'),
        },
      ]
    },
    {
      path: '/profile',
      name: 'Profile',
      meta: {layout: 'Default',},
      children: [
        {
          name: 'Index',
          path: '/',
          component: () => import(/* webpackChunkName: "ProfileView" */ '@/views/profile/ProfileView.vue'),
        },
        {
          path: 'edit',
          component: () => import(/* webpackChunkName: "EditProfile" */ '@/views/profile/EditProfile.vue'),
        },
      ]
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      meta: {layout: 'Default',},
      component: () => import(/* webpackChunkName: "DashboardView" */ '../views/DashboardView.vue')
    },
    {
      path: '/*',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/404View.vue'),
      meta: {layout: 'default',},
    }
  ]
})

export default router
