import { createRouter, createWebHistory } from 'vue-router'

// make all paths and names lowercase for consistency
const routes = [
  {
    path: '/',
    props: true,
    component: () => import('../Views/LoginView.vue')
  },
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../Views/ClientIntakeForm.vue')
  },
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../Views/FindClient.vue')
  },
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../Views/UpdateClient.vue')
  },
  {
    path: '/viewclient/:id',
    name: 'viewclient',
    props: true,
    component: () => import('../Views/ViewClient.vue')
  },
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../Views/CreateEvent.vue')
  },
  {
    path: '/serviceform',
    name: 'serviceform',
    component: () => import('../Views/CreateService.vue')
  },
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../Views/FindEvent.vue')
  },
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../Views/EventDetails.vue')
  },
  {
    path: '/viewevent/:id',
    name: 'viewevent',
    props: true,
    component: () => import('../Views/ViewEvent.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../Views/HomeView.vue')
  },
  {
    path: '/findservice',
    name: 'findservice',
    component: () => import('../Views/FindService.vue')
  },
  {
    path: '/servicedetails/:id',
    name: 'servicedetails',
    props: true,
    component: () => import('../Views/ServiceDetails.vue')
  },
  {
    path: '/viewservice/:id',
    name: 'viewservice',
    props: true,
    component: () => import('../Views/ViewService.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
