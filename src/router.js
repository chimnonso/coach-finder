import { createRouter, createWebHistory } from "vue-router";
import CoachesList from "./pages/coaches/CoachesList.vue";
import CoachDetail from "./pages/coaches/CoachDetail.vue";
import CoachRegistration from "./pages/coaches/CoachRegistration.vue";
import ContactCoach from "./pages/requests/ContactCoach.vue";
import RequestsReceived from "./pages/requests/RequestsReceived.vue";
import NotFound from "./pages/NotFound.vue";
import UserAuth from "./pages/auth/UserAuth.vue";
import store from "./store";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/coaches' },
        { path: '/coaches', component: CoachesList },
        { 
          path: '/coaches/:id', 
          props: true,
          component: CoachDetail,
          children: [
              { path: 'contact', component: ContactCoach, props: true }
          ]
        },
        { path: '/register', component: CoachRegistration, meta: { requiresAuth: true} },
        { path: '/requests', component: RequestsReceived, meta: { requiresAuth: true} },
        { path: '/auth', component: UserAuth, meta: { requiresUnauth: true}},
        { path: '/:notFound(.*)', component: NotFound },
    ]
})

router.beforeEach((to, _, next) => {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/coaches');
    } else {
        next();
    }
})

export default router;