/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
const route = {
  admin_routes : [
    {
      to: '/admin/dashboard',
      icon: 'ni ni-tv-2  text-pepsi-primary',
      text: 'Dashboard'
    },
    {
      to: '/admin/user-list',
      icon: 'ni ni-circle-08 text-pepsi-primary',
      text: 'Usuarios en el Sistema'
    },
    {
      to: '/admin/instalations',
      icon: 'ni ni-bullet-list-67 text-pepsi-primary',
      text: 'Instalaciones'
    },
    {
      to: '/admin/import-data',
      icon: 'ni ni-archive-2 text-pepsi-primary',
      text: 'Importadores'
    },
    {
      to: '/admin/reports',
      icon: 'ni ni-chart-bar-32 text-pepsi-primary',
      text: 'Reportes'
    },
    {
      to: '/admin/config',
      icon: 'ni ni-settings-gear-65 text-pepsi-primary',
      text: 'Configuraciones'
    },
  ],
  user_route: [
    {
      to: '/user/dashboard',
      icon: 'ni ni-tv-2  text-pepsi-primary',
      text: 'Dashboard'
    },
    {
      to: '/user/report_calls',
      icon: 'mdi-view-dashboard',
      text: 'Reporte de Operador'
    },
    {
      to: '/user/instalations',
      icon: 'mdi-view-dashboard',
      text: 'Instalaciones'
    },
    {
      to: '/user/reports',
      icon: 'mdi-adjust',
      text: 'Reportes'
    },
  ]
}
  
 

export default route;