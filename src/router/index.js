/**
 * Vue Router
 *
 * @library
 *
 * https://router.vuejs.org/en/
 */

// Lib imports
import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'

import store from '../store/index';

Vue.use(Router)

// Create a new router
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'login',
    component: () => import('./../views/Login.vue')
  },
  {
    path: '/login',
    redirect: '/'
  },
  {
    path: '/admin',
    'name': 'Admin Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      { path: 'dashboard', name: 'Dashboard', component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true }},
      // { path: 'detail', component: () => import('./../components/core/View.vue'), meta: { requiresAuth: true } },
      // { path: 'confirm', component: () => import('./../components/core/View.vue'), meta: { requiresAuth: true } },
      {
        path: 'user-profile',
        name: 'User Profile',
        component: () => import('./../views/UserProfile.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'import-data',
        name: 'Importadores',
        component: () => import('./../views/admin/ImportData.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'user-list',
        name: 'Usuarios en el sistema',
        component: () => import('./../views/admin/UserList.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'instalations',
        name: 'Instalaciones Semanales',
        component: () => import('./../views/admin/Instalations.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'kit-report',
        name: 'Importador de Equipos',
        component: () => import('./../views/imports/KitReports.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'kit-detail-import',
        name: 'Importador de Historial de Equipos',
        component: () => import('./../views/imports/KitDetailsImport.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'call-center-import',
        name: 'Importador de Atencion al cliente',
        component: () => import('./../views/imports/CallCenterImport.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'reports',
        name: 'Importador de Atencion al cliente',
        component: () => import('./../views/admin/Reports.vue'), meta: { requiresAuth: true }
      },
      {
        path: 'reports/call-center',
        name: 'Reporte de Call Center por Usuario',
        component: () => import('./../views/reports/ReportCallCenter.vue'), meta: { requiresAuth: true }
      },
    ]
  }
  ],
  // paths.map(path => route(path.path, path.view, path.name)).concat([
  //   { path: '*', redirect: '/' }
  // ])
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  },
})

// Vue.use(Meta)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.userData.user_logged) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }

})

export default router
