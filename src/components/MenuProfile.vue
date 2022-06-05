<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { supabase } from '../supabase'
import { useAuthStore } from '../stores/auth'
import grayUrl from '../assets/gray.jpg'

const authStore = useAuthStore()
const avatarSrc = ref(grayUrl)
const isOpenMenu = ref(false)

const toggleOpen = () => isOpenMenu.value = !isOpenMenu.value
async function getImageProfile(){
    const { data, error } = await supabase
        .storage
        .from('avatars')
        .download(authStore.profile.avatar_url)
    if(error) throw error
    avatarSrc.value = URL.createObjectURL(data)
}
authStore.getProfile().then(getImageProfile)

</script>

<template>
    <div class="profile-menu">
        <img :src="avatarSrc" class="profile-avatar" @click="toggleOpen">
        <div class="menu" :class="{ hidden: !isOpenMenu }">
            <RouterLink :to="{ name: 'profile' }" class="menu-item">Profile</RouterLink>
            <button class="menu-item" @click="authStore.signOut">Log Out</button>
        </div>
    </div>
   
</template>

<style scoped>
.profile-menu{
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.profile-avatar{
    width: 50px;
    height: 50px;
    border: 1px solid white;
    border-radius: 50%;
    cursor: pointer;
}

.menu{
    z-index: 2;
    position: absolute;
    top: 55px;
    border-radius: 10px;
}
.menu::before{
/* arrow to top */
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid white;
}

.menu-item{
    display: inline-block;
    width: 90px;
    font-size: 1rem;
    text-align: center;
    text-decoration: none;
    text-transform: none;
    color:black;
    cursor: pointer;
    background-color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid rgb(139, 139, 139);
    margin: 0 auto;
}
.menu-item:hover{
    background-color: rgb(235, 235, 235);
}

.menu-item:first-child{
    border-radius: 5px 5px 0 0;
}

.menu-item:last-child{
    border-bottom: none;
    border-radius: 0 0 5px 5px;
}

</style>

