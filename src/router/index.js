import { createRouter, createWebHistory } from 'vue-router'
import Rankings from '../views/Rankings.vue'
import ManagementTeam from '../views/ManagementTeamView.vue'
import CreateMatch from '../views/CreateMatchView.vue'
import useSupabase from "@/composable/supabase.js";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/SignInView.vue')
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/rankings', 
      name: 'rankings',
      component: Rankings
    },
    {
      path:'/managementTeam',
      name:'managementTeam',
      component: ManagementTeam,
      meta:{'protected' : true}
    },
    {
      path:'/createMatch',
      name:'createMatch',
      component: CreateMatch,
      meta:{'protected' : true}
    }
  ]
})

const {isLoggedIn} = useSupabase()

router.beforeEach(async(to, from) =>{
    if(to.meta.protected){
        const isLogged = await isLoggedIn()
        if(isLogged){
            return true
        }else{
            return "/"
        }
    }
})

export default router
