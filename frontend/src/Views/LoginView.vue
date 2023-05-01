<!-- This is the login component. Users can login by entering a correct username and password -->
<!-- For Professor: 
      viewer username: viewer1
      viewer password: viewer1
      editor username: editor1
      editor password: editor1
-->

<template>
    <div>
      <!--Header-->
      <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">Login</h1>
      <br>
      <!--Form-->
      <form class="flex flex-col items-center" @submit.prevent="newlogin">
        <!--Username input field-->
        <label class="text-2xl font-bold">
          Username:
          <input type="text" v-model="username" required class="w-80 p-2 border border-gray-400 rounded">
        </label>
        <br>
        <!--Password input field-->
        <label class="text-2xl font-bold">Password:
          <input type="password" v-model="password" required class="w-80 p-2 border border-gray-400 rounded">
        </label>
        <br>
        <!--Login button-->
        <button class="bg-red-700 text-white rounded" type="submit">Login</button>
      </form>

    </div>
    <!-- Loading wheel appears when API calls are being made -->  
    <div>
      <LoadingModal v-if="isLoading"></LoadingModal>
    </div>


    <!-- Success modal appears after user successfully logs out -->
    <Transition name="bounce">
        <SuccessModal v-if="successModal" @close="closeSuccessModal" :title="title" :message="message" />
    </Transition>

      <!-- Modal component that appears when user fails the login -->
      <Transition name="bounce">
          <DeleteModal v-if="showLoginFailed" @close="closeDeleteModal" :title="title" :message="message" />
      </Transition>
</template>

<script>
//import Vuex functionality to calls actions from store
import { mapActions } from 'vuex'
// import API calls
import { loginUser } from '../../api/api'
// import JSON Web Token decoder to decode the token into the user's information
import jwt_decode from 'jwt-decode';
// import modal components
import LoadingModal from '../components/LoadingModal.vue'
import DeleteModal from '../components/DeleteModal.vue'
import SuccessModal from '../components/SuccessModal.vue'


export default {
  //allow components
  components: {
    LoadingModal,
    DeleteModal,
    SuccessModal
  },
  data() {
    return {
      //variable to hold username
      // viewer username: viewer1
      // viewer password: viewer1
      // editor username: editor1
      // editor password: editor1
      username: '',
      //variable to hold password
      password: '',
      //variable that determines if the modal component that shows login failed appears
      showLoginFailed: false,
      //variable to hold user's organization data
      organization: null,
      //variable to hold user's information
      user: null,
      // variable that determines if loading wheel appears
      isLoading: false,
      // variable that determines if the modal to show logout success appears
      successModal: false,
      title: '',
      message: ''
    }
  },

  mounted() {
    // when component is mounted, this checks if the user has logged out. If so, then a logout success modal will appear
    const query = new URLSearchParams(this.$route.query);
      // show success modal when user logs in
      if (query.get('logout') === 'true') {
        this.successModal = true;
        this.title = "Logged Out!"
        this.message = "See you soon!";
      }
  },

  methods: {
    // allow Vuex action of "fetchUserData" to be referenced in code
    ...mapActions(['fetchUserData']),
    // method called when user attempts to login
    async newlogin() {
        // show loading wheel
        this.isLoading = true;
        // make API call to loginUser
        try {
            const token = await loginUser(this.username, this.password);
            
            // Get the user's ID from the JWT token
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.id;
            const orgId = decodedToken.org;

            // Fetch the user data and org name
            try {
                await this.$store.dispatch('fetchUserData', { userId, orgId, token });
                this.$router.push('/dashboard?success=true')
            } catch (error) {
                this.showLoginFailed = true
                this.title = 'Login Failed';
                this.message = 'Invalid username or password';
            }
        } catch (error) {          
            this.showLoginFailed = true;
            this.title = 'Login Failed';
            this.message = 'Invalid username or password';
        }
        this.isLoading = false;
    },

    // method to close the modal that appears when user fails to login
    closeDeleteModal() {
      this.showLoginFailed = false;
      this.title = '';
      this.message = '';
    },

    // method to close SuccessModal
    closeSuccessModal() {
        this.successModal = false;
        this.title = '';
        this.message = '';
    },
  }
}
</script>

