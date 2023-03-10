<template>
    <main>
      <div>
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
          <!-- Displays Client Name search field -->
          <div class="flex flex-col">
            <select
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="searchBy"
            >
              <option value="Event Name">Event Name</option>
              <option value="Event Date">Event Date</option>
            </select>
          </div>
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
          <div class="mt-5 grid-cols-2">
            <button
              class="mr-10 border border-red-700 bg-white text-red-700 rounded"
              @click="clearSearch"
              type="submit"
            >
              Clear Search
            </button>
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
        <div class="ml-10">
          <h2 class="text-2xl font-bold">List of Events</h2>
          <h3 class="italic">
            <span v-if="userRole === 'editor'">Click table row to edit/display an entry</span>
            <span v-if="userRole === 'viewer'">Click table row to display an entry</span>
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
                @click="editEvent(event.id)"
                v-for="event in events"
                :key="event.id"
                class="cursor-pointer"
                :class="{ 'hoverRow': hoverId === event.id }"
                @mouseenter="hoverId = event.id"
                @mouseleave="hoverId = null"
              >
                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                <td class="p-2 text-left">{{ event.address }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>

<script>
import { DateTime } from 'luxon'
import { mapState } from 'vuex'

export default {
  data() {
    return {
        events: [],
      // Parameter for search to occur
      searchBy: '',
      name: '',
      eventDate: '',
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  computed: {
    ...mapState(['organizationId', 'organizationEvents', 'userRole'])
  },
  mounted() {
    this.setEvents() 
  },
  methods: {
    setEvents() {
        this.events = this.organizationEvents
    },
    // better formattedDate
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    handleSubmitForm() {
        if (this.searchBy === 'Event Name') {
            this.events = this.organizationEvents.filter((event) => event.name.toLowerCase().includes(this.name.toLowerCase()));
        } 
        else if (this.searchBy === 'Event Date') {
            this.events = this.organizationEvents.filter((event) => event.date === this.eventDate);
        }
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.eventDate = ''
      this.setEvents()
    },
    editEvent(eventID) {
      if (this.userRole === 'editor') {
        this.$router.push({ name: 'eventdetails', params: { id: eventID } })
      }
      else if (this.userRole === 'viewer') {
        this.$router.push({ name: 'viewevent', params: { id: eventID } })
      }
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