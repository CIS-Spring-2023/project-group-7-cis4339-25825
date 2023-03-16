<template>
    <main>
      <!--Header-->
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Client Intake Form
      </h1>
      <div class="px-10 py-20">
        <!-- form field -->
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="registerClient">
          <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Personal Details</h2>
            <!--First Name Input Field-->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">First Name</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.firstName"
                />
                <!--Errors will show, if any-->
                <span class="text-black" v-if="v$.client.firstName.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.firstName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
              </label>
            </div>
  
            <!--Middle Name Input Field-->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Middle Name</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder
                  v-model="client.middleName"
                />
              </label>
            </div>
  
            <!--Last Name Input Field-->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Last Name</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder
                  v-model="client.lastName"
                />
                <!--Errors will show, if any-->
                <span class="text-black" v-if="v$.client.lastName.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.lastName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
              </label>
            </div>
  
            <div></div>
            <!--Email Input Field-->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Email</span>
                <input
                  type="email"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  v-model="client.email"
                />
                <!--Errors will show, if any-->
                <span class="text-black" v-if="v$.client.email.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.email.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
              </label>
            </div>
            <!-- Phone Number Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Phone Number</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                  v-model="client.phone"
                />
                <!--Errors will show, if any-->
                <span
                  class="text-black"
                  v-if="v$.client.phone.$error"
                >
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.phone.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
              </label>
            </div>
            <!-- Alternative Phone Number Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Alternative Phone Number</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                  v-model="client.altPhone"
                />
              </label>
            </div>
          </div>
  
          <!-- grid container -->
          <div
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Address Details</h2>
            <!-- Address 1 Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Address Line 1</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.address1"
                />
              </label>
            </div>
            <!-- Address 2 Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Address Line 2</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.address2"
                />
              </label>
            </div>
            <!-- City Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">City</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.city"
                />
                <!--Errors will show, if any-->
                <span class="text-black" v-if="v$.client.city.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.city.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
              </label>
            </div>
            <div></div>
            <!-- County Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">County</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.county"
                />
              </label>
            </div>
            <!-- Zip Code Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Zip Code</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.zip"
                />
              </label>
            </div>
            <div></div>
            <!-- Add Client Submit Button -->
            <div class="flex justify-between mt-10 mr-20">
              <button class="bg-red-700 text-white rounded" type="submit">
                Add Client
              </button>
            </div>
          </div>
        </form>
      </div>

      <!--Modal component that appears if phone number is already registered-->
      <div v-if="showClientRegisteredModal" >
        <modalComponent @close="clientAlreadyRegisteredPush">
          <template v-slot:clientRegisteredSlot>
            Client Phone # Already Registered
            <p>Please try again</p>
          </template>
        </modalComponent>
      </div>
      <!--Modal component that appears when client is created-->
      <div v-if="showClientAddedModal">
        <modalComponent @close="clientAddedPush">
          <template v-slot:clientAddedSlot>
            Client Added!
            <p>Redirecting...</p>
          </template>
        </modalComponent>
      </div>
    </main>
  </template>
  

<script>
//import functionalities
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import { mapState } from 'vuex'
import modalComponent from '../components/modalComponent.vue'

export default {
  // allow modal component
  components: {
    modalComponent
  },
  // setup vuelidate
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      //client variable to hold new client information
      client: {
        id: null,
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        altPhone: '',
        address1: '',
        address2: '',
        city: '',
        county: '',
        zip: ''
      },
      //variables that determines if modal components appears
      showClientRegisteredModal: false,
      showClientAddedModal: false
    }
  },
  computed: {
    // setup computed property "organizationClients" so it can be referenced in code - it holds all the clients of the user's organization
    ...mapState(['organizationClients'])
  },
  mounted() {
    // scroll the top of the screen when component is mounted
    window.scrollTo(0, 0)
  },
  methods: {
    // method called when "Add Client" submit button is pressed
    registerClient() {
      // validation check
      this.v$.$validate().then((valid) => {
        // if no validation errors
        if (valid) {
          //this checks if the phone number already exists is organizationClients
            if (this.organizationClients.some(client => client.phone === this.client.phone)){
              //show the modal component stating that the client's phone number already exists
                this.showClientRegisteredModal = true
            }
            // if phone number does not already exist, then a new client is added
            else {
              // assign new client ID
                this.client.id = Math.max(...this.organizationClients.map(client => client.id)) + 1;
                //call the "addClient" mutation in 'store/index.js' to add a client with the new client information
                this.$store.commit('addClient', this.client)
                // show the client added modal component
                this.showClientAddedModal = true
            }
        }        
        //nothing occurs if form is not validated - vuelidate will already show errors below the input fields
      })
    },
    // when modal component showing that the phone number is already registered emits a 'close' event, this method is called, which pushes the user to "FindClient.vue"
    clientAlreadyRegisteredPush() {
      this.showClientRegisteredModal = false
      this.$router.push('/findclient')
    },
    // when modal component showing that client has been added emits a 'close' event, this method is called. It pushes the user to "FindClient.vue"
    clientAddedPush() {
      this.clientAdded = false
      this.$router.push('/findclient')
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      client: {
        firstName: { required, alpha },
        lastName: { required, alpha },
        email: { email },
        city: { required },
        phone: { required, numeric }
      }
    }
  }
}
</script>