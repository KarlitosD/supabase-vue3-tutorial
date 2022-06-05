<script setup>
import { watch } from "vue"
import { RouterView, useRouter, useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { supabase } from "./supabase"
import { useAuthStore } from "./stores/auth.js"

const router = useRouter()
const route = useRoute()
const { user, isAuthenticated } = storeToRefs(useAuthStore())
user.value = supabase.auth.user()
supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user
    console.log("The state of the session changed")
})


watch(isAuthenticated, newAuthState => {
    if (route.meta.requiresAuth && !newAuthState) 
        router.push("/login")
    if (route.meta.requiresNoAuth && newAuthState)
        router.push("/")
}, { immediate: true })

</script>

<template>
    <div class="container" style="padding: 50px 0 100px 0">
        <RouterView />
    </div>
</template>
