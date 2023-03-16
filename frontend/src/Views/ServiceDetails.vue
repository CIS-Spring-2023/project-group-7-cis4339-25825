<template>
    <main>
      <!--Header-->
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Update Service
      </h1>
      <div class="px-10 py-20">
        <!--Form-->
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="handleSubmitForm">
          <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Service Details</h2>
            <!-- Service Name input field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Service Name</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="service.name"
                />
                <!--Shows errors, if any-->
                <span class="text-black" v-if="v$.service.name.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.service.name.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
              </label>
            </div>
  
            <!-- Description input field -->
            <div class="flex flex-col">
            <label>
              <span class="text-gray-700">Description:</span>
              <textarea class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" v-model="service.description"></textarea>
            </label>
            </div>
  
            <div class="flex flex-col">
              <!--Active status checkbox-->
              <label>
                  <span class="text-gray-700">Active </span>
                  <input 
                      type="checkbox"
                      class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                      checked
                      v-model="service.active"
                      >
              </label>
  
            </div>
           
          </div>
  
          <!-- grid container -->
          <div
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <!-- Update Service button -->
            <div class="flex justify-between mt-10 mr-20">
                <div class="flex justify-between mt-10 mr-25">
                    <button
                        @click="handleUpdateService"
                        type="submit"
                        class="bg-green-700 text-white rounded"
                    >
                        Update Service
                </button>
                </div>
            </div>
            <!--Go back button-->
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
      <!--List of Events table-->
        <div class="ml-10">
          <h2 class="text-2xl font-bold">List of Events</h2>
          <h3 class="italic">Click table row to edit/display an entry</h3>
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

      <!--Modal component that shows when service is updated-->
      <div v-if="showServiceUpdatedModal">
        <modalComponent @close="serviceUpdatedPush">
          <template v-slot:serviceUpdatedSlot>
            Service Updated!
            <p>Redirecting...</p>
          </template>
        </modalComponent>
      </div>
    </main>
  </template>

<script>
//import functionalities
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { DateTime } from 'luxon'
import { mapState } from 'vuex'
import modalComponent from '../components/modalComponent.vue'

export default {
  setup() {
    //setup vuelidate
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  //allow components
  components: {
    modalComponent
  },
  data() {
    return {
      service: {
        id: null,
        name: '',
        description: '',
        active: true
      },      
      //all the Event Ids that host the service
      serviceEventIds: [],
      // information on the Events that host the service
      serviceEvents: [],
      //variable that controls the modal component
      showServiceUpdatedModal: false,
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  computed: {
    //computed states so they can be referenced in code
    ...mapState(['organizationServices', 'organizationEvents', 'organizationEventServices'])
  },
  mounted() {
    //create temporary variable to hold the service ID - this.$route.params.id returns a string, so parseInt converts it to an integer
    const serviceId_temp = parseInt(this.$route.params.id)
    //create temporary variable to hold service information - search through all the organization's services to find the right service
    const service_temp = this.organizationServices.find(e => e.id === serviceId_temp)
    //if service found, assign the "service" variable will service information - this is how the input fields are already filled with existing information when user is redirected to this page
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
    //method called when user updates the service either by clicking "Update Service" button or pressing enter in an input field
    async handleUpdateService() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        //call the "updateService" mutation from /store/index.js which will update the service for the user's organization
        this.$store.commit('updateService', this.service)
        // If changed to inactive, then the Service will be removed from every item in organizationEventServices
        if (!this.service.active) {
          this.$store.commit('deregisterService', this.service.id)
        }
        //show the modal component that displays the service was successfully updated
        this.showServiceUpdatedModal = true
      }
    },
    //when modal component displaying the service was updated emits a 'close' event, this method is called.
    serviceUpdatedPush() {
      this.showServiceUpdatedModal = false
      // Navigate back to the previous page
      this.$router.back()
    },
    //method called when user clicks on an event row in the "List of Events" section. It redirects them to "EventDetails.vue" with the event ID as a parameter where they may view and edit the event
    editEvent(eventID) {
        this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    },
  },
  // sets validations for the various data properties
  validations() {
    return {
      service: {
        name: { required }
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