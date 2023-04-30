<!-- This component allows for the creation of a new service -->

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
                  :disabled="confirmModal"
                />
                <!-- Validation error messages -->
                <span v-if="v$.service.name.$error" class="text-red-500">
                  Service Name is required
                </span>
              </label>
            </div>
  
            <!-- Description input field -->
            <div class="flex flex-col">
            <label>
              <span class="text-gray-700">Description:</span>
              <textarea class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="service.description" :disabled="confirmModal"></textarea>
            </label>
            </div>
           
          </div>
  
          <!-- grid container -->
          <div
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <!-- Add Service submit button -->
            <div class="flex justify-between mt-10 mr-20">
              <button class="bg-red-700 text-white rounded" type="submit" :disabled="confirmModal">
                Add Service
              </button>
            </div>
          </div>
        </form>
      </div>
      <!-- Loading wheel appears when API calls are being made -->
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>

      <!-- Confirmation modal appears when user attempts to create a new service -->
      <Transition name="bounce">
          <ConfirmModal v-if="confirmModal" @close="closeConfirmModal" :title="title" :message="message"/>
      </Transition>
    </main>    
</template>

<script>
// import vuelidate validations
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
// import functionality to reference session states
import { mapState } from 'vuex'
// Import API calls
import { createService } from '../../api/api'
// Import modal components
import LoadingModal from '../components/LoadingModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
  // allow modal components
  components: {
      LoadingModal,
      ConfirmModal
  },
    data() {
        return {
            //variable to hold new service information
            service: {
                name: null,
                description: null,
                active: true,
            },
            // variable that determines if loading wheel appears
            isLoading: false,
            // variable that determines if confirmation modal appears
            confirmModal: false,
        }
    },

    computed: {
      //computed states so they can be referenced in code
        ...mapState(['role'])
    },

    setup() {
      // Register Vuelidate
      const v$ = useVuelidate();
      return { v$ };
    },

    validations() {
      // validations for service
      return {
        service: {
          name: { required },
        }
      }
    },

    methods: {
      // method called when user attempts to create new service
        async handleSubmitForm() {
          // Trigger validation
          this.v$.$validate();

          if (this.v$.$error) {
            // Form is invalid, do not proceed
            return;
          }

          // If form is valid, ConfirmModal will appear asking for confirmation
          this.confirmModal = true
          this.title = 'Please Confirm Creation'
          this.message = 'Are you sure you want to create this service?'
        },

        // method called when ConfirmModal closes. If user clicked "yes" then the service creation will proceed
        closeConfirmModal(value) {
            this.confirmModal = false
            this.title = ''
            this.message = ''
            if (value === 'yes') {
                this.registerService();
            }
        },

        // method called when user clicks "yes" in the ConfirmModal. API call to create new service is made.
        async registerService() {
          this.isLoading = true;
          try {
              const response = await createService(this.service);
              if (response.success) {
                      this.$router.push('/findservice?success=true')
                  } else {
                      console.log('Event creation failed');
                  }
          } catch (error) {
              console.log('Error creating new service:', error)
          }
          this.isLoading = false;
        }
    }


}
</script>

<style>

</style>