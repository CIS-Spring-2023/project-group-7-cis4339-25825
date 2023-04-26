<template>
    <main>
      <!--Header-->
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Update Service
      </h1>
      <div class="px-10 py-20">
        <!--Form-->
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="submitServiceUpdateRequest">
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
              </label>
              <span v-if="v$.service.name.$error" class="text-red-500">
                  Service Name is required
              </span>
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
            <!-- Update Service button -->
            <div class="flex justify-between mt-10 mr-20">
                <div class="flex justify-between mt-10 mr-25">
                    <button
                        type="submit"
                        class="bg-green-700 text-white rounded"
                        :disabled="confirmModal"
                    >
                        Update Service
                </button>
                </div>
            </div>
          <!--Delete Service button-->
          <div class="flex justify-between mt-20 mr-20">
            <button
              @click="submitDeleteServiceRequest"
              type="submit"
              class="bg-red-700 text-white rounded"
              :disabled="confirmModal"
            >
              Delete Service
            </button>
            </div>
            <!--Go back button-->
            <div class="flex justify-between mt-20 mr-20">
              <button
                type="reset"
                class="border border-red-700 bg-white text-red-700 rounded"
                @click="goBack"
                :disabled="confirmModal"
              >
                Go back
              </button>
          </div>
          </div>
        </form>
      </div>

      <hr class="mt-10 mb-10" />
      <!-- Display Found Data -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
      <!--List of Events table-->
        <div class="ml-10">
          <h2 class="text-2xl font-bold">List of Events</h2>
          <h3 class="italic">Click table row to edit/display an entry</h3>
        </div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr>
                <th class="p-4 text-left">Event Name</th>
                <th class="p-4 text-left">Event Date</th>
                <th class="p-4 text-left">Event Address</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="editEvent(event._id)"
                v-for="event in events"
                :key="event._id"
                class="cursor-pointer"
                :class="{ 'hoverRow': hoverId === event._id }"
                @mouseenter="hoverId = event._id"
                @mouseleave="hoverId = null"
              >
                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formatDate(event.date) }}</td>
                <td class="p-2 text-left">{{ event.address.line1 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>

      <Transition name="bounce">
          <ConfirmModal v-if="confirmModal" @close="closeConfirmModal" :title="title" :message="message"/>
      </Transition>
    </main>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { getServiceById, getEventsByServiceId, updateService, removeServiceFromOrgEvents, deactivateService } from '../../api/api'
import LoadingModal from '../components/LoadingModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
    props: ['id'],
    components: {
        LoadingModal,
        ConfirmModal
    },
    data() {
        return {
            //variable to store service information
            service: {
                _id: null,
                name: null,
                description: null,
            },
            // all events that host the service
            events: [],
            // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
            hoverId: null,
            isLoading: false,
            confirmModal: false
        }
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
        },
      };
    },

    mounted() {
        this.loadData();
    },

    methods: {
        async loadData() {
          this.isLoading = true;
            try {
                const [serviceResponse, eventsResponse] = await Promise.all([
                    getServiceById(this.$route.params.id),
                    getEventsByServiceId(this.$route.params.id),
                ]);

                console.log('serviceResponse:', serviceResponse);
                console.log('eventsResponse:', eventsResponse);

                this.service = serviceResponse;
                this.events = eventsResponse;

                console.log('this.service', this.service);
                console.log('this.events', this.events);
            } catch (error) {
                console.log('error loading data', error);
            }
          this.isLoading = false;
        },

        formatDate(date) {
            const isoDate = new Date(date);
            const year = isoDate.getUTCFullYear();
            const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
            const day = String(isoDate.getUTCDate()).padStart(2, '0');
            return `${month}/${day}/${year}`;
        },

        submitServiceUpdateRequest() {
          // Trigger validation
          this.v$.$validate();

          if (this.v$.$error) {
            // Form is invalid, do not proceed
            return;
          }
          // Submit form
          this.confirmModal = true
          this.title = 'Please Confirm Update'
          this.message = 'Are you sure you want to update this service?'
        },

        closeConfirmModal(value) {
            this.confirmModal = false
            console.log(value)
            if (value === 'yes') {
              if (this.title === 'Please Confirm Update') {                    
                    this.title = '';
                    this.message = '';
                    this.submitServiceUpdate();
                }
                else if (this.title === 'Please Confirm Delete') {
                    this.title = '';
                    this.message = '';
                    this.submitDeleteService();
                }
            }
        },

        async submitServiceUpdate() {
            try {
                const response = await updateService(this.$route.params.id, this.service);
                if (response.success) {
                    console.log(response.message);
                } else {
                    console.log('Service update failed');
                }
            } catch (error) {
                console.log('error updating service', error)
            }
            this.$router.push('/findservice?update=true')
          
        },

        submitDeleteServiceRequest() {
          // Submit form
          this.confirmModal = true
          this.title = 'Please Confirm Delete'
          this.message = 'Are you sure you want to delete this service?'
        },

        async submitDeleteService() {
          this.isLoading = true;
          try {
            // Call both removeServiceFromOrgEvents and deactivateService concurrently
            const [removeResponse, deactivateResponse] = await Promise.all([
              removeServiceFromOrgEvents(this.$route.params.id),
              deactivateService(this.$route.params.id)
            ]);

            // Check if both operations were successful
            if (removeResponse.success && deactivateResponse.success) {
              console.log(removeResponse.message);
              console.log(deactivateResponse.message);
              this.$router.push('/findservice?delete=true');
            } else {
              console.log('Remove service from events failed or deactivating service failed');
            }
          } catch (error) {
            console.log('error removing service from events or deactivating service', error);
          }
          this.isLoading = false;
        },


        //method called when user clicks on an event row in "List of Events". It pushes the user to "ViewEvent.vue" with the event ID as a parameter so that the user may view the event information, not edit.
        editEvent(eventID) {
            this.$router.push({ name: 'eventdetails', params: { id: eventID } })
        },

        goBack() {
          const mainParam = this.$route.query.main;
          if (mainParam === 'true') {
            this.$router.push('/findservice')
          } else {
            this.$router.back()
          }
        },
    }
}
</script>

<style scoped>
  .hoverRow {
    background-color: rgba(255, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;
  }
</style>