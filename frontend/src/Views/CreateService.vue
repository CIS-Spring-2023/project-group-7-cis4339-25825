<template>
    <main>
      <!--Header-->
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Create Service
      </h1>
      <div class="px-10 py-20">
        <!--Form-->
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="handleSubmitForm">
          <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Service Details</h2>
            <!-- Service Name input field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Service Name</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="service.name"
                />
                <!--Show errors, if any-->
                <span class="text-black" v-if="v$.service.name.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.service.name.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
              </label>
            </div>
  
            <!-- Description input field -->
            <div class="flex flex-col">
            <label>
              <span class="text-gray-700">Description:</span>
              <textarea class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="service.description"></textarea>
            </label>
            </div>
  
            <!--Active Status checkbox-->
            <div class="flex flex-col">
              <label>
                  <span class="text-gray-700">Active </span>
                  <input 
                      type="checkbox"
                      class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                      checked
                      v-model="service.active"
                      >
              </label>
  
            </div>
           
          </div>
  
          <!-- grid container -->
          <div
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <!-- Add Service submit button -->
            <div class="flex justify-between mt-10 mr-20">
              <button class="bg-red-700 text-white rounded" type="submit">
                Add Service
              </button>
            </div>
          </div>
        </form>
      </div>

      <!--Modal Component that appears when service is created-->
      <div v-if="showServiceCreatedModal">
        <modalComponent @close="serviceCreatedPush">
          <template v-slot:serviceCreatedSlot>
            Service Created!
            <p>Redirecting...</p>
          </template>
        </modalComponent>
      </div>
    </main>
  </template>

<script>
//import functionalities
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapState } from 'vuex'
import modalComponent from '../components/modalComponent.vue'

export default {
  setup() {
    //setup vuelidate
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  //allow modal component
  components: {
    modalComponent
  },
  data() {
    return {
      //variable to hold new service information
      service: {
        id: null,
        name: '',
        description: '',
        active: true,
      },
      //variable that determines if modal component appears
      showServiceCreatedModal: false
    }
  },
  computed: {
    //computed states so I can refer to them in code
    ...mapState(['organizationId', 'organizationServices'])
  },
  methods: {
    //method called when user clicks "Add Service" button
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        //assign service ID
        this.service.id = Math.max(...this.organizationServices.map(service => service.id)) + 1;
        // call the mutation "addService" in /store/index.js, which will add a new service the organization's services
        this.$store.commit('addService', { organizationId: this.organizationId, service: this.service });
        //show modal component displaying that a service was created
        this.showServiceCreatedModal = true        

      }
    },
    //when modal component emits a 'close' event, this method is called. It will push the user to "FindService.vue"
    serviceCreatedPush() {
      this.showServiceCreatedModal = false
      this.$router.push('/findservice')
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      service: {
        name: { required }
      }
    }
  }
}
</script>
