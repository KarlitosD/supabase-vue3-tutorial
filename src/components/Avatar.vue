<script setup>
import { ref, toRefs, watch } from "vue"
import { useAuthStore } from "../stores/auth"
import { supabase } from "../supabase"

const props = defineProps({
    path: String
})
const emit = defineEmits(["upload", "update:path"])

const authStore = useAuthStore()
const { path } = toRefs(props)
const size = ref("10em")
const uploading = ref(false)
const src = ref("")
const files = ref([])

async function downloadImage() {
    try {
        const { data, error } = await supabase.storage
            .from("avatars")
            .download(path.value)
        if (error) throw error
        src.value = URL.createObjectURL(data)
    } catch (error) {
        console.error("Error downloading image:", error.message)
    }
}

async function uploadAvatar(event) {
    files.value = event.target.files
    try {
        uploading.value = true
        if (!files.value || files.value.length === 0) {
            throw new Error("You must select an image to upload")
        }
        const file = files.value[0]
        const fileExt = file.name.split(".").at(-1)
        const fileName = `${crypto.randomUUID()}.${fileExt}`
        const { error } = await supabase.storage
            .from("avatars")
            .upload(fileName, file)


        if (error) throw error

        emit("update:path", fileName)
        emit("upload")
    } catch (error) {
        alert(error.message)
    } finally {
        uploading.value = false
    }
}

watch(path, () => {
    path.value && downloadImage()
})
</script>

<template>
    <div>
        <img v-if="src" :src="src" alt="Avatar" class="avatar image" :style="{ height: size, width: size }">
        <div v-else class="avatar no-image" :style="{ height: size, width: size }" />
        <div :style="{ width: size }">
            <label for="single" class="button primary block">
                {{ uploading ? "Uploading" : "Upload Image" }}
            </label>
            <input 
                style="visibility: hidden; position: absolute;" 
                type="file" 
                id="single" 
                aceept="image/*"
                @change="uploadAvatar" 
                :disabled="uploading" 
            />
        </div>
    </div>
</template>