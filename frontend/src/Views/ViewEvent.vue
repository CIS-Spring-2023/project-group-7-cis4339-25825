<!-- This component allows a user to view a specific event's information. This component is only for users with the role "viewer". It does not allow update/delete. -->

<template>
    <main>
      <div>
        <!--Header-->
        <h1
          class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
        >
          View Event
        </h1>
      </div>
      <div class="px-10 py-20">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Event Details</h2>
          <!-- Event Name field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Event Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.name"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>

          <!-- Date field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Date</span>
              <span style="color: #ff0000">*</span>
              <input
                type="date"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.date"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>

          <div></div>
          <div></div>
          <!-- Description field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <!-- added missing v-model connection -->
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="event.description"
                style="color: gray; font-style: italic;"
                disabled
              ></textarea>
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <!-- Services Offered at Event checkboxes -->
          <div class="flex flex-col grid-cols-3">
            <label class="text-lg font-semibold mb-2">Services Offered at Event</label>
            <div>
              <ul v-if="services.length" class="space-y-2">
                <li v-for="service in services" :key="service._id" :data-service-id="service._id" class="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 transition-colors relative">
                  <label class="block w-full h-full">
                    <input
                      type="checkbox"
                      :id="service._id"
                      :value="service._id"
                      :checked="event.services.includes(service._id)"
                      v-model="event.services"
                      class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                      :disabled="true"
                    >
                    <span class="font-medium">{{ service.name }}</span>
                  </label>
                  <div
                    class="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                    @click.stop="toggleDetails(service._id)"
                  >
                    <svg
                      v-if="!descriptionOpenStates[service._id]"
                      class="h-4 w-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <svg
                      v-else
                      class="h-4 w-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </div>
                  <transition name="slide-fade">
                    <p
                      v-show="descriptionOpenStates[service._id]"
                      class="text-sm text-gray-600 mt-2 pr-8"
                    >
                      {{ service.description }}
                    </p>
                  </transition>
                </li>
              </ul>
              <!--If there are no active services for the user's organization, this will appear instead of list of checkboxes-->
              <p v-else class="text-gray-600">No Active Services Available</p>
            </div>
          </div>

        </div>

        <!-- grid container -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Address</h2>
          <!-- Address 1 field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.line1"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <!-- Address 2 field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 2</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.line2"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <!-- City field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">City</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.city"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <div></div>
          <!-- County field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">County</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.county"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <!-- Zip code field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Zip Code</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.zip"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
        </div>

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
        <!--Go back button-->
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="goBack"
            >
              Go back
            </button>
          </div>
        </div>

        <hr class="mt-10 mb-10" />

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
        <!--List of Attendees for the event-->
          <div>
            <h2 class="text-2xl font-bold">List of Attendees</h2>
            <h3 class="italic">Click table row to display an entry</h3>
          </div>
          <div class="flex flex-col col-span-2">
            <table class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr>
                  <th class="p-4 text-left">Name</th>
                  <th class="p-4 text-left">City</th>
                  <th class="p-4 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                  <tr
                  @click="goToClient(client._id)"
                  v-for="client in clients"
                  :key="client._id"
                  class="cursor-pointer"
                  :class="{ 'hoverRow': hoverId === client._id }"
                  @mouseenter="hoverId = client._id"
                  @mouseleave="hoverId = null"
                  >
                  <td class="p-2 text-left">
                    {{ client.firstName + ' ' + client.lastName }}
                  </td>
                  <td class="p-2 text-left">{{ client.address.city }}</td>
                  <td class="p-2 text-left">
                    {{ client.phoneNumber.primary }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Loading modal appears when API calls are being made -->
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>
    </main>
</template>

<script>
// import API calls
import { getEventById, getEventAttendees, getActiveServices } from '../../api/api'
// import modal component
import LoadingModal from '../components/LoadingModal.vue'

export default {
  //accept event ID as data from parent components
    props: ['id'],
    // allow components
    components: {
      LoadingModal,
    },
    data() {
        return {
            //variable to hold clients for selected event
            clients: [],
            //variable to hold services for selected event
            services: [],
            //variable to hold event information
            event: {
                _id: null,
                name: null,
                description: null,
                date: null,
                address: {
                    line1: null,
                    line2: null,
                    city: null,
                    county: null,
                    zip: null
                },
                attendees: [],
                services: []
            },
            // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
            hoverId: null,
            // variable that determines which services have their descriptions opened
            openDescriptions: [],
            // variable that determines when loading wheel appears
            isLoading: false,
        }
    },

    computed: {
      // computed function to allow services to have their descriptions opened
      descriptionOpenStates() {
        return this.services.reduce((acc, service) => {
          acc[service._id] = this.openDescriptions.includes(service._id);
          return acc;
        }, {});
      },
    },

    mounted() {
      // when component is mounted, load the necessary data
        this.loadData();
    },

    methods: {
      // method called when component is mounted -> loads all necessary data
        async loadData() {
          // show loading wheel
          this.isLoading = true;
          // get event information, all clients registered under this event, and all active services
            try {
                const [eventResponse, clientsResponse, servicesResponse] = await Promise.all([
                    getEventById(this.$route.params.id),
                    getEventAttendees(this.$route.params.id),
                    getActiveServices(),
                ]);

                eventResponse.date = new Date(eventResponse.date).toISOString().substring(0, 10);

                this.event = eventResponse;
                this.clients = clientsResponse;
                this.services = servicesResponse;
            } catch (error) {
                console.log('error loading data:', error)
            }
          this.isLoading = false;
        },

        //method called when user clicks on a client row in "List of Attendees" section. It pushes the user to "ViewClient.vue" with the client ID as a parameter so they may view the selected client, not edit.
        goToClient(clientID) {
          this.$router.push({ name: 'viewclient', params: { id: clientID } })
        },

        // method called when user clicks the arrow to expand a service to show its description, or to hide its description
        toggleDetails(serviceId) {          
          if (this.openDescriptions.includes(serviceId)) {
            this.openDescriptions = this.openDescriptions.filter(id => id !== serviceId);
          } else {
            this.openDescriptions.push(serviceId);
          }
        },

        // method called when user clicks the "Go back" button
        goBack() {
          if (this.$route.query.dash) {
            this.$router.push('/dashboard')
          } else {
            this.$router.back()
          }
        },
    },
}
</script>

<style scoped>
  .hoverRow {
    background-color: rgba(255, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;
  }

/* Style for disabled checkboxes */
input[type="checkbox"]:disabled {
  color: #a0aec0; /* Text color */
  border-color: #e2e8f0; /* Border color */
  background-color: #edf2f7; /* Background color */
}

/* Style for checked checkboxes */
input[type="checkbox"]:checked {
  color: #fff; /* Text color */
  border-color: #4299e1; /* Border color */
  background-color: #4299e1; /* Background color */
}

  
  .arrow-container {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }

  .slide-fade-enter-active,
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-1rem);
  }
  .slide-fade-enter-to,
  .slide-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
  }
</style>