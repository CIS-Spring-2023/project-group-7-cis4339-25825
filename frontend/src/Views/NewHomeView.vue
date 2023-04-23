<template>
  <main>
        <!--Section that shows if user is logged in-->
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
      <!--Table showing list of events for the user's organization-->
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
                @click="editEvent(event._id)"
                v-for="event in recentEvents"
                :key="event._id"
                class="cursor-pointer"
                :class="{ 'hoverRow': hoverId === event._id }"
                @mouseenter="hoverId = event._id"
                @mouseleave="hoverId = null"
              >
                <td class="p-2 text-left">{{ event.name }}</td>
                <td class="p-2 text-left">{{ formatDate(event.date) }}</td>
                <td class="p-2 text-left">{{ event.attendees.length }}</td>
              </tr>
            </tbody>
          </table>
          <!--Bar chart showing events and the number of attendees per event for all organizations-->
          <div>
            <div v-if="labels && chartData">
                <AttendanceChart
                :label="labels"
                :chart-data="chartData"
                ></AttendanceChart>
            </div>
            <div v-else>
                Loading data... (set loading wheel)
            </div>
          </div>
          <div>
            <div v-if="pieLabels && pieChartData">
                <clientChart :label="pieLabels" :chart-data="pieChartData"/>
            </div>
            <div v-else>
                Loading data... (set loading wheel)
            </div>
          </div>
        </div>
      </div>
    </div>
        <!--Section that shows if user is logged out-->
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
      <!--List of Events for all organizations-->
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
                    v-for="event in recentEvents"
                    :key="event._id"
                    :class="{ 'hoverRow': hoverId === event._id }"
                    @mouseenter="hoverId = event._id"
                    @mouseleave="hoverId = null"
                >
                    <td class="p-2 text-left">{{ event.name }}</td>
                    <td class="p-2 text-left">{{ formatDate(event.date) }}</td>
                    <td class="p-2 text-left">{{ event.attendees.length }}</td>
                </tr>
            </tbody>
          </table>
          <!--Bar chart showing events and the number of attendees per event for all organizations-->
          <div>
            <div v-if="labels && chartData">
                <AttendanceChart
                :label="labels"
                :chart-data="chartData"
                ></AttendanceChart>
            </div>
            <div v-else>
                Loading data... (set loading wheel)
            </div>
          </div>
          <div>
            <div v-if="pieLabels && pieChartData">
                <clientChart :label="pieLabels" :chart-data="pieChartData"/>
            </div>
            <div v-else>
                Loading data... (set loading wheel)
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <p>userRole: {{ userRole }}</p>
</template>

<script>
//import functionalities
import { DateTime } from 'luxon'
import AttendanceChart from '../components/barChart.vue'
import clientChart from '../components/pieChart.vue'
import { mapState } from 'vuex'
import { getAllRecentEvents, getAllClients, getOrgRecentEvents, getOrgClients } from '../../api/api'

export default {
    components: {
        AttendanceChart,
        clientChart
    },
    data() {
        return {
        //variable to hold labels for bar chart - this will be passed as a prop to the AttendanceChart component
        labels: null,
        //variable to hold data for bar chart - this will be passed as a prop to the AttendanceChart component
        chartData: null,
        //variable to hold labels for pie chart - this will be passed as a prop to the clientChart component
        pieLabels: null,
        //variable to hold data for pie chart - this will be passed as a prop to the clientChart component
        pieChartData: null,
        // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
        hoverId: null,
        recentEvents: null,
        clients: null
        }
  },
  computed: {
    ...mapState(['role', 'username']),
    userRole() {
      return this.role ? this.role : null;
    },
    userName() {
        return this.username ? this.username: null;
    },
  },

  mounted() {
    if (this.role) {
      // The 'role' state is not set, do something here
      console.log('Dashboard mounted with role')
      this.loadOrgData();
    } else {
        console.log('Dashboard mounted with no role')
        this.loadAllData();
    }
  },

  methods: {
    async loadOrgData() {
        try {
            const [eventsResponse, clientsResponse] = await Promise.all([
                getOrgRecentEvents(),
                getOrgClients(),
            ]);

            console.log('loadOrgData eventsResponse', eventsResponse);
            console.log('loadOrgData clients', clientsResponse);

            this.recentEvents = eventsResponse;
            this.clients = clientsResponse;

            this.getChartData();
            this.getPieData();
        } catch (error) {
            console.log('loadOrgData error', error)
        }
    },
    async loadAllData() {
        try {
            const [eventsResponse, clientsResponse] = await Promise.all([
                getAllRecentEvents(),
                getAllClients(),
            ]);

            console.log('loadAllData eventsResponse', eventsResponse);
            console.log('loadAllData clients', clientsResponse);

            this.recentEvents = eventsResponse;
            this.clients = clientsResponse;

            this.getChartData();
            this.getPieData();
        } catch (error) {
            console.log('loadAllData error:', error)
        }
    },
    getChartData() {
      const labels = [];
      const data = [];
      this.recentEvents.forEach((event) => {
        labels.push(event.name);
        data.push(event.attendees.length);
      });
      this.labels = labels;
      this.chartData = data;
    },
    getPieData() {
    const zipCodes = [];
    const counts = {};

    // Loop through all clients to get unique zip codes and count clients with each zip code
    this.clients.forEach((client) => {
        const zipCode = client.address.zip;

        if (!zipCodes.includes(zipCode)) {
        zipCodes.push(zipCode);
        }

        if (!counts[zipCode]) {
        counts[zipCode] = 1;
        } else {
        counts[zipCode]++;
        }
    });

    // Create arrays for the labels and data to be used in the pie chart
    const labels = [];
    const data = [];

    zipCodes.forEach((zipCode) => {
        labels.push(zipCode);
        data.push(counts[zipCode]);
    });

    this.pieLabels = labels;
    this.pieChartData = data;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
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