<script setup>
import { RouterLink } from 'vue-router'
import MenuProfileVue from './MenuProfile.vue';
import logoUrl from "../assets/supabase.png"

</script>

<template>
    <header class="header">
        <div>
            <RouterLink :to="{ name: 'root' }">
                <img :src="logoUrl" alt="Logo de supabase" width="50"/>
            </RouterLink>
        </div>
        <div>
            <MenuProfileVue />
        </div>
    </header>
</template>

<style scoped>
.header{
    display: flex;
    padding: 5px 25px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
</style>