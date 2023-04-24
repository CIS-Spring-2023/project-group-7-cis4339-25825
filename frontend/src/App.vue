<template>
  <main class="flex flex-row">
    <div id="_container" class="h-screen">
      <header class="w-full">
        <section class="text-center">
          <img class="m-auto" src="@\assets\DanPersona.svg" />
        </section>
        <!--Navigation bar-->
        <nav class="mt-10">
          <ul class="flex flex-col gap-4">
            <!--Login link - Link only shows is user is logged out-->
            <li v-if="!$store.state.role">
              <router-link to="/">
                <span
                  style="position:relative; top: 6px"
                  class="material-icons"
                >login</span>
                Login
              </router-link>
            </li>
            <!--Logout link - Link only shows is user is logged in-->
            <li v-if="$store.state.role" @click.prevent="logout" style="cursor: pointer;">
                <span
                  style="position:relative; top: 6px"
                  class="material-icons"
                >logout</span>
                Logout
            </li>
            <!-- Dashboard link -->
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
            <!--Client Intake Form link - only shows if user is an editor-->
            <li v-if="role === 'editor'">
              <router-link to="/intakeform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >people</span
                >
                Client Intake Form
              </router-link>
            </li>
            <!--Create Event link - only shows if user is an editor-->
            <li v-if="role === 'editor'">
              <router-link to="/eventform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >event</span
                >
                Create Event
              </router-link>
            </li>
            <!--Create Service link - only shows if user is an editor-->
            <li v-if="role === 'editor'">
              <router-link to="/serviceform">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >volunteer_activism</span
                >
                Create Service
              </router-link>
            </li>
            <!--Find Client link - only shows if user is logged in-->
            <li v-if="$store.state.role">
              <router-link to="/findclient">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Client
              </router-link>
            </li>
            <!--Find Event link - only shows if user is logged in-->
            <li v-if="$store.state.role">
              <router-link to="/findevents">
                <span
                  style="position: relative; top: 6px"
                  class="material-icons"
                  >search</span
                >
                Find Event
              </router-link>
            </li>
            <!--Find Service link - only shows if user is logged in-->
            <li v-if="$store.state.role">
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
      <!--Organization Name Header - only shows when user is logged in and "organizationName" state is given a name-->
      <section
        class="justify-end items-center h-24 flex"
        style="background: linear-gradient(250deg, #c8102e 70%, #efecec 50.6%)"
      >
        <h1 class="mr-20 text-3xl text-white"> {{ orgName }}</h1>
      </section>
      <!--Content of Views-->
      <div>
        <router-view></router-view>
      </div>
    </div>
  </main>
  <div>
    <!--Modal Component when user logs out-->
    <modalComponent v-if="logoutModal" @close="logoutPush">
      <template v-slot:logoutSlot>
        Logging out...
        <p>See you Soon!</p>
      </template>
    </modalComponent>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import modalComponent from './components/modalComponent.vue'
import { logoutUser } from '../api/api'

export default {
  name: 'App',
  // modal component
  components: {
    modalComponent
  },
  data() {
    return {
      // variable that determines if logout modal component appears
      logoutModal: false
    }
  },
  computed: {
    ...mapState({
      //sets the role state as either "viewer" or "editor" when the user logs in
      role: state => state.role || null,
      // sets the organizationName state as the name of the organization when user logs in
      orgName: state => state.orgName || null
    })
  },
  methods: {
    ...mapActions(['clearSessionData']),
    // method called when user clicks the "Logout" router link -> it renders the Logout modal component
    async logout() {
      // this.logoutModal = true
      try {
        await logoutUser();
        this.$store.dispatch('clearSessionData');
        this.$router.push('/')
      } catch (error) {
        console.log('logout error', error)
      }
    },
    // method called when Logout modal component emits a 'close' event - this will calls the "logOut" action from /store/index.js, then push the user back to login view
    // ...mapActions(['logOut']),
    // logoutPush() {
    //   this.logoutModal = false
    //   this.$nextTick(() => {
    //     this.logOut()
    //     this.$router.push('/')
    //   });
    // }
  }
}
</script>

<style scoped>
#_container {
  background-color: #c8102e;
  color: white;
  padding: 18px;
}

/* router-link {
  color: #333;
  text-decoration: none;
}

router-link:hover {
  color: #555;
  text-decoration: underline;
} */
</style>
