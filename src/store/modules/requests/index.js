export default {
    namespaced: true,
    state() {
        return {
            requests: []
        }
    },

    mutations: {
        addRequest(state, payload) {
            state.requests.push(payload);
        },
        setRequests(state, payload) {
            state.requests = payload;
        }
    },
    actions: {
        async contactCoach(context, payload) {
            const newRequest = {
                // id: new Date().toISOString(),
                // coachId: payload.coachId,
                userEmail: payload.email,
                message: payload.message,
            };
            const response = await fetch(`https://vue-http-project-58e39-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`, {
                method: 'POST',
                body: JSON.stringify(newRequest)
            });

            const responseData = await response.json()
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to send request!!!');
                throw error;
            }

            console.log(responseData);
            newRequest.id = responseData.name;
            newRequest.coachId = payload.coachId
            context.commit('addRequest', newRequest);
        },

        async fetchRequests(context) {
            const coachId = context.rootGetters.userId;
            const response = await fetch(`https://vue-http-project-58e39-default-rtdb.firebaseio.com/requests/${coachId}.json`)

            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to load requests');
                throw error;
            }

            const requests = [];

            for ( const key in responseData) {
                const request = {
                    id: key,
                    coachId: coachId,
                    userEmail: responseData[key].userEmail,
                    message: responseData[key].message,
                }
                requests.push(request);
            }
            context.commit('setRequests', requests);
        }
    },

    getters: {
        requests(state, _, _2, rootGetters) {
            const coachId = rootGetters.userId;
            return state.requests.filter( req => req.coachId === coachId);
        },

        hasRequests(_, getters) {
            return getters.requests && getters.requests.length > 0;
        }
    }
};