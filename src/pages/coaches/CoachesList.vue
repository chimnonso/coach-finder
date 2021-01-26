<template>
    <section>
        <h1>Filter coaches</h1>
    </section>
    <section>
        <base-card>
            <div class="control">
                <base-button  mode="outline">refesh</base-button>
                <base-button link to="/register">Register a Coach</base-button >
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
        </base-card>
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
