export default {
    async registerCoach(context, payload) {
        const userId = context.rootGetters.userId;
        const coachData = {
            // id: context.rootGetters.userId,
            firstName: payload.first,
            lastName: payload.last,
            description: payload.desc,
            hourlyRate: payload.rate,
            areas: payload.areas
        }
        
        const response = await fetch(`https://vue-http-project-58e39-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData)
        });

        const responseData = await response.json();
        console.log(responseData);

        if (!response.ok) {
            // 
        }

        context.commit('registerCoach', {
            ...coachData,
            id: userId
        });
    },

    async loadCoaches(context) {
        const response = await fetch('https://vue-http-project-58e39-default-rtdb.firebaseio.com/coaches/.jso');
        const responseData = await response.json();
        console.log(responseData);

        if (!response.ok) {
            const error = new Error(responseData.message || 'Failed to fetch!!');
            throw error;
        }

        const coaches = [];

        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas,
            }
            coaches.push(coach);
        }

        context.commit('setCoaches', coaches);
    }
};