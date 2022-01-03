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
          <v-form>
            <v-text-field
              v-model="username"
              outlined
              label="Username"
              placeholder="mario.rossi"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
             

              <!-- forgot link -->
              
            </div>

            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="login()"
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
import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
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
      password:''
    }
  },
  methods:{
    async login(){      
      this.typeLogin="success"
      this.showMessage = false
      try{
        if(this.username!='' && this.password!=''){
          await authApi.login(this.username, this.password)
          this.loginMessage = 'Login Successful'
          this.showMessage = true
          setTimeout(function(){
            router.push('/dashboard')
          },1000)
        }
      }catch(e){
        this.showMessage = true
        this.loginMessage = e.message
        this.typeLogin="error"
        alert('error')

      }
    }
  },
  setup() {
    const isPasswordVisible = ref(false)
    const email = ref('')
    const password = ref('')
    const socialLink = [
      {
        icon: mdiFacebook,
        color: '#4267b2',
        colorInDark: '#4267b2',
      },
      {
        icon: mdiTwitter,
        color: '#1da1f2',
        colorInDark: '#1da1f2',
      },
      {
        icon: mdiGithub,
        color: '#272727',
        colorInDark: '#fff',
      },
      {
        icon: mdiGoogle,
        color: '#db4437',
        colorInDark: '#db4437',
      },
    ]

    return {
      isPasswordVisible,
      email,
      password,
      socialLink,

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
