<template>
    <main>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        View Service
      </h1>
      <div class="px-10 py-20">
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="handleSubmitForm">
          <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Service Details</h2>
            <!-- form field -->
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
  
            <!-- form field -->
            <div class="flex flex-col">
            <label>
              <span class="text-gray-700">Description:</span>
              <textarea class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="service.description"
              style="color: gray; font-style: italic;"
              disabled
              ></textarea>
            </label>
            </div>
  
            <div class="flex flex-col">
              <label>
                  <span class="text-gray-700">Active </span>
                  <input 
                      type="checkbox"
                      class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                      checked
                      v-model="service.active"
                      style="color: gray; font-style: italic;"
                      disabled
                      >
              </label>
  
            </div>
           
          </div>
  
          <!-- grid container -->
          <div
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
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
                @click="goToEvent(event.id)"
                v-for="event in serviceEvents"
                :key="event.id"
                class="cursor-pointer"
                :class="{ 'hoverRow': hoverId === event.id }"
                @mouseenter="hoverId = event.id"
                @mouseleave="hoverId = null"
              >
                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                <td class="p-2 text-left">{{ event.address1 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import { DateTime } from 'luxon'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      service: {
        id: null,
        name: '',
        description: '',
        active: true
      },
      services: [],
      events: [],
      //all the Event Ids that host the service
      serviceEventIds: [],
      // information on the Events that host the service
      serviceEvents: [],
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  mounted() {
    //this.$route.params.id returns a string, so parseInt converts it to an integer
    const serviceId_temp = parseInt(this.$route.params.id)
    const service_temp = this.organizationServices.find(e => e.id === serviceId_temp)
    if (service_temp) {
        this.service.id = serviceId_temp
        this.service.name = service_temp.name
        this.service.description = service_temp.description
        this.service.active = service_temp.active
        this.service.eventIds = service_temp.eventIds
        //get event Ids that host the service
        this.serviceEventIds = this.organizationEventServices
          .filter(event => event.serviceIds.includes(this.service.id))
          .map(event => event.eventId)
        //using the event Ids that host the service, get information on those events and store them in a variable. This is so we can output the event name, event date, and event address on the page
        this.serviceEvents = this.organizationEvents.filter(event => this.serviceEventIds.includes(event.id));

    }
  },
  //remember to put computed on top, as it comes before everything else
  computed: {
    ...mapState(['organizationServices', 'organizationEvents', 'organizationEventServices'])
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