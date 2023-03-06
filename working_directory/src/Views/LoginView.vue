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

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['organizationName', 'userRole', 'organizationId'])
  },
  data() {
    return {
      username: 'editor1',
      password: 'editor1',
    }
  },
  methods: {
    ...mapActions(['login', 'fetchOrganizations']),
    async userLogin() {
      const response = await this.login({ username: this.username, password: this.password })
      if (response.success) {
        console.log('Login successful')
        console.log('Organization Name:', this.organizationName)
        console.log('Organization ID:', this.organizationId)
        console.log('User Role:', this.userRole)
        this.$router.push('/')
        // Save organization and role to session state here
      } else {
        console.log('Login failed:', response.message)
      }
    }
  },
  created() {
    this.fetchOrganizations()
  }
}
</script>

