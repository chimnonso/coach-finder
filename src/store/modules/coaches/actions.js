export default {
    registerCoach(context, payload) {
        console.log(context);
        const coachData = {
            id: context.rootGetters.userId,
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas
        }
        console.log(coachData);
        context.commit('registerCoach', coachData);
    }
};