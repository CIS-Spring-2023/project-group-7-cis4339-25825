//import router functionality
import { createRouter, createWebHistory } from 'vue-router'
// import store functionality
import store from '../store/newindex.js';

// make all paths and names lowercase for consistency
const routes = [
  // route to login view - also the root view
  {
    path: '/',
    props: true,
    component: () => import('../Views/NewLoginView.vue')
  },
  // route to the client intake form - only appears for users with "editor" role
  {
    path: '/intakeform',
    name: 'intakeform',
    props: true,
    component: () => import('../Views/NewClientIntakeForm.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role || !store.state.role === 'editor') {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to the the find client view
  {
    path: '/findclient',
    name: 'findclient',
    component: () => import('../Views/NewFindClient.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role) {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to the update client view - props are accepted to render the clients info on the form - appears for users with role "editor" and not "viewer"
  {
    path: '/updateclient/:id',
    name: 'updateclient',
    props: true,
    component: () => import('../Views/UpdateClient.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role) {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to the view client view - props are accepted to render the clients info on the form - appears for users with role "viewer" and not "editor"
  {
    path: '/viewclient/:id',
    name: 'viewclient',
    props: true,
    component: () => import('../Views/NewViewClient.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role || !store.state.role === 'viewer') {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to the create event form - appears only for users with role "editor"
  {
    path: '/eventform',
    name: 'eventform',
    component: () => import('../Views/NewCreateEvent.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role || !store.state.role === 'editor') {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to the create service form - appears only for users with role "editor"
  {
    path: '/serviceform',
    name: 'serviceform',
    component: () => import('../Views/NewCreateService.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role || !store.state.role === 'editor') {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to the find events view
  {
    path: '/findevents',
    name: 'findevents',
    component: () => import('../Views/NewFindEvent.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role) {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to the update event form - appears only for users with role "editor"
  {
    path: '/eventdetails/:id',
    name: 'eventdetails',
    props: true,
    component: () => import('../Views/EventDetails.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role) {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to the view event view - appears only for users with role "viewer"
  {
    path: '/viewevent/:id',
    name: 'viewevent',
    props: true,
    component: () => import('../Views/ViewEvent.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role || !store.state.role === 'viewer') {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to dashboard that shows list of events, bar chart, and pie chart
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../Views/NewHomeView.vue')
  },
  // route to find service view
  {
    path: '/findservice',
    name: 'findservice',
    component: () => import('../Views/NewFindService.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role) {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to update service view - appears only for users with role "editor"
  {
    path: '/servicedetails/:id',
    name: 'servicedetails',
    props: true,
    component: () => import('../Views/ServiceDetails.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role) {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  // route to view service view - appears only for users with role "viewer"
  {
    path: '/viewservice/:id',
    name: 'viewservice',
    props: true,
    component: () => import('../Views/ViewService.vue'),
    //if page is accessed without logging in, this routes to 404 Not Found page
    beforeEnter: (to, from, next) => {
      if (!store.state.role || !store.state.role === 'viewer') {
        // redirect to 404 page if user is not logged in
        next('/404notfound')
      } else {
        // continue to the requested route if user is logged in
        next()
      }
    }
  },
  //route to 404 not found view
  {
    path: '/404notfound',
    name: '404notfound',
    component: () => import('../Views/404NotFound.vue')
  }
]
//create router instance
const router = createRouter({
  history: createWebHistory(),
  routes
})
//allow other components to use router functionality
export default router
