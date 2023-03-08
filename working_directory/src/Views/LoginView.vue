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
</template>

<script>
import { mapActions, mapState } from 'vuex'
import forProfessor from '../components/forProfessor.vue'

export default {
  components: {
    forProfessor
  },
  computed: {
    ...mapState(['organizationName', 'userRole', 'organizationId', 'organizationServices', 'organizations', 'loggedIn'])
  },
  data() {
    return {
      username: '',
      password: '',
      showLoginInfo: false
    }
  },
  methods: {
    ...mapActions(['login', 'fetchOrganizations']),
    toggleLoginModal() {
      this.showLoginInfo = !this.showLoginInfo
    },
    async userLogin() {
      const response = await this.login({ username: this.username, password: this.password })
      if (response.success) {
        this.modalLoginSuccess = true
        this.$router.push('/dashboard')
        // Save organization and role to session state here
      } else {
        alert('Login Failed')
        console.log('Login failed:', response.message)
      }
    }
  },
  created() {
    if (!this.userRole && !this.loggedIn) {
      this.fetchOrganizations()
    }
  }
}
</script>

