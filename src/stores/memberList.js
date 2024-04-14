import { reactive } from 'vue'
import useSupabase from "../composable/supabase";

const {getUserId, getUserTeam, teamMember} = useSupabase();

export const teamMembersStore = reactive({
  listMembers: [],

  remove(mem_first_name, mem_last_name){
    this.listMembers = this.listMembers.filter((member)=>{
        return  member['mem_last_name']!=mem_last_name && member['mem_first_name']!=mem_first_name;
    });
  },

  add(mem_first_name, mem_last_name){
    this.listMembers.push({mem_last_name: mem_last_name, mem_first_name: mem_first_name})
  }

})