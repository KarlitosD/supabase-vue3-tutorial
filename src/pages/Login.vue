<script setup>
import { ref } from "vue"
import { useAuthStore } from "../stores/auth"
import { useRouter } from "vue-router"

const router = useRouter()
const email = ref("")
const authStore = useAuthStore()

// if (authStore.isAuthenticated) { router.push("/profile") }

async function handleLogin () {
  await authStore.signIn({ email: email.value })
}

</script>

<template>
    <form class="row flex flex-center" @submit.prevent="handleLogin">
        <div class="col-6 form-widget">
            <h1 class="header">Supabase + Vue 3</h1>
            <p class="description">Sign in via magic link with your mail below</p>
            <div>
                <input type="email" class="inputField" placeholder="Your Email" v-model="email">
            </div>
            <div>
                <button class="button block" :disabled="authStore.loading">
                    {{authStore.loading ? "Loading" : "Send Magic link" }}
                </button>
            </div>
        </div>
    </form>
</template>
<!-- <template>
    <h1>Login</h1>
</template> -->
