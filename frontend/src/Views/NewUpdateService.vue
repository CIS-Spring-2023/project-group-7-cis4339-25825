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
                <!--Shows errors, if any-->
                <!-- <span class="text-black" v-if="v$.service.name.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.service.name.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span> -->
              </label>
            </div>
  
            <!-- Description input field -->
            <div class="flex flex-col">
            <label>
              <span class="text-gray-700">Description:</span>
              <textarea class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="service.description"></textarea>
            </label>
            </div>
  
            <div class="flex flex-col">
              <!--Active status checkbox-->
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
            <!-- Update Service button -->
            <div class="flex justify-between mt-10 mr-20">
                <div class="flex justify-between mt-10 mr-25">
                    <button
                        @click="handleUpdateService"
                        type="submit"
                        class="bg-green-700 text-white rounded"
                    >
                        Update Service
                </button>
                </div>
            </div>
            <!--Go back button-->
            <div class="flex justify-between mt-20 mr-20">
              <button
                type="reset"
                class="border border-red-700 bg-white text-red-700 rounded"
                @click="$router.back()"
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
    </main>
</template>

<script>
import { getServiceById, getEventsByServiceId, updateService, removeServiceFromOrgEvents } from '../../api/api'
import LoadingModal from '../components/LoadingModal.vue'

export default {
    props: ['id'],
    components: {
        LoadingModal,
    },
    data() {
        return {
            //variable to store service information
            service: {
                _id: null,
                name: null,
                description: null,
                active: true
            },
            // all events that host the service
            events: [],
            // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
            hoverId: null,
            isLoading: false,
        }
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

        async handleSubmitForm() {
          this.isLoading = true;
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

            if (this.service.active) {
              this.$router.push('/findservice?update=true')
            } else {
              try {
                const response = await removeServiceFromOrgEvents(this.$route.params.id);
                if (response.success) {
                    console.log(response.message);
                    this.$router.push('/findservice?update=true')
                } else {
                    console.log('Remove service from events failed');
                }
              } catch (error) {
                console.log('error removing service from events', error)
              }
            }
            this.isLoading = false;
        },

        //method called when user clicks on an event row in "List of Events". It pushes the user to "ViewEvent.vue" with the event ID as a parameter so that the user may view the event information, not edit.
        editEvent(eventID) {
            this.$router.push({ name: 'eventdetails', params: { id: eventID } })
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