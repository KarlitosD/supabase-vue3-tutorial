<script setup>
import { useTodosStore } from "../stores/todos"
import Header from "../components/Header.vue";

const todosStore = useTodosStore()

async function handleSubmit({ target }) {
    await todosStore.addTodo({ title: target.title.value })
    target.reset()
}
</script>

<template>
    <Header />
    <h1>Todos</h1>
    <form class="form-widget" @submit.prevent="handleSubmit">
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" name="title" required>
        </div>
        <div>
            <button class="button block" :disabled="todosStore.loading" >
                {{ todosStore.loading ? "Loading" : "Add todo" }}
            </button>
        </div>
    </form>
    <div class="todos">
        <div v-for="todo in todosStore.todos" class="todo" :key="todo.id">
            <div class="flex">
                <input class="checkbox" type="checkbox" v-model="todo.completed" @change="todosStore.toggleCompleted(todo)">
                <span>{{ todo.title }}</span>   
            </div>
            <div>
                <button class="button-red" @click="todosStore.deleteTodo(todo.id)">X</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.todos {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.todo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    width: 80%;
}

.todo .flex {
    gap: 1rem;
    align-items: center;
    font-weight: bold;
    font-size: 1.1rem;
}

.todo span{
    align-self: flex-start;
}

.checkbox {
    background-color: transparent;
    accent-color: rgb(54, 165, 255);
    align-self: flex-end;
    cursor: pointer;
}

.button-red {
    background-color: tomato;
    color: white;
    padding: 5px 10px;
    border: none;
}

</style>