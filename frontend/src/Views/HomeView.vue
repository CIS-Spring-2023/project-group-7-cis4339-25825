<!-- This is the dashboard page. It shows a list of recent events, a pie chart of client zip codes, and a bar chart of events and the number of attendees -->

<template>
  <main>
<!--Section that shows if user is logged in-->
<div v-if="userRole">
  <!-- Header -->
  <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
    Welcome, {{ userName }}
  </h1>
  <br />
  <!-- Recent Events Table -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="col-span-1">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Recent Events</h2>
        <div class="mx-auto max-w-lg">
          <table class="w-full">
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
        </div>
      </div>
    </div>
    <!-- Pie Chart -->
    <div class="col-span-1">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Clients by Zip Code</h2>
        <div class="mx-auto max-w-md">
          <div v-if="pieLabels && pieChartData">
            <clientChart :label="pieLabels" :chart-data="pieChartData" />
          </div>
        </div>
      </div>
    </div>
    <!-- Bar Chart -->
    <div class="col-span-2">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Number of Attendees by Event</h2>
        <div class="mx-auto max-w-3xl">
          <div v-if="labels && chartData">
            <AttendanceChart :label="labels" :chart-data="chartData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



<!--Section that shows if user is logged out-->
<div v-else>
  <!-- Header -->
  <h1 class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10">
    Welcome
  </h1>
  <br />
  <!-- Recent Events Table -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="col-span-1">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Recent Events</h2>
        <div class="mx-auto max-w-lg">
          <table class="w-full">
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
        </div>
      </div>
    </div>

    <!-- Pie Chart -->
    <div class="col-span-1">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Clients by Zip Code</h2>
        <div class="mx-auto max-w-md">
          <div v-if="pieLabels && pieChartData">
            <clientChart :label="pieLabels" :chart-data="pieChartData" />
          </div>
          <div v-else>
            Loading data...
          </div>
        </div>
      </div>
    </div>

    <!-- Bar Chart -->
    <div class="col-span-2">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">Number of Attendees by Event</h2>
        <div class="mx-auto max-w-3xl">
          <div v-if="labels && chartData">
            <AttendanceChart :label="labels" :chart-data="chartData" />
          </div>
          <div v-else>
            Loading data...
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

    <!-- Loading wheel appears when API calls are being made -->  
    <div>
      <LoadingModal v-if="isLoading"></LoadingModal>
    </div>

    <!-- Success modal appears after user successfully logs in -->
    <Transition name="bounce">
        <SuccessModal v-if="successModal" @close="closeSuccessModal" :title="title" :message="message" />
    </Transition>

  </main>
</template>

<script>
// import modal components
import LoadingModal from '../components/LoadingModal.vue'
import SuccessModal from '../components/SuccessModal.vue'
// import bar chart
import AttendanceChart from '../components/barChart.vue'
// import pie chart
import clientChart from '../components/pieChart.vue'
// Import functionality to reference session states
import { mapState } from 'vuex'
// Import API calls
import { getAllRecentEvents, getAllClients, getOrgRecentEvents, getOrgClients } from '../../api/api'

export default {
  // allow modal components
    components: {
        AttendanceChart,
        clientChart,
        LoadingModal,
        SuccessModal,
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
          // variable to hold recent events
          recentEvents: null,
          // variable to hold clients
          clients: null,
          // variable that determines if loading wheel appears
          isLoading: true,
          // variable that determines if SuccessModal appears
          successModal: false,
          // title and message variables to be shown in the modal components
          title: "",
          message: ""
        }
  },
  computed: {
    //computed states so they can be referenced in code
    ...mapState(['role', 'username']),
    // computed function to return the user role -> null is user is not logged in
    userRole() {
      return this.role ? this.role : null;
    },
    // computed function to return the user's username -> null if user is not logged in
    userName() {
        return this.username ? this.username: null;
    },
  },

  async mounted() {
    // if user is logged in
    if (this.role) {
      // load data
      await this.loadOrgData();
      const query = new URLSearchParams(this.$route.query);
      // show success modal when user logs in
      if (query.get('success') === 'true') {
        this.successModal = true;
        this.title = "Login Success!"
        this.message = "Welcome, " + this.username;
      }
    // if user is not logged in
    } else {
      await this.loadAllData();
    }
  },

  methods: {
    // method called when user is logged in
    async loadOrgData() {
      this.isLoading = true;
        try {
            const [eventsResponse, clientsResponse] = await Promise.all([
                getOrgRecentEvents(),
                getOrgClients(),
            ]);
            this.recentEvents = eventsResponse;
            this.clients = clientsResponse;


            // load bar chart and pie chart
            this.getChartData();
            this.getPieData();
        } catch (error) {
            console.log('loadOrgData error', error)
        }
        this.isLoading = false;
    },
    // method called when user is not logged in
    async loadAllData() {
      this.isLoading = true;
        try {
            const [eventsResponse, clientsResponse] = await Promise.all([
                getAllRecentEvents(),
                getAllClients(),
            ]);

            this.recentEvents = eventsResponse;
            this.clients = clientsResponse;

            // load bar chart and pie chart
            this.getChartData();
            this.getPieData();
        } catch (error) {
            console.log('loadAllData error:', error)
        }
        this.isLoading = false;
    },
    // method to fill bar chart with labels and data
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
    // method to fill pie chart with labels and data
    getPieData() {
      const zipCodes = [];
      const counts = {};

      // Loop through all clients to get unique zip codes and count clients with each zip code
      this.clients.forEach((client) => {
          const zipCode = client.address.zip;

          if (zipCode !== null) {
              if (!zipCodes.includes(zipCode)) {
                zipCodes.push(zipCode);
              }

              if (!counts[zipCode]) {
                counts[zipCode] = 1;
              } else {
                counts[zipCode]++;
              }
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

    // method called for each event in the table -> formats date correctly
    formatDate(date) {
        const isoDate = new Date(date);
        const year = isoDate.getUTCFullYear();
        const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
        const day = String(isoDate.getUTCDate()).padStart(2, '0');
        return `${month}/${day}/${year}`;
    },

    // method called when user clicks on an event row in the list of events - can only be called when user is logged in
    editEvent(eventID) {
      //if user is an editor, this will push to "EventDetails.vue" with the event ID as a parameter. There, the user can view and edit the event information.
      if (this.role === 'editor') {
        this.$router.push({ name: 'eventdetails', params: { id: eventID }, query: { dash: true } })
      }
      //if user is a viewer, this will push to "ViewEvent.vue" with the event ID as a parameter. There, the user can only view the event information, not edit.
      else if (this.role === 'viewer') {
        this.$router.push({ name: 'viewevent', params: { id: eventID }, query: { dash: true } })
      }
    },

    // method to close SuccessModal
    closeSuccessModal() {
        this.successModal = false;
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