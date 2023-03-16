import Vue from 'vue'
import VueRouter from 'vue-router'
import CreateView from '../views/CreateView.vue'
import ListPermissionView from '../views/ListPermissionView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ListPermissionView
  },
  {
    path: '/create/:id',
    name: 'create',
    component: CreateView
  },
  {
    path: '/list',
    name: 'list',
    component: ListPermissionView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
