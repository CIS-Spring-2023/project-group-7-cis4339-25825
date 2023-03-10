<template>
  <main>
    <div v-if="userRole">
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Welcome, {{ userName }}
      </h1>
      <br />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div class="ml-10"></div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Event Name</th>
                <th class="p-4 text-left">Event Date</th>
                <th class="p-4 text-left">Number of Attendees</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="editEvent(event.id)"
                v-for="event in organizationEvents"
                :key="event.id"
                class="cursor-pointer"
                :class="{ 'hoverRow': hoverId === event.id }"
                @mouseenter="hoverId = event.id"
                @mouseleave="hoverId = null"
              >
                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                <td class="p-2 text-left">{{ clientCounts[event.id] }}</td>
              </tr>
            </tbody>
          </table>
          <div>
            <AttendanceChart
              :label="labels"
              :chart-data="chartData"
            ></AttendanceChart>
          </div>
          <div>
            <clientChart :label="pieLabels" :chart-data="pieChartData"/>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Welcome
      </h1>
      <br />
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div class="ml-10"></div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr class="p-4 text-left">
                <th class="p-4 text-left">Event Name</th>
                <th class="p-4 text-left">Event Date</th>
                <th class="p-4 text-left">Number of Attendees</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
                <tr
                    v-for="event in allEvents"
                    :key="event.id"
                >
                    <td class="p-2 text-left">{{ event.name }}</td>
                    <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                    <td class="p-2 text-left">{{ clientCountsAllOrgs[event.id] }}</td>
                </tr>
            </tbody>
          </table>
          <div>
            <AttendanceChart
              :label="labels"
              :chart-data="chartData"
            ></AttendanceChart>
          </div>
          <div>
            <clientChart :label="pieLabels" :chart-data="pieChartData"/>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { DateTime } from 'luxon'
import axios from 'axios'
import AttendanceChart from '../components/barChart.vue'
import clientChart from '../components/pieChart.vue'
const apiURL = import.meta.env.VITE_ROOT_API
import { mapState } from 'vuex'

export default {
  components: {
    AttendanceChart,
    clientChart
  },
  computed: {
    ...mapState(['organizationEvents', 'organizationEventClients', 'organizations', 'userRole', 'organizationServices', 'organizationClients', 'userName']),
    allEvents() {
        const events = []
        this.organizations.forEach(org => {
          events.push(...org.events)
        })
        return events
    },
    clientCountsAllOrgs() {
        const counts = {};
        this.organizations.forEach((organization) => {
            organization.events.forEach((event) => {
            const eventClients = organization.eventClients.find((ec) => ec.eventId === event.id);
            if (eventClients) {
                counts[event.id] = eventClients.clientIds.length;
            } else {
                counts[event.id] = 0;
            }
            });
        });
        return counts;
    },
    clientCounts() {
      const counts = {};
      this.organizationEventClients.forEach((event) => {
        counts[event.eventId] = event.clientIds.length;
      });
      return counts;
    },
  },
  data() {
    return {
      recentEvents: [],
      labels: [],
      chartData: [],
      pieLabels: [],
      pieChartData: [],
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  created() {
    this.fillChartData()
  },
  methods: {
    fillChartData() {
        if (this.userRole) {
            this.labels = this.organizationEvents.map(event => event.name)
            this.chartData = this.organizationEventClients.map(event => event.clientIds.length)
            
            //fill pieLabels and pieChartData for pie chart
            const zipCounts = {}
            this.organizationClients.forEach((client) => {
              if (zipCounts[client.zip]) {
                zipCounts[client.zip] += 1
              } 
              else {
                zipCounts[client.zip] = 1
              }
            })
            this.pieLabels = Object.keys(zipCounts)
            this.pieChartData = Object.values(zipCounts)
        }
        else {
          this.organizations.forEach(org => {
            this.labels.push(...org.events)
          })
          this.labels = this.labels.map(event => event.name)
          
          // Flatten the "events" array of each organization into a single array
          const events = [].concat(...this.organizations.map(org => org.events));

          // Get the number of clientIds for each event
          this.chartData = events.map(event => {
            const eventClients = this.organizations
              .flatMap(org => org.eventClients)
              .find(ec => ec.eventId === event.id);
            return eventClients ? eventClients.clientIds.length : 0;
          })

          //fill pieLabels and pieChartData for users not logged in
          const uniqueZips = this.organizations
            .flatMap(org => org.clients)
            .map(client => client.zip)
            .filter((zip, index, zips) => zips.indexOf(zip) === index);

          this.pieLabels = uniqueZips;

          this.pieChartData = uniqueZips.map(zip => {
            return this.$store.state.organizations
              .flatMap(org => org.clients)
              .reduce((count, client) => {
                return client.zip === zip ? count + 1 : count;
              }, 0)
          })
        }
    },
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    // method to allow click through table to event details
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