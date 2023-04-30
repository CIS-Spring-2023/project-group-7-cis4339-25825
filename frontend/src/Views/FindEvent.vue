<!-- This component displays a list of events. Users can search for events, and click on an event to be redirected to another component to view that event's details -->

<template>
      <main>
      <div>
        <!--Header-->
        <h1
          class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
        >
          List of Events
        </h1>
      </div>
      <div class="px-10 pt-20">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Search Event By</h2>
          <!-- Displays Event Name or Event Date selection -->
          <div class="flex flex-col">
            <select
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="searchBy"
            >
              <option value="Event Name">Event Name</option>
              <option value="Event Date">Event Date</option>
            </select>
          </div>
          <!--Displays event name search field-->
          <div class="flex flex-col" v-if="searchBy === 'Event Name'">
            <label class="block">
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="name"
                v-on:keyup.enter="handleSubmitForm"
                placeholder="Enter event name"
              />
            </label>
          </div>
          <!-- Displays event date search field -->
          <div class="flex flex-col" v-if="searchBy === 'Event Date'">
            <input
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              type="date"
              v-model="eventDate"
              v-on:keyup.enter="handleSubmitForm"
            />
          </div>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div></div>
          <div></div>
          <!--Clear Search button-->
          <div class="mt-5 grid-cols-2">
            <button
              class="mr-10 border border-red-700 bg-white text-red-700 rounded"
              @click="loadData"
              type="submit"
            >
              Clear Search
            </button>
            <!--Search Event button-->
            <button
              class="bg-red-700 text-white rounded"
              @click="handleSubmitForm"
              type="submit"
            >
              Search Event
            </button>
          </div>
        </div>
      </div>
  
      <hr class="mt-10 mb-10" />
      <!-- Display Found Data -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
      <!--Table showing List of Events-->
        <div class="ml-10">
          <h2 class="text-2xl font-bold">List of Events</h2>
          <h3 class="italic">
            <span v-if="role === 'editor'">Click table row to edit/display an entry</span>
            <span v-if="role === 'viewer'">Click table row to display an entry</span>
          </h3>
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

      <!-- Loading wheel appears when API calls are being made -->
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>

      <!-- Success modal appears after a new event is created -->
      <Transition name="bounce">
          <SuccessModal v-if="successModal" @close="closeSuccessModal" :title="title" :message="message" />
      </Transition>

      <!-- Update modal appears after an event is updated -->
      <Transition name="bounce">
          <UpdateModal v-if="updateModal" @close="closeUpdateModal" :title="title" :message="message" />
      </Transition>

      <!-- Delete modal appears after an event is deleted -->
      <Transition name="bounce">
          <DeleteModal v-if="deleteModal" @close="closeDeleteModal" :title="title" :message="message" />
      </Transition>

    </main>
</template>

<script>
// Import functionality to reference session states
import { mapState } from 'vuex'
// Import API calls
import { getOrgRecentEvents, searchEvents } from '../../api/api'
// Import modal components
import LoadingModal from '../components/LoadingModal.vue'
import SuccessModal from '../components/SuccessModal.vue'
import UpdateModal from '../components/UpdateModal.vue'
import DeleteModal from '../components/DeleteModal.vue'

export default {
  // allow modal components
  components: {
      LoadingModal,
      SuccessModal,
      UpdateModal,
      DeleteModal
  },
    data() {
        return {
            //variable to hold all events for the organization
            events: null,
            // Parameters for search to occur
            searchBy: null,
            name: null,
            eventDate: null,
            // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
            hoverId: null,
            // variable that determines if Loading wheel appears
            isLoading: false,
            // variable to check if the component has already been mounted - this is so that any modal components do not reappear after the user searches for an event
            alreadyMounted: false,
            // variable that determines if the SuccessModal appears
            successModal: false,
            // variable that determines if the UpdateModal appears
            updateModal: false,
            // variable that determines if the DeleteModal appears
            deleteModal: false,
            // title and message variables to be shown in the modal components
            title: "",
            message: ""
        }
    },
    computed: {
        //computed states so they can be referenced in code
        ...mapState(['role'])
    },
    mounted() {
      // when component is mounted, load the data
        this.loadData();
    },
    methods: {
      // method called when component is mounted
        async loadData() {
            // Resets variables used for search
            this.searchBy = null
            this.name = null
            this.eventDate = null

            // show loading wheel
            this.isLoading = true;
            // get list of events
            try {
                const response = await getOrgRecentEvents();
                this.events = response;
            } catch (error) {
                console.log('loadData error', error)
            }
            // loading wheel disappears
            this.isLoading = false;

            // show modal components
            if (!this.alreadyMounted) {
              const query = new URLSearchParams(this.$route.query);
              // show success modal
              if (query.get('success') === 'true') {
                  this.successModal = true;
                  this.title = "Success!"
                  this.message = "Event successfully created"
              }
              // show update modal
              if (query.get('update') === 'true') {
                  this.updateModal = true;
                  this.title = "Updated!"
                  this.message = "Event successfully updated."
              }
              // show delete modal
              if (query.get('delete') === 'true') {
                  this.deleteModal = true;
                  this.title = "Deleted!"
                  this.message = "Event successfully deleted."
              }
              this.alreadyMounted = true;
            }

        },

        // method called when user searches for an event
        async handleSubmitForm() {
          // if user searches by event name
            if (this.searchBy === 'Event Name') {
                if (this.name) {
                    try {
                        const query = {
                            searchBy: 'name',
                            name: this.name
                        };
                        const response = await searchEvents(query);
                        this.events = response;
                    } catch (error) {
                        console.log('Error searching events', error)
                    }
                }
            // if user searches by event date
            } else if (this.searchBy === 'Event Date') {
                if (this.eventDate) {
                    try {
                        const eventDate = new Date(this.eventDate);
                        const formattedDate = eventDate.toISOString().substring(0, 10);
                        const query = {
                            searchBy: 'date',
                            eventDate: formattedDate
                        };
                        const response = await searchEvents(query);
                        this.events = response;
                    } catch (error) {
                        console.log('Error searching events:', error)
                    }
                }
            }
        },

        // method called for each event date so it will be formatted correctly on the table
        formatDate(date) {
            const isoDate = new Date(date);
            const year = isoDate.getUTCFullYear();
            const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
            const day = String(isoDate.getUTCDate()).padStart(2, '0');
            return `${month}/${day}/${year}`;
        },

        // method called when user clicks on an event
        editEvent(eventID) {
          //if the user is an editor, this will push them to "EventDetails.vue" with the event ID as a parameter, where they can view and edit the event information.
          if (this.role === 'editor') {
            this.$router.push({ name: 'eventdetails', params: { id: eventID }, query: { main: true } })
          }
          //if the user is an editor, this will push them to "ViewEvent.vue" with the event ID as a parameter, where they can only view the event information.
          else if (this.role === 'viewer') {
            this.$router.push({ name: 'viewevent', params: { id: eventID } })
          }
        },

        // method to close the SuccessModal
        closeSuccessModal() {
            this.successModal = false;
            this.title = '';
            this.message = '';
        },

        // method to close the UpdateModal
        closeUpdateModal() {
            this.updateModal = false;
            this.title = '';
            this.message = '';
        },
        
        // method to close the DeleteModal
        closeDeleteModal() {
            this.deleteModal = false;
            this.title = '';
            this.message = '';
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