<script setup>
import { ref } from "vue"
import Avatar from "../components/Avatar.vue"
import { useAuthStore } from "../stores/auth"
import Header from "../components/Header.vue";

const authStore = useAuthStore()
const { getProfile, signOut } = authStore
const username = ref("")
const website = ref("")
const avatarUrl = ref("")

async function updateProfile () {
  await authStore.updateProfile({
    username: username.value,
    website: website.value,
    avatar_url: avatarUrl.value
  })
}

getProfile().then(() => {
    username.value = authStore.profile.username
    website.value = authStore.profile.website
    avatarUrl.value = authStore.profile.avatar_url
})
</script>

<template>
    <Header />
    <form class="form-widget" @submit.prevent="updateProfile">
        <Avatar v-model:path="avatarUrl" @upload="updateProfile" />
        <div>
            <label for="email">Email</label>
            <input type="text" id="email" :value="authStore.user?.email" disabled>
        </div>
        <div>
            <label for="username">Name</label>
            <input type="text" id="username" v-model="username" required>
        </div>
        <div>
            <label for="website">Website</label>
            <input type="website" id="website" v-model="website" required>
        </div>
        <div>
            <input
                type="submit"
                :value="authStore.loading ? 'Loading' : 'Update'"
                :disabled="authStore.loading"
                class="button block primary"
            >
        </div>

        <div>
            <button class="button block" @click="signOut" :disabled="authStore.loading">
                Sign Out
            </button>
        </div>
    </form>
</template>

