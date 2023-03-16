<template>
    <main>
      <!--Header-->
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        View Client
      </h1>
      <div class="px-10 py-20">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Personal Details</h2>
          <!-- First name field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">First Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="client.firstName"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>

          <!-- Middle name field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Middle Name</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="client.middleName"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>

          <!-- Last name field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Last Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="client.lastName"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <div></div>
          <!-- Email field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Email</span>
              <input
                type="email"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                v-model="client.email"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <!-- Phone number field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Phone Number</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                v-model="client.phone"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <!-- Alternative phone number field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Alternative Phone Number</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                v-model="client.altPhone"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
        </div>

        <!-- grid container -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Address Details</h2>
          <!-- Address 1 field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address1"
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
                v-model="client.address2"
                style="color: gray; font-style: italic;"
                disabled
                />
            </label>
          </div>
          <!-- City field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">City</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.city"
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
                v-model="client.county"
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
                v-model="client.zip"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <div></div>
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

        <!-- Client Event Information -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div>
            <h2 class="text-2xl font-bold">Events for Client</h2>
            <h3 class="italic">Click table row to display an entry</h3>
          </div>
          <div class="flex flex-col col-span-2">
            <table class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr>
                  <th class="p-4 text-left">Event Name</th>
                  <th class="p-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                <!-- allow click through to event details -->
                <tr
                  @click="goToEvent(event.id)"
                  v-for="event in clientEvents"
                  :key="event.id"
                  class="cursor-pointer"
                  :class="{ 'hoverRow': hoverId === event.id }"
                  @mouseenter="hoverId = event.id"
                  @mouseleave="hoverId = null"
                >
                  <td class="p-2 text-left">{{ event.name }}</td>
                  <td class="p-2 text-left">
                    {{ formattedDate(event.date) }}
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
  //client ID accepted from parent components, either "FindClient.vue" or "ViewEvent.vue"
  props: ['id'],
  data() {
    return {
      //variable to hold all events that the client is associated with
      clientEvents: [],    
      //variable to hold client information  
      client: {
        id: null,
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phone: '',
        altPhone: '',
        address1: '',
        address2: '',
        city: '',
        county: '',
        zip: ''
      },
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  computed: {
    //computed states so they can be referenced in code
    ...mapState(['organizationClients', 'organizationEvents', 'organizationEventClients']),
  },
  //when component is mounted
  mounted() {
    //scroll to the top
    window.scrollTo(0, 0)
    //create temporary variable to store the client ID from the parent component - this.$route.params.id stores the ID as a string so parseInt converts it to a number
    const clientId_temp = parseInt(this.$route.params.id)
    //create temporary client variable to store an array of all information for the selected client
    const client_temp = this.organizationClients.find(e => e.id === clientId_temp)
    //distribute the temporary client variable to the client variable that the input fields use. This is how the client information is already present in the input fields when the view renders on the page
    this.client.id = clientId_temp
    this.client.firstName = client_temp.firstName
    this.client.middleName = client_temp.middleName
    this.client.lastName = client_temp.lastName
    this.client.email = client_temp.email
    this.client.phone = client_temp.phone
    this.client.altPhone = client_temp.altPhone
    this.client.address1 = client_temp.address1
    this.client.address2 = client_temp.address2
    this.client.city = client_temp.city
    this.client.county = client_temp.county
    this.client.zip = client_temp.zip
    this.client.eventIds = client_temp.eventIds
    //set clientEvents to an array containing Event IDs
    this.clientEvents = this.organizationEventClients
      .filter(ec => ec.clientIds.includes(this.client.id))
      .map(ec => ec.eventId)
    //set clientEvents to hold info on all Events related to Client
    this.clientEvents = this.organizationEvents.filter(event => this.clientEvents.includes(event.id))
  },
  methods: {
    // better formattedDate function
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    //method called when user clicks on an event row in "Events for Client"
    goToEvent(eventID) {
      //push user to "ViewEvent.vue" with the event ID as a parameter, where the user may view the edit information, not edit
      this.$router.push({ name: 'viewevent', params: { id: eventID } })
    }
  }
}
</script>

<style scoped>
  .hoverRow {
    background-color: rgba(255, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;
  }
</style>