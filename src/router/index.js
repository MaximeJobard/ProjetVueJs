import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ManagementTeam from '../views/ManagementTeamView.vue'
import CreateMatch from '../views/CreateMatchView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      
      path: '/',
      name: 'SignIn',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/managementTeam',
      name:'managementTeam',
      component: ManagementTeam
    },
    {
      path:'/createMatch',
      name:'createMatch',
      component: CreateMatch
    }
  ]
})

export default router
