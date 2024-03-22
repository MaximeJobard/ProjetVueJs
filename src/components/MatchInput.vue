<script setup>
    import { nextTick, watch, ref, onMounted } from "vue";
    import useSupabase from "../composable/supabase";

    const { getTeam, getSport, setMatch } = useSupabase();
    
    const listOfTeams = ref([])
    const listOfSports = ref([])

    onMounted(async () => {
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
        const matchData = {
            mat_start_time: matchTime.value,
            spo_id: selectedSport.value,
            tea_id_1: team1.value,
            tea_id_2: team2.value
        };
        setMatch(matchData);
    }
</script>

<template>

    <div class="match">
        <select name="Team 1">
            <option v-for="team in listOfTeams" :key=team.tea_id>
                {{ team.tea_name }}
            </option>
        </select>
        <select name="Team 2">
            <option v-for="team in listOfTeams" :key=team.tea_id>
                {{ team.tea_name }}
            </option>
        </select>
        <select name="Sport">
            <option v-for="sport in listOfSports" :key=sport.spo_id>
                {{ sport.spo_name }}
            </option>
        </select>
        <input type="time" class="text-black" placeholder="Temps"></input>
    </div>
    <button @click="submitMatch">Create the match</button>
</template>