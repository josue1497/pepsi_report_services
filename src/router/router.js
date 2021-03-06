import Vue from 'vue'
import Router from 'vue-router'

import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'

import store from '../store/index';

Vue.use(Router)

const router = new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ '../views/users/Profile.vue')
        },
        {
          path: '/maps',
          name: 'maps',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Tables.vue')
        }
      ]
    },
    {
      path: '/profile',
      name: 'Perfil de Usuario',
      component: () => import(/* webpackChunkName: "demo" */ '../views/users/Profile.vue'),
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ '../views/Register.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'Admin Dashboard',
      redirect: 'login',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard', name: 'Dashboard', component: () => import('@/views/Dashboard.vue'),
          meta: { requiresAuth: true }
        },
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
          path: 'desicion_matrix',
          name: 'Matriz de Decisión',
          component: () => import('./../views/admin/DesicionMatrix.vue'), meta: { requiresAuth: true }
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
          name: 'Reportes avanzados',
          component: () => import('./../views/admin/Reports.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/call-center',
          name: 'Reporte de Call Center por Usuario',
          component: () => import('./../views/reports/ReportCallCenter.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/kit-details',
          name: 'Reporte de Detalle de Equipos',
          component: () => import('./../views/reports/KitDetailsReport.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/general_indicators',
          name: 'Indicadores generales',
          component: () => import('./../views/reports/KitReport.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/expired_orders',
          name: 'Indicadores generales',
          component: () => import('./../views/reports/ExpireOrders.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/detail_orders',
          name: 'Indicadores generales',
          component: () => import('./../views/reports/DetailsOrders.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/pto_details_orders',
          name: 'Reporte por Puesto de Trabajo Responsable',
          component: () => import('./../views/reports/PtoTrabReport.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/report_by_user',
          name: 'Reportes Por Usuario',
          component: () => import('./../views/reports/ReportByUser.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'config',
          name: 'Importador de Atencion al cliente',
          component: () => import('./../views/admin/Configurations.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/desicion_matrix',
          name: 'Matriz de Decisión',
          component: () => import('./../views/admin/DesicionMatrix.vue'), meta: { requiresAuth: true }
        },
      ]
    },
    {
      path: '/user',
      name: 'Admin Dashboard',
      redirect: 'login',
      component: DashboardLayout,
      children: [
        {
          path: 'dashboard', name: 'Dashboard', component: () => import('@/views/Dashboard.vue'),
          meta: { requiresAuth: true }
        },
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
          name: 'Reportes avanzados',
          component: () => import('./../views/admin/Reports.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/call-center',
          name: 'Reporte de Call Center por Usuario',
          component: () => import('./../views/reports/ReportCallCenter.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/kit-details',
          name: 'Reporte de Detalle de Equipos',
          component: () => import('./../views/reports/KitDetailsReport.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/general_indicators',
          name: 'Indicadores generales',
          component: () => import('./../views/reports/KitReport.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/expired_orders',
          name: 'Ordenes Vencidas sin Atender',
          component: () => import('./../views/reports/ExpireOrders.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/detail_orders',
          name: 'Detalles de Ordenes',
          component: () => import('./../views/reports/DetailsOrders.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/pto_details_orders',
          name: 'Reporte por Puesto de Trabajo Responsable',
          component: () => import('./../views/reports/PtoTrabReport.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'reports/report_by_user',
          name: 'Reportes Por Usuario',
          component: () => import('./../views/reports/ReportByUser.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'config',
          name: 'Importador de Atencion al cliente',
          component: () => import('./../views/admin/Configurations.vue'), meta: { requiresAuth: true }
        },
        {
          path: 'import-data',
          name: 'Importadores',
          component: () => import('./../views/admin/ImportData.vue'),
          meta: { requiresAuth: true }
        },
      ]
    }
  ]
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
