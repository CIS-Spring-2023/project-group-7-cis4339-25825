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
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>

      <Transition name="bounce">
          <SuccessModal v-if="successModal" @close="closeSuccessModal" :title="title" :message="message" />
      </Transition>

      <Transition name="bounce">
          <UpdateModal v-if="updateModal" @close="closeUpdateModal" :title="title" :message="message" />
      </Transition>

    <Transition name="bounce">
        <DeleteModal v-if="deleteModal" @close="closeDeleteModal" :title="title" :message="message" />
    </Transition>

    </main>
</template>

<script>
import { mapState } from 'vuex'
import { getOrgRecentEvents, searchEvents } from '../../api/api'
import LoadingModal from '../components/LoadingModal.vue'
import SuccessModal from '../components/SuccessModal.vue'
import UpdateModal from '../components/UpdateModal.vue'
import DeleteModal from '../components/DeleteModal.vue'

export default {
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
            isLoading: false,
            successModal: false,
            updateModal: false,
            deleteModal: false,
            title: "",
            message: ""
        }
    },
    computed: {
        //computed states so they can be referenced in code
        ...mapState(['role'])
    },
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData() {
            // Resets variables used for search
            this.searchBy = null
            this.name = null
            this.eventDate = null
            console.log('loadData called')
            this.isLoading = true;
            try {
                const response = await getOrgRecentEvents();
                this.events = response;
            } catch (error) {
                console.log('loadData error', error)
            }
            this.isLoading = false;
            const query = new URLSearchParams(this.$route.query);
            if (query.get('success') === 'true') {
                console.log('success is true')
                this.successModal = true;
                this.title = "Success!"
                this.message = "Event successfully created"
            }
            if (query.get('update') === 'true') {
                console.log('update is true')
                this.updateModal = true;
                this.title = "Updated!"
                this.message = "Event successfully updated."
            }
            if (query.get('delete') === 'true') {
                console.log('delete is true')
                this.deleteModal = true;
                this.title = "Deleted!"
                this.message = "Event successfully deleted."
            }
        },

        async handleSubmitForm() {
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
            } else if (this.searchBy === 'Event Date') {
                if (this.eventDate) {
                    try {
                        const eventDate = new Date(this.eventDate);
                        const formattedDate = eventDate.toISOString().substring(0, 10);
                        const query = {
                            searchBy: 'date',
                            eventDate: formattedDate
                        };
                        console.log('searchBy date query:', query)
                        const response = await searchEvents(query);
                        this.events = response;
                    } catch (error) {
                        console.log('Error searching events:', error)
                    }
                }
            }
        },

        formatDate(date) {
            const isoDate = new Date(date);
            const year = isoDate.getUTCFullYear();
            const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
            const day = String(isoDate.getUTCDate()).padStart(2, '0');
            return `${month}/${day}/${year}`;
        },

        editEvent(eventID) {
          //if the user is an editor, this will push them to "EventDetails.vue" with the event ID as a parameter, where they can view and edit the event information.
          if (this.role === 'editor') {
            this.$router.push({ name: 'eventdetails', params: { id: eventID } })
          }
          //if the user is an editor, this will push them to "ViewEvent.vue" with the event ID as a parameter, where they can only view the event information.
          else if (this.role === 'viewer') {
            this.$router.push({ name: 'viewevent', params: { id: eventID } })
          }
        },

        closeSuccessModal() {
            this.successModal = false;
            this.title = '';
            this.message = '';
        },

        closeUpdateModal() {
            this.updateModal = false;
            this.title = '';
            this.message = '';
        },
        
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