<script setup>
    import { nextTick, watch, ref, onMounted } from "vue";
    import useSupabase from "../composable/supabase";

    const { getMatch, getSport, getTeam, setMatch, updateMatchScore} = useSupabase();
    
    const listOfMatchs = ref([])
    const listOfTeams = ref([])
    const listOfSports = ref([])

    const matchScore1 = ref({})
    const matchScore2 = ref({})

    onMounted(async () => {
        const match = await getMatch();
        listOfMatchs.value = match;

        const team = await getTeam();
        listOfTeams.value = team;

        const sport = await getSport();
        listOfSports.value = sport;

        for (const match of listOfMatchs.value) {
            matchScore1.value[match.mat_id] = match.mat_score_team_1;
            matchScore2.value[match.mat_id] = match.mat_score_team_2;
        }
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


    function splitSeconds(time){
        const [hours, minutes, seconds] = time.split(":");
        return `${hours}.${minutes}`;
    }

    async function updateMatch_Score(matchId) {
        
        const matchData = {
            mat_score_team_1: matchScore1.value[matchId],
            mat_score_team_2: matchScore2.value[matchId]
        };
        await updateMatchScore(matchId, parseInt(matchData.mat_score_team_1), parseInt(matchData.mat_score_team_2));
    }

</script>

<template>
    <div class="">
        <div v-for="match in listOfMatchs" class="border-2 text-center border-black my-8 rounded-2xl">
            {{ splitSeconds(match.mat_start_time)}} - {{ getSportTeambyId(match.spo_id)}}
            <p></p>
            {{ getNameTeambyId(match.tea_id_1)}} - {{ getNameTeambyId(match.tea_id_2)}}
            <p></p>
            <input class="border-2 text-center border-black rounded-2xl" type="number" v-model="matchScore1[match.mat_id]" @input="updateMatch_Score(match.mat_id)">
            <input class="border-2 text-center border-black rounded-2xl" type="number" v-model="matchScore2[match.mat_id]" @input="updateMatch_Score(match.mat_id)">
            
        </div>
    </div>
</template>