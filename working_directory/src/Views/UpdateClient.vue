<template>
    <main>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Update Client
      </h1>
      <div class="px-10 py-20">
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="handleSubmitForm">
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
                />
                <span class="text-black" v-if="v$.client.firstName.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.firstName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
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
                />
                <span class="text-black" v-if="v$.client.lastName.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.lastName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
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
                />
                <span class="text-black" v-if="v$.client.email.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.email.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
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
                />
                <span
                  class="text-black"
                  v-if="v$.client.phone.$error"
                >
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.phone.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
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
                @click="updateClient"
                type="submit"
                class="bg-green-700 text-white rounded"
              >
                Update Client
              </button>
            </div>
            <div class="flex justify-between mt-10 mr-20">
              <button
                @click="deleteClient"
                type="submit"
                class="bg-red-700 text-white rounded"
              >
                Delete Client
              </button>
            </div>
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
            <h2 class="text-2xl font-bold">Events for Client</h2>
  
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
                    @click="editEvent(event.id)"
                    v-for="event in clientEvents"
                    :key="event.id"
                    class="cursor-pointer"
                  >
                    <td class="p-2 text-left">{{ event.name }}</td>
                    <td class="p-2 text-left">
                      {{ formattedDate(event.date) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
  
            <div class="flex flex-col">
              <!-- fixed weird selection duplication bug -->
              <VueMultiselect
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="eventsSelected"
                :options="eventsFiltered"
                :custom-label="nameWithDate"
                :multiple="true"
                :close-on-select="true"
                placeholder="Select Events to be added"
                label="date"
                track-by="name"
              />
              <div class="flex justify-between">
                <button
                  @click="addToEvent"
                  type="submit"
                  class="mt-5 bg-red-700 text-white rounded"
                >
                  Add Client to Selected Events
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <p>All Clients: {{ clients }}</p>

      <p>Current Client: {{ client }}</p>

      <p>Client Event Ids: {{ client.eventIds }}</p>

      <p>All Events: {{ events }}</p>

      <p>Client Events: {{ clientEvents }}</p>

      <p>Events Selected: {{ eventsSelected }}</p>
    </main>
  </template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import VueMultiselect from 'vue-multiselect'
import { DateTime } from 'luxon'
const apiURL = import.meta.env.VITE_ROOT_API
import { mapState } from 'vuex'

export default {
  props: ['id'],
  components: { VueMultiselect },
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      // rename events arrays for added clarity
      events: [],
      // events that the client is not registered in
      eventsFiltered: [],
      eventsSelected: [],
      clientEvents: [],
      clients: [],
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
        zip: '',
        eventIds: []
      }
    }
  },
  computed: {
    ...mapState(['organizationClients', 'organizationEvents'])
  },
  created() {
    this.setEvents()
    this.setClients()
    const clientId_temp = parseInt(this.$route.params.id)
    console.log(clientId_temp)
    const client_temp = this.clients.find(e => e.id === clientId_temp)
    console.log(client_temp)
    this.client.id = clientId_temp
    console.log(client_temp.firstName)
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
    this.clientEvents = this.events.filter((event => this.client.eventIds.includes(event.id)))
    this.eventsFiltered = this.events.filter((event => !this.client.eventIds.includes(event.id)))

  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    setEvents() {
        this.events = this.organizationEvents
    },
    setClients() {
        this.clients = this.organizationClients
    },
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
    async updateClient() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        // Find the index of the client to update
        const clientIndex = this.organizationClients.findIndex(e => e.id === this.client.id)

        // If the client is not found, do nothing
        if (clientIndex === -1) {
            return
        }

        // Update the client in the original array
        this.organizationClients[clientIndex] = this.client

        // Reset the event object
        this.client = {
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
            zip: '',
            eventIds: []
        }

        // Show a success message
        alert('Update has been saved.')

        // Navigate back to the previous page
        this.$router.back()
      }
    },
    addToEvent() {
        const eventIdsToAdd = this.eventsSelected.map(event => event.id)
  
        // Add the new IDs to the existing array in client
        this.client.eventIds = this.client.eventIds.concat(eventIdsToAdd)
  
        // Reset eventsSelected array
        this.eventsSelected = []

        // Find the index of the client to update
        const clientIndex = this.organizationClients.findIndex(e => e.id === this.client.id)

        // If the client is not found, do nothing
        if (clientIndex === -1) {
            return
        }
        // Update the client in the original array
        this.organizationClients[clientIndex] = this.client

        // Update clientEvents to show updated list
        this.clientEvents = this.events.filter((event => this.client.eventIds.includes(event.id)))
    },
    // replaces client hard delete
    // find all events where client appears in attendees array and pull it
    // then pull org from client org array
    deregisterClient() {

    },
    // hard delete method
    deleteClient() {
        const clientIndex = this.clients.findIndex(e => e.id === this.client.id)

        // If the client is not found, do nothing
        if (clientIndex === -1) {
        return
        }

        // Remove the client from the original array
        this.clients.splice(clientIndex, 1)

        // Update the organizationClients in the store
        this.organizationClients = this.clients

        // Show a success message
        alert('Client has been deleted.')

        // Navigate to the find clients page
        this.$router.push({ name: 'findclient' })
    },
    // function to allow click through to event details
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    }
  },
  validations() {
    return {
      client: {
        firstName: { required, alpha },
        lastName: { required, alpha },
        email: { email },
        phone: { required, numeric }
      }
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
