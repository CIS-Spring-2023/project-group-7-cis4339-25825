<!-- This component allows a user to view a specific service's information. This component is only for users with the role "viewer". It does not allow update/delete. -->

<template>
      <main>
      <!--Header-->
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        View Service
      </h1>
      <div class="px-10 py-20">
        <form>
          <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Service Details</h2>
            <!-- Service name field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Service Name</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="service.name"
                  style="color: gray; font-style: italic;"
                  disabled
                />
              </label>
            </div>
  
            <!-- Description field -->
            <div class="flex flex-col">
            <label>
              <span class="text-gray-700">Description:</span>
              <textarea class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="service.description"
              style="color: gray; font-style: italic;"
              disabled
              ></textarea>
            </label>
            </div>
           
          </div>
  
          <!-- grid container -->
          <div
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <div class="flex justify-between mt-20 mr-20">
              <!--Go back button-->
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
      <!--List of Events for Service-->
        <div class="ml-10">
          <h2 class="text-2xl font-bold">List of Events</h2>
          <h3 class="italic">Click table row to display an entry</h3>
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
                @click="goToEvent(event._id)"
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
      <!-- Loading modal appears when API calls are being made -->
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>
    </main>
</template>

<script>
// import modal components
import LoadingModal from '../components/LoadingModal.vue'
// import API calls
import { getServiceById, getEventsByServiceId } from '../../api/api'

export default {
  //accept service ID as data from parent components
    props: ['id'],
    // allow components
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
            // variable that determines when loading wheel appears
            isLoading: false,
        }
    },

    mounted() {
      // when component is mounted, loads all data
        this.loadData();
    },

    methods: {
      // method called when component is mounted -> loads all necessary data
        async loadData() {
          // show loading wheel
          this.isLoading = true;
          // get service information, and get all events that host the service
            try {
                const [serviceResponse, eventsResponse] = await Promise.all([
                    getServiceById(this.$route.params.id),
                    getEventsByServiceId(this.$route.params.id),
                ]);

                this.service = serviceResponse;
                this.events = eventsResponse;

            } catch (error) {
                console.log('error loading data', error);
            }
          this.isLoading = false;
        },

        // method called to format the events' dates
        formatDate(date) {
            const isoDate = new Date(date);
            const year = isoDate.getUTCFullYear();
            const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
            const day = String(isoDate.getUTCDate()).padStart(2, '0');
            return `${month}/${day}/${year}`;
        },

        //method called when user clicks on an event row in "List of Events". It pushes the user to "ViewEvent.vue" with the event ID as a parameter so that the user may view the event information, not edit.
        goToEvent(eventID) {
            this.$router.push({ name: 'viewevent', params: { id: eventID } })
        },

    },
}
</script>

<style scoped>
.hoverRow {
  background-color: rgba(255, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
}
</style>