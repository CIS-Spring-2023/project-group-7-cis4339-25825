<template>
    <main>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Update Client
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
              @click="submitUpdateClient"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Client
            </button>
          </div>
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="submitDeleteClient"
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
  components: { VueMultiselect },
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
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
      }
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
    async submitUpdateClient() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {

        // Dispatch the mutation to update the client information in the store
        this.$store.commit('updateClient', this.client)

        // Reset the client object
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
            zip: ''
        }

        // Show a success message
        alert('Update has been saved.')

        // Navigate back to the previous page
        this.$router.back()
      }
    },
    addToEvent() {
        const eventIdsToAdd = this.eventsSelected.map(event => event.id)
        
        //add client to events
        this.$store.commit('addClientToEvents', { eventId: eventIdsToAdd, clientIdToAdd: this.client.id });


        // Update clientEvents to show updated list
        //clientEvents into an array containing Event IDs
        this.clientEvents = this.organizationEventClients
          .filter(ec => ec.clientIds.includes(this.client.id))
          .map(ec => ec.eventId)
        //clientEvents to hold info on all Events related to Client
        this.clientEvents = this.organizationEvents.filter(event => this.clientEvents.includes(event.id))

        //reset eventsSelected so that, after the user clicks "Add Client to Selected Events" button, there will be no selection in the multiselect list
        this.eventsSelected = []

        //update eventsFiltered for multiselect
        this.eventsFiltered = this.organizationEventClients
          .filter(ec => !ec.clientIds.includes(this.client.id))
          .map(ec => ec.eventId)

        //eventsFiltered will hold info on Events not related to Client, to show on multiselect
        this.eventsFiltered = this.organizationEvents.filter(event => this.eventsFiltered.includes(event.id))
    },
    // replaces client hard delete
    // find all events where client appears in attendees array and pull it
    // then pull org from client org array
    deregisterClient() {

    },
    // hard delete method
    async submitDeleteClient() {
    // Dispatch the mutation to delete the client from the store
    this.$store.commit('deleteClient', this.client.id)

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
