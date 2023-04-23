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
    <!--Button for professor/TAs-->
    <button @click="toggleProfModal">Click Me for Login Info</button>

    <!--component that shows if "Click Me for Login Info" button is clicked-->
    <forProfessor v-if="showLoginInfo" @close="toggleProfModal"/>

    </div>

    <!--modal component that shows if login was a success-->
    <div style="display: flex; justify-content: center;">
      <modalComponent v-if="showLoginSuccess" @close="loginPush">
        <template v-slot:loginSuccess>
          Login Success!
          <p>Hello {{ username }}</p>
        </template>
      </modalComponent>
    </div>
    <!--modal component that shows if login failed-->
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
//import functionalities
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex';
import forProfessor from '../components/forProfessor.vue'
import modalComponent from '../components/modalComponent.vue'
import { loginUser } from '../../api/api'
import jwt_decode from 'jwt-decode';


export default {
  //allow components
  components: {
    forProfessor,
    modalComponent
  },
  data() {
    return {
      //variable to hold username
      username: 'viewer1',
      //variable to hold password
      password: 'viewer1',
      //variable that determines if the "forProfessor" component appears 
      showLoginInfo: false,
      //variable that determines if the modal component that shows login success appears
      showLoginSuccess: false,
      //variable that determines if the modal component that shows login failed appears
      showLoginFailed: false,
      //variable to hold user's organization data
      organization: null,
      //variable to hold user's information
      user: null
    }
  },
  methods: {
    ...mapActions(['fetchUserData']),
    async newlogin() {
        console.log('login submitted');
        try {
            const token = await loginUser(this.username, this.password);
            console.log('token:', token);
            
            // Get the user's ID from the JWT token
            const decodedToken = jwt_decode(token);
            const userId = decodedToken.id;
            console.log('userId', userId)
            const orgId = decodedToken.org;
            console.log('orgId', orgId)

            // Fetch the user data and org name
            console.log('token before dispatch', token)
            try {
                await this.$store.dispatch('fetchUserData', { userId, orgId, token });
            } catch (error) {
                console.error('Error fetching user data:', error);
                console.log('login failed')
                this.showLoginFailed = true
                console.log('login failed after')
            }

            console.log('Login Success!')
            this.$router.push('/dashboard')
        } catch (error) {
            console.error('Error logging in:', error);
            this.showLoginFailed = true
        }
    },











    //import actions from /store/index.js so they can be referenced in code
    ...mapActions(['login', 'initializeUser']),
    //method called when user attempts to login
      async userLogin() {
        //call the "login" action from /store/index.js to attempt to login the user - checks to see if username and password are correct
        const { success, organization, user } = await this.login({ username: this.username, password: this.password })
        //if username and password are correct
        if (success) {
          //show modal component that displays login success
          this.showLoginSuccess = true
          //set organization variable to hold the user's organization's data to pass to the "initializeUser" action
          this.organization = organization
          //set user variable to hold the user's information to pass to "initializeUser" action
          this.user = user
        //if username and password are incorrect
        } else {
          //show modal component that displays login failure
          this.showLoginFailed = true
        }
      },
      //when modal component that displays login success emits a 'close' event, this method is called.
      async loginPush() {
        //call the "initializeUser" action from /store/index.js which assigns the user's organization data as states
        await this.initializeUser({ organization: this.organization, user: this.user }) 
        //push the user to the dashboard   
        this.$router.push('/dashboard')
      },
    //when modal component that displays login failure emits a 'close' event, this method is called
    loginFail() {
      //stop showing the modal component
      this.showLoginFailed = false
    },
    //method called when professor/ta clicks the login info button
    toggleProfModal() {
      this.showLoginInfo = !this.showLoginInfo
    }
  }
}
</script>

