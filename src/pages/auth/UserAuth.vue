<template>
    <div>
    <base-dialog :show="!!error" title="Oops" @close="handleError">
        <p>{{ error }}</p>
    </base-dialog>
    <base-dialog :show="isLoading" fixed title="Authenticating...">
        <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
    <form @submit.prevent="submitForm">
        <div class="form-control">
            <label for="email">E-mail</label>
            <input type="email" id="email" v-model.trim="email">
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input type="password" id="password" v-model.trim="password">
        </div>
        <p v-if="!formIsValid">Invalid details</p>
        <base-button>{{ switchButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{ switchModeButtonCaption }}</base-button>
    </form>
    </base-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            formIsValid: true,
            mode: 'login',
            error: null,
            isLoading: false,
        };
    },
    computed: {
        switchButtonCaption() {
            if (this.mode === 'login') {
                return 'Login';
            } else {
                return 'Signup';
            }
        },
        switchModeButtonCaption() {
            if (this.mode === 'login') {
                return 'Signup instead';
            } else {
                return 'Login instead';
            }
        }
    },
    methods: {
        handleError() {
            this.error = null;
        },
        async submitForm() {
            this.formIsValid = true;
            if (this.email === '' || !this.email.includes('@') || this.password.length < 5) {
                this.formIsValid = false;
                return;
            }
            this.isLoading = true;
            const actionPayload = {
                email: this.email,
                password: this.password,
            }
            try {
                if (this.mode === 'login') {
                    await this.$store.dispatch('login', actionPayload) 
                } else {
                    await this.$store.dispatch('signup', actionPayload)
                }
                const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
                console.log(this.$route);
                this.$router.replace(redirectUrl);
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
        },
        switchAuthMode() {
            if (this.mode === 'login') {
                this.mode = 'signup';
            } else {
                this.mode = 'login';
            }
        }
    }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

</style>