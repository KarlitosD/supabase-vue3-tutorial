import { defineStore } from "pinia"
import { supabase } from "../supabase"
// import { useRouter } from "vue-router"

export const useAuthStore = defineStore("auth",{
    state: () => ({
        user: null,
        profile: {
            username: "",
            website: "",
            avatar_url: ""
        },
        loading: false
    }),
    getters: {
        isAuthenticated() {
            return this.user !== null
        },
    },
    actions: {
        async signIn({ email }){
            try {
                this.loading = true
                const { error } = await supabase.auth.signIn({ email })
                if(error) throw error
                alert("Check your email for a verification link")
            } catch (error) {
                console.error(error)
                alert(error.error_description || error.message)
            } finally {
                this.loading = false
            }
        },
        async signOut(){
            try {
                this.loading = true
                const { error } = await supabase.auth.signOut()
                this.user = null
                if(error) throw error
             } catch (error) {
                console.error(error)
                alert(error.message)
             } finally {
                this.loading  = false
             }
        },
        async getProfile(){
            try {
                this.loading = true
                // Obtener usuario de supabase
                this.user = await supabase.auth.user()
                
                // Hacer una consulta a la base de datos
                const { data, error, status } = await supabase
                        .from("profiles")
                        .select("username, website, avatar_url")
                        .eq("id", this.user?.id)
                        .single()
        
                if(error && status !== 406) throw error
        
                if(data){
                    this.profile.username = data.username
                    this.profile.website = data.website
                    this.profile.avatar_url = data.avatar_url
                }
            } catch (error) {
                console.error(error.message)
                alert(error.message)
            } finally {
                this.loading = false
            }
        },
        async updateProfile({ username, website, avatar_url }) {
            try {
                this.loading = true
                this.user = supabase.auth.user()
                username = username || this.user.email.split("@")[0]
                website = website || "www.website.com"
                const updates = { 
                    id: this.user.id,
                    username,
                    website,
                    avatar_url,
                    updated_at: new Date(), 
                }
                const { error } = await supabase.from("profiles").upsert(updates, {
                    returning: "minimal"
                })
                                            
                if(error) throw error
            } catch (error) {
                console.error(error.message || error)
                alert(error.message || error)
            } finally {
                this.loading = false
            }
        }
    }
})

