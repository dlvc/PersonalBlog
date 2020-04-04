import Vue from 'vue'
import VueRouter from 'vue-router'
import DefaultPage from '../layout/Default.vue'
import BlankPage from '../layout/Blank.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    component: DefaultPage,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/About.vue')
      },
      {
        path: '/guestbook',
        name: 'guestbook',
        component: () => import('../views/GuestBook.vue')
      },
      {
        path: '/blogDetail',
        name: 'blogDetail',
        component: () => import('../views/BlogDetail.vue')
      }
    ]
  },
  {
    path: '/blank',
    name: 'blank',
    component: BlankPage,
    children: [
      {
        path: '/sitemap',
        name: 'sitemap',
        component: () => import('../views/SiteMap.vue')
      },
      {
        path: '/editBlog',
        name: 'editBlog',
        component: () => import('../views/EditBlog.vue')
      },
      {
        path: '/editEveryday',
        name: 'editEveryday',
        component: () => import('../views/EditEveryday.vue')
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
