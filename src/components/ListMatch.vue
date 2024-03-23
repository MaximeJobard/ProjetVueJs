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
            if(team.tea_id = id){
                return team.tea_name
            }
        }
    }

</script>

<template>

    <div class="matchs">
        <ul>
            <li v-for="match in listOfMatchs">
                {{ match.mat_score_team_1}}
                <p> pour </p>
                {{ getNameTeambyId(match.tea_id_1)}}
                <br>
                {{ match.mat_score_team_2}}
                <p> pour </p>
                {{ getNameTeambyId(match.tea_id_2)}}
                <br>
                <br>
                <br>
            </li>
        </ul>
    </div>
    <button @click="submitMatch">Create a match</button>
</template>