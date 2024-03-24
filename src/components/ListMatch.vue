<script setup>
    import { nextTick, watch, ref, onMounted } from "vue";
    import useSupabase from "../composable/supabase";

    const { getMatch, getSport, getTeam } = useSupabase();
    
    const listOfMatchs = ref([])
    const listOfTeams = ref([])
    const listOfSports = ref([])

    onMounted(async () => {
        const match = await getMatch();
        listOfMatchs.value = match;

        const team = await getTeam();
        listOfTeams.value = team;

        const sport = await getSport();
        listOfSports.value = sport;
    });

    function getNameTeambyId(id){
        for(const team of listOfTeams.value){
            if(team.tea_id === id){
                return team.tea_name
            }
        }
        return "Team not found"
    }

    function getSportTeambyId(id){
        for(const sport of listOfSports.value){
            if(sport.spo_id === id){
                return sport.spo_name
            }
        }
        return "Sport not found"
    }

</script>

<template>

    <div class="matchs">
        <p>Matchs</p>
        <div v-for="match in listOfMatchs">
            {{ match.mat_start_time}} - {{ getSportTeambyId(match.spo_id)}}
            <p></p>
            {{ getNameTeambyId(match.tea_id_1)}} - {{ getNameTeambyId(match.tea_id_2)}}
            <p></p>
            {{ match.mat_score_team_1}} - {{ match.mat_score_team_2}}
            <br>
            <br>
        </div>
    </div>
</template>