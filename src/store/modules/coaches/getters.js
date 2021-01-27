export default {
    coaches(state) {
        return state.coaches;
    },
    hasCoaches(state) {
        return state.coaches && state.coaches.length > 0;
    },

    isCoach(state, _, _2, rootGetters) {
        const coaches = state.coaches;
        const userIdentity = rootGetters.userId;
        return coaches.some( coach => coach.id === userIdentity)
    }
}