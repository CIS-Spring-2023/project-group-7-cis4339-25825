<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <li v-if="!$store.state.userRole">
              <router-link to="/">
                <span
                  style="position:relative; top: 6px"
                  class="material-icons"
                >login</span>
                Login
              </router-link>
            </li>
            <li v-if="$store.state.userRole" @click.prevent="logout" style="cursor: pointer;">
                <span
                  style="position:relative; top: 6px"
                  class="material-icons"
                >logout</span>
                Logout
            </li>
            <li>
              <router-link to="/dashboard">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >dashboard</span
                >
                Dashboard
              </router-link>
            </li>
            <li v-if="userRole === 'editor'">
              <router-link to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <li v-if="userRole === 'editor'">
              <router-link to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>
            <li v-if="userRole === 'editor'">
              <router-link to="/serviceform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >volunteer_activism</span
                >
                Create Service
              </router-link>
            </li>
            <li v-if="$store.state.userRole">
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <li v-if="$store.state.userRole">
              <router-link to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
            <li v-if="$store.state.userRole">
              <router-link to="/findservice">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Service
              </router-link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
    <div class="grow w-4/5">
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white"> {{ organizationName }}</h1>
      </section>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
  <div>
    <modalComponent v-if="logoutModal" @close="logoutPush">
      <template v-slot:logoutSlot>
        Logging out...
        <p>See you Soon!</p>
      </template>
    </modalComponent>
  </div>

</template>

<script setup>
import { onMounted } from 'vue'
import { mapActions, useStore } from 'vuex'

console.log('setup')

onMounted(() => {
  const store = useStore()
  store.dispatch('fetchOrganizations')
})
</script>




<script>
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { mapState, mapActions } from 'vuex'
import modalComponent from './components/modalComponent.vue'

export default {
  name: 'App',
  components: {
    modalComponent
  },
  data() {
    return {
      logoutModal: false
    }
  },
  computed: {
    ...mapState({
      userRole: state => state.userRole || null,
      organizationName: state => state.organizationName || ''
    })
  },
  methods: {
    logout() {
      this.logoutModal = true
    },
    ...mapActions(['logOut']),
    logoutPush() {
      console.log('logout called')
      this.logoutModal = false
      this.$nextTick(() => {
        this.logOut()
        this.$router.push('/')
      });
    }
  }
}
</script>

<style scoped>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}
</style>
