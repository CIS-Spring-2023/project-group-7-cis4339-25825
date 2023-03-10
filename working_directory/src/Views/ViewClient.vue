<template>
    <main>
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
          <!-- form field -->
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

          <!-- form field -->
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

          <!-- form field -->
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
          <!-- form field -->
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
          <!-- form field -->
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
          <!-- form field -->
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
          <!-- form field -->
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
          <!-- form field -->
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
          <!-- form field -->
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
          <!-- form field -->
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
          <!-- form field -->
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
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import VueMultiselect from 'vue-multiselect'
import { DateTime } from 'luxon'
const apiURL = import.meta.env.VITE_ROOT_API
import { mapState, mapMutations } from 'vuex'

export default {
  props: ['id'],
  data() {
    return {
      // rename events arrays for added clarity
      // events that the client is not registered in
      eventsFiltered: [],
      // events that user selects from multiselect list
      eventsSelected: [],
      clientEvents: [],      
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
    ...mapState(['organizationClients', 'organizationEvents', 'organizationEventClients']),
    ...mapMutations(['updateClient']),
  },
  mounted() {
    window.scrollTo(0, 0)
    const clientId_temp = parseInt(this.$route.params.id)
    const client_temp = this.organizationClients.find(e => e.id === clientId_temp)
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
    //clientEvents into an array containing Event IDs
    this.clientEvents = this.organizationEventClients
      .filter(ec => ec.clientIds.includes(this.client.id))
      .map(ec => ec.eventId)
    //clientEvents to hold info on all Events related to Client
    this.clientEvents = this.organizationEvents.filter(event => this.clientEvents.includes(event.id))

    //For the multi select, it will only show the selection of events client is not registered in
     this.eventsFiltered = this.organizationEventClients
      .filter(ec => !ec.clientIds.includes(this.client.id))
      .map(ec => ec.eventId)

    //eventsFiltered will hold info on Events not related to Client, to show on multiselect
    this.eventsFiltered = this.organizationEvents.filter(event => this.eventsFiltered.includes(event.id))

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
    nameWithDate({ name, date }) {
      return `${name} (${this.formattedDate(date)})`
    },
    goToEvent(eventID) {
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