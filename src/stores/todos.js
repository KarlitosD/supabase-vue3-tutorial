import { ref, onUnmounted } from "vue"
import { defineStore } from "pinia"
import { supabase } from "../supabase"
import { useAuthStore } from "./auth"

export const useTodosStore = defineStore("todos", () => {
    const authStore = useAuthStore()
    const todos = ref([])
    const loading = ref(false)

    async function getTodos() {
        try {
            loading.value = true
            const { data, error, status } = await supabase.from("todos").select("*").eq("user_id", authStore.user?.id).order('created_at', { ascending: false })
            if (error && status !== 406) throw error
            if (data) {
                todos.value = data
            }
        } catch (error) {
            console.error(error.message)
            alert(error.message)
        } finally {
            loading.value = false
        }
    }

    async function addTodo({ title }) {
        try {
            loading.value = true
            const { error } = await supabase.from("todos").insert({
                title,
                user_id: authStore.user?.id,
            })
            if (error) throw error
            // await getTodos()
        } catch (error) {
            console.error(error.message)
            alert(error.message)
            loading.value = false
        } 
        // finally {
        //     loading.value = false
        // }
    }

    async function toggleCompleted({ id, completed }) {
        try {
            loading.value = true
            const { data, error } = await supabase.rpc("toggle_completed", { id, completed })
            if (error) throw error
            // todos.value = data
        } catch (error) {
            console.error(error.message)
            alert(error.message)
            loading.value = false
        } 
        // finally {
        //     loading.value = false
        // }
    }

    async function deleteTodo(id) {
        try {
            loading.value = true
            const { error } = await supabase.from("todos").delete().match({ id })
            if (error) throw error
            // await getTodos()
        } catch (error) {
            console.error(error.message)
            alert(error.message)
            loading.value = false
        } 
        // finally {
        //     loading.value = false
        // }
    }

    const mySubscription = supabase
        .from('todos')
        .on('*', getTodos)
        .subscribe()

    onUnmounted(() => supabase.removeAllSubscriptions())


    getTodos()
    return {
        todos,
        loading,
        addTodo,
        toggleCompleted,
        deleteTodo
    }
})
