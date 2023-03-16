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
          <!--Bar chart showing events and number of attendees per event for the user's organization-->
          <div>
            <AttendanceChart
              :label="labels"
              :chart-data="chartData"
            ></AttendanceChart>
          </div>
          <!--Pie chart showing zip codes and number of clients per zip code for the user's organization-->
          <div>
            <clientChart :label="pieLabels" :chart-data="pieChartData"/>
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
                    v-for="event in allEvents"
                    :key="event.id"
                >
                    <td class="p-2 text-left">{{ event.name }}</td>
                    <td class="p-2 text-left">{{ formattedDate(event.date) }}</td>
                    <td class="p-2 text-left">{{ clientCountsAllOrgs[event.id] }}</td>
                </tr>
            </tbody>
          </table>
          <!--Bar chart showing events and the number of attendees per event for all organizations-->
          <div>
            <AttendanceChart
              :label="labels"
              :chart-data="chartData"
            ></AttendanceChart>
          </div>
          <!--Pie chart showing zip codes and number of clients per zip code for all organizations-->
          <div>
            <clientChart :label="pieLabels" :chart-data="pieChartData"/>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
//import functionalities
import { DateTime } from 'luxon'
import AttendanceChart from '../components/barChart.vue'
import clientChart from '../components/pieChart.vue'
import { mapState } from 'vuex'

export default {
  //allow bar chart and pie chart
  components: {
    AttendanceChart,
    clientChart
  },
  computed: {
    //computed states so they can be referenced in code
    ...mapState(['organizationEvents', 'organizationEventClients', 'organizations', 'userRole', 'organizationClients', 'userName']),
    //computed function that shows list of all events if user is logged out
    allEvents() {
        const events = []
        this.organizations.forEach(org => {
          events.push(...org.events)
        })
        return events
    },
    //computed function that shows the number of clients per event for all organizations when the user is logged out
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
    //computed function to show the number of clients per event for the user's organization when the user is logged in
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
      //variable to hold labels for bar chart - this will be passed as a prop to the AttendanceChart component
      labels: [],
      //variable to hold data for bar chart - this will be passed as a prop to the AttendanceChart component
      chartData: [],
      //variable to hold labels for pie chart - this will be passed as a prop to the clientChart component
      pieLabels: [],
      //variable to hold data for pie chart - this will be passed as a prop to the clientChart component
      pieChartData: [],
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  created() {
    //when component is created, fillChartData method will be called
    this.fillChartData()
  },
  methods: {
    //method called when component is created. It sets up the bar chart and the pie chart
    fillChartData() {
      //if user is logged in
        if (this.userRole) {
            //labels for the bar chart will be the event names of the user's organization
            this.labels = this.organizationEvents.map(event => event.name)
            //data for the bar chart will be the number of clients per event for the user's organization
            this.chartData = this.organizationEventClients.map(event => event.clientIds.length)
            
            //fill pieLabels and pieChartData for pie chart
            const zipCounts = {}
            //fetch all zip codes from all clients for the user's organization
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
        //if user is logged out
        else {
          //fill "labels" variable will all events and their information for all organizations
          this.organizations.forEach(org => {
            this.labels.push(...org.events)
          })
          //cut down "labels" variable to only the event names
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
    //format the date
    formattedDate(datetimeDB) {
      const dt = DateTime.fromISO(datetimeDB, {
        zone: 'utc'
      })
      return dt
        .setZone(DateTime.now().zoneName, { keepLocalTime: true })
        .toLocaleString()
    },
    // method called when user clicks on an event row in the list of events - can only be called when user is logged in
    editEvent(eventID) {
      //if user is an editor, this will push to "EventDetails.vue" with the event ID as a parameter. There, the user can view and edit the event information.
      if (this.userRole === 'editor') {
        this.$router.push({ name: 'eventdetails', params: { id: eventID } })
      }
      //if user is a viewer, this will push to "ViewEvent.vue" with the event ID as a parameter. There, the user can only view the event information, not edit.
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