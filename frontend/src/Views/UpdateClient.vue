<template>
    <main>
      <!--Header-->
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
          <!-- First Name input field -->
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
              <!--Shows errors, if any-->
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

          <!-- Middle name input field -->
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

          <!-- Last Name input field -->
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
              <!--Shows errors, if any-->
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
          <!-- Email input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Email</span>
              <input
                type="email"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                v-model="client.email"
              />
              <!--Shows errors, if any-->
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
          <!-- Phone number input field -->
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
              <!--Shows errors, if any-->
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
          <!-- Alternative phone number input field -->
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
          <!-- Address 1 input field -->
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
          <!-- Address 2 input field -->
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
          <!-- City input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">City</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.city"
              />
              <!--Shows errors, if any-->
              <span
                class="text-black"
                v-if="v$.client.city.$error"
              >
                <p
                  class="text-red-700"
                  v-for="error of v$.client.city.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>
          <div></div>
          <!-- County input field -->
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
          <!-- Zip code input field -->
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
        <!--Update Client submit button-->
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="submitUpdateClient"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Client
            </button>
          </div>
          <!--Delete Client button-->
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="submitDeleteClient"
              type="submit"
              class="bg-red-700 text-white rounded"
            >
              Delete Client
            </button>
          </div>
          <!--Go back button-->
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
          <!--List of Events for Client-->
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

          <div class="flex flex-col">
            <!--MultiSelect to add client to events-->
            <VueMultiselect
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 cursor-pointer"
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
              <!--button to add client to events-->
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

      <div>
        <!--modal component showing that a client was deleted-->
        <modalComponent v-if="showClientDeletedModal" @close="clientDeletedPush">
          <template v-slot:clientDeletedSlot>
            Client Deleted!
            <p>Redirecting...</p>
          </template>
        </modalComponent>
        <!--modal component showing that a client was updated-->
        <modalComponent v-if="showClientUpdatedModal" @close="clientUpdatedPush">
          <template v-slot:clientUpdatedSlot>
            Client Updated!
            <p>Redirecting...</p>
          </template>
        </modalComponent>
      </div>
    </main>
  </template>

<script>
//import functionalities
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import VueMultiselect from 'vue-multiselect'
import { DateTime } from 'luxon'
import { mapState, mapMutations } from 'vuex'
import modalComponent from '../components/modalComponent.vue'

export default {
  //accept client ID as data from parent components, either "FineClient.vue" or "EventDetails.vue"
  props: ['id'],
  //allow components
  components: { 
    VueMultiselect,
    modalComponent
   },
  setup() {
    //setup vuelidate
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      // events that the client is not registered in - to be shown in the multiselect
      eventsFiltered: [],
      // events that user selects from multiselect list
      eventsSelected: [],
      //variable to hold the events that the selected client is associated with
      clientEvents: [],      
      //variable to hold the client's information
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
      //variable to show the modal component that displays the client was deleted
      showClientDeletedModal: false,
      //variable to show the modal component that displays the client was updated
      showClientUpdatedModal: false,
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  computed: {
    //computed states so they can be referenced in code
    ...mapState(['organizationClients', 'organizationEvents', 'organizationEventClients']),
    //computed mutations so they can be referenced in code
    ...mapMutations(['updateClient']),
  },
  //when component is mounted
  mounted() {
    //scroll to the top
    window.scrollTo(0, 0)
    //create temporary variable to store the client ID from the parent component - this.$route.params.id stores the ID as a string so parseInt converts it to a number
    const clientId_temp = parseInt(this.$route.params.id)
    //create temporary client variable to store an array of all information for the selected client
    const client_temp = this.organizationClients.find(e => e.id === clientId_temp)
    //distribute the temporary client variable to the client variable that the input fields use. This is how the client information is already present in the input fields when the view renders on the page
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
    //set clientEvents to an array containing Event IDs
    this.clientEvents = this.organizationEventClients
      .filter(ec => ec.clientIds.includes(this.client.id))
      .map(ec => ec.eventId)
    //set clientEvents to hold info on all Events related to Client
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
    //custom label for multiselect
    nameWithDate({ name, date }) {
      return `${name} (${this.formattedDate(date)})`
    },
    //method called when user clicks "Update Client" button
    async submitUpdateClient() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        //show the modal component that displays update client success
        this.showClientUpdatedModal = true
        // Dispatch the mutation to update the client information in the store
        this.$store.commit('updateClient', this.client)
      }
    },
    //method called when user add clients to event using the multiselect tool
    addToEvent() {
        //create variable of the event IDs that client will be added to
        const eventIdsToAdd = this.eventsSelected.map(event => event.id)      
        //call the "addClienttoEvents" mutation in /store/index.js to add client to events
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
    //method called when user clicks "Delete Client" button
    async submitDeleteClient() {
    // Dispatch the "deleteClient" mutation in store/index.js to delete the client from the store
    this.$store.commit('deleteClient', this.client.id)
    //show the modal component that displays the client was deleted
    this.showClientDeletedModal = true
  },
    //method called when user clicks an event row in the list of "Events for Client". It pushes the user to "EventDetails.vue" with the event ID as a parameter to view and update the event.
    editEvent(eventID) {
      this.$router.push({ name: 'eventdetails', params: { id: eventID } })
    },
    //when the modal component that displays the client was deleted emits a 'close' event, this method is called.
    clientDeletedPush() {
      this.showClientDeletedModal = false
      //push the user to "FindClient.vue"
      this.$router.push({ name: 'findclient' })
    },
    //when the modal component that displays the client was updated emits a 'close' event, this method is called
    clientUpdatedPush() {
      this.showClientUpdatedModal = false
      //push the user back one view
      this.$router.back()
    }
  },
  //form validations
  validations() {
    return {
      client: {
        firstName: { required, alpha },
        lastName: { required, alpha },
        email: { email },
        phone: { required, numeric },
        city: { required }
      }
    }
  }
}
</script>

<!--Style for multiselect-->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
  .hoverRow {
    background-color: rgba(255, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;
  }
</style>
