import {createRouter, createWebHistory} from 'vue-router'
import {useAuthStore} from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: () => import(/* webpackChunkName: "HomeView" */ '@/views/HomeView.vue'),
    },
    {
      path: '/auth',
      name: 'Auth',
      meta: {layout: 'auth', onlyGuest: true},
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
      meta: {requiresAuth: true},
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
      meta: {requiresAuth: true},
      component: () => import(/* webpackChunkName: "DashboardView" */ '../views/DashboardView.vue')
    },
    {
      path: '/*',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/404View.vue'),
    }
  ],
})

router.beforeEach((to, from) => {
  const authStore = useAuthStore()
  if (to.meta.onlyGuest && authStore.isAuthenticated) { // Guest only ...
    if (from) return {path: from.path}
    return {path: '/'}
  }
  if (to.meta.requiresAuth && !authStore.isAuthenticated) { // Require Authenticated ...
    return {
      path: '/auth/login',
      // save the location we were at to come back later
      query: {redirect: to.fullPath},
    }
  }
})

export default router
