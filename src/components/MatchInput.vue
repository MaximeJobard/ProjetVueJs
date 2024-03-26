<script setup>
    import { ref, onMounted, getCurrentInstance } from "vue";
    import useSupabase from "../composable/supabase";

    const { getTeam, getSport, getMatch, setMatch, supabase } = useSupabase();

    const { emit } = getCurrentInstance();
    
    const listOfMatchs = ref([])
    const listOfTeams = ref([])
    const listOfSports = ref([])

    //rempli les différentes listes
    onMounted(async () => {
        const match = await getMatch();
        listOfMatchs.value = match;

        const team = await getTeam();
        listOfTeams.value = team;

        const sport = await getSport();
        listOfSports.value = sport;
    });

    const team1 = ref(null);
    const team2 = ref(null);
    const selectedSport = ref(null);
    const matchTime = ref("");


    async function submitMatch() {
        console.log(team1)
        console.log( getTeamIdByName(team1.value))
        const matchData = {
            mat_id: getNewId(),
            mat_start_time: matchTime.value.toString(),
            spo_id: getSportIdByName(selectedSport.value),4
            tea_id_1: getTeamIdByName(team1.value),
            tea_id_2: getTeamIdByName(team2.value)
        }
        await setMatch(matchData);

        emit('close')
    }

    function getSportIdByName(sportName) {
        const sport = listOfSports.value.find(sport => sport.spo_name === sportName);
        return sport ? sport.spo_id : null;
    }

    function getTeamIdByName(teamName) {
        const team = listOfTeams.value.find(team => team.tea_name === teamName);
        return team ? team.tea_id : null;
    }

    function getNewId(){
        let compt = 0;
        for(const match of listOfMatchs.value){
            if(match.mat_id > compt){
                compt = match.mat_id;
            }
        }
        return compt + 1;
    }


</script>

<template>

    <div class="match">
        <select name="Team 1" v-model="team1">
            <option v-for="team in listOfTeams" :key=team.tea_id>
                {{ team.tea_name }}
            </option>
        </select>
        <select name="Team 2" v-model="team2">
            <option v-for="team in listOfTeams" :key=team.tea_id>
                {{ team.tea_name }}
            </option>
        </select>
        <select name="Sport" v-model="selectedSport">
            <option v-for="sport in listOfSports" :key=sport.spo_id>
                {{ sport.spo_name }}
            </option>
        </select>
        <input type="time" class="text-black" placeholder="Temps" v-model="matchTime"></input>
    </div>
    <button @click="submitMatch">Create the match</button>
</template>