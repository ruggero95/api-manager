import Vue from 'vue'
import VueRouter from 'vue-router'
import { authService } from '@/app/auth/auth.service'
import {store} from "@/app/mystore"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta:{
      requiresAuth:true
    },
    component: () => import('@/my-views/dashboard/Dashboard.vue'),
  },  
 
  {
    path: '/handle-plan',
    name: 'handle-plan',
    component: () => import('@/my-views/pages/plans/AddPlan.vue'),
  },
  {
    path: '/plans/:id',
    name: 'pages-plans',
    meta:{
      requiresAuth:true
    },
    component: () => import('@/my-views/pages/plans/Plan.vue'),
  },
  {
    path: '/login',
    name: 'pages-login',
    component: () => import('@/my-views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
  },  
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/my-views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next)=>{    
  if(to.meta.requiresAuth){
    const login = await authService.checkLoginVue()
    if(!login){
      return next(next({
        path: '/login',
        params: { nextUrl: to.fullPath }
      }))
    }        
  }
  
  if(to.name=='pages-login'){
    const login = await authService.checkLoginVue()
    if(login){
      return next(next({
        path: '/dashboard',
        params: { nextUrl: to.fullPath }
      }))
    } 
    
  } 
  return next()
})

export default router

