let timer;

export default {
    state() {
        return {
            userId: null,
            token: null,
            didAutoLogout: false
        }
    },
    getters: {
        userId(state) {
            return state.userId;
        },
        token(state) {
            return state.token;
        },
        isAuthenticated(state) {
            return !!state.token;
        },
        didAutoLogout(state) {
            return state.didAutoLogout;
        }
    },
    mutations: {
        setUser(state, payload) {
            state.token = payload.token;
            state.userId = payload.userId;
            state.didAutoLogout = false
        },
        setAutoLogout(state) {
            state.didAutoLogout = true;
        }
    },
    actions:{
        async login(context, payload) {
            return context.dispatch('auth', {
                ...payload,
                mode: 'login'
            })
        },
        async signup(context, payload) {
            return context.dispatch('auth', {
                ...payload,
                mode: 'signup'
            })
        },
        tryLogin(context) {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            const tokenExpiration = localStorage.getItem('tokenExpiration');

            const expiresIn = +tokenExpiration - new Date().getTime();

            if (expiresIn < 0) {
                return;
            }

            timer = setTimeout(() => {
                context.dispatch('autoLogout')
            }, expiresIn);

            if (token && userId) {
                context.commit('setUser', {
                    token: token,
                    userId: userId
                });
            }
        },
        async auth(context, payload) {
            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB-Ce7Q2f6jvVhLFKgbXQYgN7ZMHwsyw6M'
            const mode = payload.mode;
            if (mode === 'signup') {
                url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB-Ce7Q2f6jvVhLFKgbXQYgN7ZMHwsyw6M'
            }
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: payload.email,
                    password: payload.password,
                    returnSecureToken: true
                })
            });
            const responseData = await response.json();

            if(!response.ok){
                console.log(responseData);
                const error = new Error(responseData.message || 'Failed to authenticate');
                throw error;
            }
            // const expiresIn = 5000;
            const expiresIn = responseData.expiresIn * 1000;
            const expirationDate = new Date().getTime() + expiresIn;

            localStorage.setItem('token', responseData.idToken);
            localStorage.setItem('userId', responseData.localId);
            localStorage.setItem('tokenExpiration', expirationDate);

            timer = setTimeout(() => {
                context.dispatch('autoLogout');
            }, expiresIn)

            context.commit('setUser', {
                token: responseData.idToken,
                userId: responseData.localId
            })
        },
        logout(context) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('tokenExpiration');
            clearTimeout(timer);
            context.commit('setUser', {
                token: null,
                userId: null,
            })
        },
        autoLogout(context) {
            context.dispatch('logout');
            context.commit('setAutoLogout');
        }
    }
}