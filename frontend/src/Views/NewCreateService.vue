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
                <span v-if="v$.service.name.$error" class="text-red-500">
                  Service Name is required
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
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>
    </main>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapState } from 'vuex'
import { createService } from '../../api/api'
import LoadingModal from '../components/LoadingModal.vue'

export default {
  components: {
      LoadingModal,
  },
    data() {
        return {
            //variable to hold new service information
            service: {
                _id: null,
                name: null,
                description: null,
                active: true,
            },
            isLoading: false
        }
    },

    computed: {
        ...mapState(['role'])
    },

    setup() {
      // Register Vuelidate
      const v$ = useVuelidate();
      return { v$ };
    },

    validations() {
      return {
        service: {
          name: { required },
        }
      }
    },

    methods: {
        async handleSubmitForm() {
          // Trigger validation
          this.v$.$validate();

          if (this.v$.$error) {
            // Form is invalid, do not proceed
            return;
          }
          this.isLoading = true;
          try {
              const response = await createService(this.service);
              if (response.success) {
                      console.log(response.message);
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