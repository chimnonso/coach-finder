import { createStore } from "vuex";
import coachesModule from "./modules/coaches/index.js";
import requestsModule from "./modules/requests/index.js";
import Auth from "./modules/auth/index.js";

const store = createStore({
    modules: {
        coaches: coachesModule,
        requests: requestsModule,
        Auth,
    },
    // state() {
    //     return {
    //         userId: 'c3',
    //     }
    // },
    // getters: {
    //     userId(state) {
    //         return state.userId;
    //     }
    // }
});
export default store;