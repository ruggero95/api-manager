<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo_api.png')"
              max-height="50px"
              max-width="50px"
              alt="logo"
              contain
              class="me-3 "
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              Api Manager
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Welcome to Api Manager! 👋🏻
          </p>
          <p class="mb-2">
            Please sign-in to your account and start the adventure
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
        
          <ShowMessage  v-if="this.showMessage" :type="this.typeLogin" :message="this.loginMessage"></ShowMessage>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="username"
              outlined
              label="Username"
              placeholder="mario.rossi"
              hide-details
              autocomplete="username"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              autocomplete="new-password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              hide-details
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            
            <v-btn
              block
              color="primary"
              class="mt-6"
              type="submit"
              :loading="this.loading"
            >
              Enter
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
         
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark':'light'}.png`)"
    >

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { authApi } from '@/app/auth/auth.api'
import { store } from "@/app/mystore"
import router from "@/router/index"
import ShowMessage from "@/my-components/showMessage.vue"
export default {
  components:{
    ShowMessage
  },
  data(){
    return {
      localStore:store,
      loginMessage:'',
      showMessage:false,
      typeLogin:'',
      username:'',
      password:'',
      loading:false
    }
  },
  methods:{
    async login(){  
      this.loading = true    
      this.typeLogin="success"
      this.showMessage = false
      try{
        if(this.username!='' && this.password!=''){
          await authApi.login(this.username, this.password)
          this.loginMessage = 'Login Successful'
          this.showMessage = true
          setTimeout(()=>{
            this.$router.push('/dashboard')
          },1000)
        }
      }catch(e){
        this.showMessage = true
        
        this.loginMessage = e.message
        this.typeLogin="error"

      }
      this.loading = false
    }
  },
  setup() {
    const isPasswordVisible = ref(false)
  
    return {
      isPasswordVisible,
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
