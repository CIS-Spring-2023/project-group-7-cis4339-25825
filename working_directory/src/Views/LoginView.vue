<template>
    <div>
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Login</h1>
      <br>
      <form class="flex flex-col items-center" @submit.prevent="userLogin">
        <label class="text-2xl font-bold">
          Username:
          <input type="text" v-model="username" required class="w-80 p-2 border border-gray-400 rounded">
        </label>
        <br>
        <label class="text-2xl font-bold">Password:
          <input type="password" v-model="password" required class="w-80 p-2 border border-gray-400 rounded">
        </label>
        <br>
        <button class="bg-red-700 text-white rounded" type="submit">Login</button>
      </form>

    <button @click="toggleLoginModal">Click Me for Login Info</button>

    <forProfessor v-if="showLoginInfo" @close="toggleLoginModal"/>

    </div>

    <div style="display: flex; justify-content: center;">
      <modalComponent v-if="showLoginSuccess" @close="loginPush">
        <template v-slot:loginSuccess>
          Login Success!
          <p>Welcome {{ username }}</p>
        </template>
      </modalComponent>
    </div>
    <div style="display: flex; justify-content: center;">
      <modalComponent v-if="showLoginFailed" @close="loginFail">
        <template v-slot:loginSuccess>
          Login Failed
          <p>Please try again</p>
        </template>
      </modalComponent>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import forProfessor from '../components/forProfessor.vue'
import modalComponent from '../components/modalComponent.vue'

export default {
  components: {
    forProfessor,
    modalComponent
  },
  computed: {
    ...mapState(['organizationName', 'userRole', 'organizationId', 'organizationServices', 'organizations', 'loggedIn', 'userName'])
  },
  data() {
    return {
      username: 'editor1',
      password: 'editor1',
      showLoginInfo: false,
      showLoginSuccess: false,
      showLoginFailed: false,
      organization: null,
      user: null
    }
  },
  methods: {
    ...mapActions(['login', 'initializeUser']),
      async userLogin() {
        const { success, organization, user } = await this.login({ username: this.username, password: this.password })
        if (success) {
          this.showLoginSuccess = true
          this.organization = organization
          this.user = user
        } else {
          this.showLoginFailed = true
          console.log('Login failed')
        }
      },
      async loginPush() {
        await this.initializeUser({ organization: this.organization, user: this.user })        
        this.$router.push('/dashboard')
      },
    loginFail() {
      this.showLoginFailed = false
    }
  },
  // created() {
  //   if (!this.userRole && !this.loggedIn) {
  //     this.fetchOrganizations()
  //   }
  // }
}
</script>

