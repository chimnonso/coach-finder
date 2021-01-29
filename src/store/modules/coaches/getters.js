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
    },
    shouldUpdate(state) {
        const lastFetch = state.lastFetch;
        if (!lastFetch) {
            return true;
        }

        const curTime = new Date().getTime();
        return (curTime - lastFetch) / 1000 > 60;
    }
}