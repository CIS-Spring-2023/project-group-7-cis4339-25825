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
          <!-- Services checkboxes -->
          <div class="flex flex-col grid-cols-3">
            <label>Services Offered at Event</label>
              <div>
                <ul v-if="hasActiveServices">
                  <li v-for="service in organizationServices" :key="service.id" v-show="service.active">
                    <input
                      type="checkbox"
                      :id="service.id"
                      :value="service.id"
                      :checked="isAnEventService(service.id)"
                      v-model="eventServiceIds"
                      class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                      style="color: gray; font-style: italic;"
                      disabled
                    >
                    <label :for="service.name">{{ service.name }}</label>
                  </li>
                </ul>
                <!--If there are no active services for the user's organization, this will appear instead of list of checkboxes-->
                <p v-else>No Active Services Available</p>
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
                v-model="event.address1"
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
                v-model="event.address2"
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
                v-model="event.city"
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
                v-model="event.county"
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
                v-model="event.zip"
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
              @click="$router.back()"
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
                  @click="goToClient(client.id)"
                  v-for="client in eventClients"
                  :key="client.id"
                  class="cursor-pointer"
                  :class="{ 'hoverRow': hoverId === client.id }"
                  @mouseenter="hoverId = client.id"
                  @mouseleave="hoverId = null"
                  >
                  <td class="p-2 text-left">
                    {{ client.firstName + ' ' + client.lastName }}
                  </td>
                  <td class="p-2 text-left">{{ client.city }}</td>
                  <td class="p-2 text-left">
                    {{ client.phone }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </template>

<script>
//import functionalities
import { DateTime } from 'luxon'
import { mapState } from 'vuex'

export default {
  //accept event ID as prop passed down from parent component, either "HomeView.vue", "FindEvent.vue", "ViewClient.vue", or "ViewService.vue"
  props: ['id'],
  data() {
    return {
      //variable to hold client IDs for selected event
      eventClientIds: [],
      //variable to hold all clients and their information for selected event
      eventClients: [],
      //variable to hold service IDs for selected event
      eventServiceIds: [],
      //variable to hold all services and their information for selected event
      eventServices: [],
      //variable to hold event information
      event: {
        id: null,
        name: '',
        description: '',
        date: '',
        address1: '',
        address2: '',
        county: '',
        city: '',
        zip: ''
      },
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  //lifecycle hook that fires when component is mounted
  mounted() {
    //temporary varaible to grab the event ID that was passed from parent component -> this.$route.params.id returns a string, so parseInt converts it to an integer
    const eventId_temp = parseInt(this.$route.params.id)
    //temporary variable to hold event information -> search through all of the organization's events to find the specific event selected
    const event_temp = this.organizationEvents.find(e => e.id === eventId_temp)
    //if event selected exists in the organization's events, then the this.event variable will be filled with the event's current information. This is how the input fields are already filled when user visits the page
    if (event_temp) {
        this.event.id = eventId_temp
        this.event.name = event_temp.name
        this.event.description = event_temp.description
        this.event.date = event_temp.date
        this.event.address1 = event_temp.address1
        this.event.address2 = event_temp.address2
        this.event.county = event_temp.county
        this.event.city = event_temp.city
        this.event.zip = event_temp.zip
        this.event.serviceIds = event_temp.serviceIds
        this.event.clientIds = event_temp.clientIds
        //fetching array of service IDs associated with the selected event
        this.eventServiceIds = this.organizationEventServices.find(event => event.eventId === eventId_temp).serviceIds
        //fetching all services and their information associated with the selected event
        this.eventServices = this.organizationServices.filter(service => this.eventServiceIds.includes(service.id))
        //fetching array of clientIds in the event
        this.eventClientIds = this.organizationEventClients.find(event => event.eventId === eventId_temp).clientIds
        //fetching client information for the clients in the event
        this.eventClients = this.organizationClients.filter(client => this.eventClientIds.includes(client.id))
    }
  },
  computed: {
    //computed states so they can be referenced in code
    ...mapState(['organizationEvents', 'organizationServices', 'organizationClients', 'organizationEventServices', 'organizationEventClients']),
    //Checks to see if there are any active services for the organization instance. If there are, returns true. If not, returns false, and the page will show "No Active Services Available"
    hasActiveServices() {
      return this.organizationServices.some(service => service.active);
    },
    //determines if a service checkbox is checked by the time the list of service checkboxes render on the page
    isAnEventService() {
      return (serviceId) => {
        return this.eventServices.some(service => service.id === serviceId)
      }
  }
  },
  methods: {
    // better formatted date, converts UTC to local time
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toISODate()
    },
    //method called when user clicks on a client row in "List of Attendees" section. It pushes the user to "ViewClient.vue" with the client ID as a parameter so they may view the selected client, not edit.
    goToClient(clientID) {
      this.$router.push({ name: 'viewclient', params: { id: clientID } })
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