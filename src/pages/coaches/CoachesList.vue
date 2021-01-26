<template>
    <section>
        <h1>Filter coaches</h1>
    </section>
    <section>
        <div class="control">
            <button>refesh</button>
            <router-link to="/register">Register a Coach</router-link>
        </div>
        <ul v-if="hasCoaches">
            <coach-item v-for="coach in filteredCoaches" 
                :key="coach.id"
                :id="coach.id"
                :firstName="coach.firstName"
                :lastName="coach.lastName"
                :rate="coach.hourlyRate"
                :areas="coach.areas">
            </coach-item>
        </ul>
        <h3 v-else>No Coaches Found</h3>
    </section>
</template>

<script>
import CoachItem from "../../components/coaches/CoachItem.vue";
export default {
    components: {
        CoachItem,
    },
    computed: {
        filteredCoaches() {
            return this.$store.getters['coaches/coaches'];
        },
        hasCoaches() {
            return this.$store.getters['coaches/hasCoaches'];
        }
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
