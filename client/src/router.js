import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/addArticle',
          name: 'addArticle',
          component: () => import('./components/AddArticle.vue')
        },
        {
          path: '/article/:id',
          name: 'detailArticle',
          component: () => import('./components/DetailArticle.vue')
        },
        {
          path: '/delete/article/:id',
          name: 'deleteArticle',
        },
        {
          path: '/edit/article/:id',
          name: 'editArticle',
          props:true,
          component: () => import('./components/EditArticle.vue')
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/navbar',
      name: 'navbar',
      component: () => import('./components/NavBar.vue')
    },
  ]
})
