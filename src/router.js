import { createRouter, createWebHistory } from "vue-router"
import Login from "./pages/Login.vue"
import Profile from "./pages/Profile.vue"
import Todos from "./pages/Todos.vue"
import { useAuthStore } from "./stores/auth"

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: { requiresNoAuth: true },
    },
    {
        path: "/profile",
        name: "profile",
        component: Profile,
        meta: { requiresAuth: true },
    },
    {
        path: "/todos",
        name: "todos",
        component: Todos,
        meta: { requiresAuth: true },
    },
    { path: "/", name: "root", redirect: "/todos" },
    { path: "/*", redirect: "/login" },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.isAuthenticated) return "/login"
    if (to.meta.requiresNoAuth && authStore.isAuthenticated) return "/"
    return true
})

export default router
