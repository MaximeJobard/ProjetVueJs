import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ManagementTeam from '../views/ManagementTeamView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      
      path: '/',
      name: 'home',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUpView.vue')
    },
    {
      path:'/managementTeam',
      name:'managementTeam',
      component: ManagementTeam
    }
  ]
})

export default router
