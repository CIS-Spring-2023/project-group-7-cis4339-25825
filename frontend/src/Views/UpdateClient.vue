<!-- This component allows a user to update a specific client's information. -->

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
                :disabled="confirmModal"
              />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.firstName.$error" class="text-red-500">
                First Name is required
            </span>
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
                :disabled="confirmModal"
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
                :disabled="confirmModal"
              />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.lastName.$error" class="text-red-500">
                Last Name is required
            </span>
          </div>
          <div></div>
          <!-- Email input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Email</span>
              <input
                type="email"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.email"
                :disabled="confirmModal"
              />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.email.$error" class="text-red-500">
                Valid Email is required
            </span>
          </div>
          <!-- Phone number input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Phone Number</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="^[0-9]{3}[0-9]{3}[0-9]{4}$"
                v-model="client.phoneNumber.primary"
                :disabled="confirmModal"
              />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.phoneNumber.primary.$error" class="text-red-500">
                <span v-if="v$.client.phoneNumber.primary.required.$invalid">Phone Number is required</span>
                <span v-else-if="!v$.client.phoneNumber.primary.required.$invalid && v$.client.phoneNumber.primary.numeric.$invalid">
                  Phone Number must contain only digits
                </span>
                <span v-else-if="!v$.client.phoneNumber.primary.required.$invalid && !v$.client.phoneNumber.primary.numeric.$invalid && (v$.client.phoneNumber.primary.minLength.$invalid || v$.client.phoneNumber.primary.maxLength.$invalid)">
                  Phone Number must be exactly 10 digits
                </span>
              </span>
          </div>
          <!-- Alternative phone number input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Alternative Phone Number</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                v-model="client.phoneNumber.alternate"
                :disabled="confirmModal"
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
                v-model="client.address.line1"
                :disabled="confirmModal"
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
                v-model="client.address.line2"
                :disabled="confirmModal"
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
                v-model="client.address.city"
                :disabled="confirmModal"
              />
            </label>
            <!-- Validation error messages -->
            <span v-if="v$.client.address.city.$error" class="text-red-500">
                City is required
            </span>
          </div>
          <div></div>
          <!-- County input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">County</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.county"
                :disabled="confirmModal"
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
                v-model="client.address.zip"
                :disabled="confirmModal"
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
              @click="submitUpdateClientRequest"
              type="submit"
              class="bg-green-700 text-white rounded"
              :disabled="confirmModal"
            >
              Update Client
            </button>
          </div>
          <!--Delete Client button-->
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="submitDeleteClientRequest"
              type="submit"
              class="bg-red-700 text-white rounded"
              :disabled="confirmModal"
            >
              Delete Client
            </button>
          </div>
          <!--Go back button-->
          <div class="flex justify-between mt-10 mr-20">
            <button
              type="reset"
              class="border border-red-700 bg-white text-red-700 rounded"
              @click="goBack"
              :disabled="confirmModal"
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
                    <th class="p-4"></th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-300">
                    <tr
                    @click="editEvent(event._id)"
                    v-for="event in clientEvents"
                    :key="event._id"
                    class="cursor-pointer hoverRow"
                    :class="{ 'hoverId': hoverId === event._id }"
                    @mouseenter="hoverId = event._id"
                    @mouseleave="hoverId = null"                    
                    >
                    <td class="p-2 text-left">{{ event.name }}</td>
                    <td class="p-2 text-left">{{ formatDate(event.date) }}</td>
                    <td class="p-2 text-right">
                        <span class="remove-btn-wrapper">
                        <span class="remove-btn text-gray-400 cursor-pointer" @click.stop="removeClientFromEventRequest(client._id, event._id)" v-if="hoverId === event._id">X</span>
                        </span>
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
              :disabled="confirmModal"
            />
            <div class="flex justify-between">
              <!--button to add client to events-->
              <button
                @click="addToEvent"
                type="submit"
                class="mt-5 bg-red-700 text-white rounded"
                :disabled="eventsSelected.length === 0 || confirmModal"
              >
                Add Client to Selected Events
              </button>
            </div>
          </div>
        </div>        
      </div>
      <!-- Loading modal appears when API calls are being made -->
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>

      <!-- ConfirmModal appears when the user wants to update/delete the client -->
      <Transition name="bounce">
          <ConfirmModal v-if="confirmModal" @close="closeConfirmModal" :title="title" :message="message"/>
      </Transition>
    </main>
</template>

<script>
//import vuelidate functionalities
import useVuelidate from '@vuelidate/core'
import { required, email, numeric, minLength, maxLength } from '@vuelidate/validators'
// import multiselect functionality
import VueMultiselect from 'vue-multiselect'
// import API calls
import { getClientById, getClientEvents, getNonClientEvents, registerAttendee, deregisterAttendee, updateClient, deregisterClient } from '../../api/api'
// import modal components
import LoadingModal from '../components/LoadingModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
    //accept client ID as data from parent components, either "FindClient.vue" or "EventDetails.vue"
    props: ['id'],
    // allow components
    components: { 
        VueMultiselect,
        LoadingModal,
        ConfirmModal
    },
    data() {
        return {
            // events that the client is not registered in - to be shown in the multiselect
            eventsFiltered: [],
            // events that user selects from multiselect list
            eventsSelected: [],
            //variable to hold the events that the selected client is associated with
            clientEvents: [],
            //variable to hold client information  
            client: {
                _id: null,
                firstName: null,
                middleName: null,
                lastName: null,
                email: null,
                phoneNumber: {
                    primary: null,
                    alternate: null
                },
                address: {
                    line1: null,
                    line2: null,
                    city: null,
                    county: null,
                    zip: null
                },
                orgs: []
            },
            // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
            hoverId: null,
            // variable that determines if loading wheel appears
            isLoading: false,
            // variable that determines if confirmation modal appears
            confirmModal: false,
            // variable that holds the ID of the client to be removed from the event
            removeClientId: null,
            // variable that holds the event ID to remove client from that event
            removeEventId: null
        }
    },

    setup() {
      // Register Vuelidate
      const v$ = useVuelidate();
      return { v$ };
    },

    validations() {
      // validations
      return {
        client: {
          firstName: { required },
          lastName: { required },
          email: { required, email },
          phoneNumber: {
            primary: {
              required,
              numeric,
              minLength: minLength(10),
              maxLength: maxLength(10),
            },
          },
          address: {
            city: { required },
          },
        },
      };
    },

    mounted() {
      // when component is mounted, data is loaded
        this.loadData();
    },

    methods: {
      // method called when component is mounted -> loads all the data
        async loadData() {
          // loading wheel appears
          this.isLoading = true;
          // get client information, events the client is registered in, and events that client is not registered in
            try {
                const [clientResponse, clientEventsResponse, nonClientEventsResponse] = await Promise.all([
                    getClientById(this.$route.params.id),
                    getClientEvents(this.$route.params.id),
                    getNonClientEvents(this.$route.params.id),
                ]);

                this.client = clientResponse;
                this.clientEvents = clientEventsResponse;
                this.eventsFiltered = nonClientEventsResponse;

            } catch (error) {
                console.log('error loading data:', error)
            }
            // loading wheel disappears
            this.isLoading = false;
        },

        // method called to format the event date
        formatDate(date) {
            const isoDate = new Date(date);
            const year = isoDate.getUTCFullYear();
            const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
            const day = String(isoDate.getUTCDate()).padStart(2, '0');
            return `${month}/${day}/${year}`;
        },

        //custom label for multiselect
        nameWithDate({ name, date }) {
            return `${name} (${this.formatDate(date)})`
        },

        // method called when user attempts to remove client from event -> asks for confirmation
        removeClientFromEventRequest(clientId, eventId) {
          // Submit form
          this.confirmModal = true
          this.title = 'Please Confirm Removal'
          this.message = 'Are you sure you want to remove ' + this.client.firstName + ' ' + this.client.lastName + ' from this event?'
          this.removeClientId = clientId
          this.removeEventId = eventId
        },

        // method called to remove client from event
        async removeClientFromEvent(clientId, eventId) {
          this.removeClientId = null;
          this.removeEventId = null;
          // remove client ID from the "clients" array for that event
          try {
                await deregisterAttendee(eventId, clientId);
            } catch (error) {
                console.log(error);
            }
            // get events for which client is registered, and events for which client is not registered
            try {
                const clientEventsResponse = await getClientEvents(this.$route.params.id);
                const nonClientEventsResponse = await getNonClientEvents(this.$route.params.id);
                this.clientEvents = clientEventsResponse;
                this.eventsFiltered = nonClientEventsResponse;
            } catch (error) {
                console.log(error);
            }
        },

        // method called to add client to an event
        async addToEvent() {
            try {
                const client = this.client._id;
                const events = this.eventsSelected.map((event) => event._id);
                const promises = [];

                for (const eventId of events) {
                    promises.push(registerAttendee(eventId, client));
                }

                Promise.all(promises)
                    .then(async () => {
                        try {
                            this.clientEvents = await getClientEvents(this.$route.params.id);
                            this.eventsFiltered = await getNonClientEvents(this.$route.params.id);
                            this.eventsSelected = [];
                        } catch (error) {
                            console.log(error);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }

        },

        // method called when user attempts to update client informatio -> asks for confirmation
        submitUpdateClientRequest() {
          // Trigger validation
          this.v$.$validate();

          if (this.v$.$error) {
            // Form is invalid, do not proceed
            return;
          }
          // If form is valid, ask for confirmation
          this.confirmModal = true
          this.title = 'Please Confirm Update'
          this.message = 'Are you sure you want to update this client?'
        },

        // method called when user attempts to delete client -> asks for confirmation
        submitDeleteClientRequest() {
          // Submit form
          this.confirmModal = true
          this.title = 'Please Confirm Delete'
          this.message = 'Are you sure you want to delete this client?'
        },

        // method to close the ConfirmModal. If user clicks "yes" when updating or deleting the client, then API calls will be made to update/delete client
        closeConfirmModal(value) {
            this.confirmModal = false
            if (value === 'yes') {
              if (this.title === 'Please Confirm Update') {                    
                    this.title = '';
                    this.message = '';
                    this.submitUpdateClient();
                }
                else if (this.title === 'Please Confirm Delete') {
                    this.title = '';
                    this.message = '';
                    this.submitDeleteClient();
                } else if (this.title === 'Please Confirm Removal') {
                  this.title = '';
                  this.message = '';
                  this.removeClientFromEvent(this.removeClientId, this.removeEventId);
                }
            }
        },

        // method to make API call to update the client
        async submitUpdateClient() {
          this.title = ''
          this.message = ''
          try {
              const response = await updateClient(this.$route.params.id, this.client);
              if (response.success) {                      
                      this.$router.push('/findclient?update=true')
                  } else {
                      console.log('Client update failed');
                  }
          } catch (error) {
              console.log('error updating client', error)
          }
        },

        // method to make API call to delete the client
        async submitDeleteClient() {
          this.title = ''
          this.message = ''
          try {
            const response = await deregisterClient(this.$route.params.id);
            if (response.success) {
                this.$router.push('/findclient?delete=true')
            } else {
                console.log('Client delete failed');
            }
          } catch (error) {
            console.log('error deleting client', error);
          }
        },

        //method called when user clicks an event row in the list of "Events for Client". It pushes the user to "EventDetails.vue" with the event ID as a parameter to view and update the event.
        editEvent(eventID) {
          this.$router.push({ name: 'eventdetails', params: { id: eventID } })
        },

        // method called when user clicks "Go Back" button
        goBack() {
          const mainParam = this.$route.query.main;
          if (mainParam === 'true') {
            this.$router.push('/findclient')
          } else {
            this.$router.back()
          }
        },



    }

}
</script>

<!--Style for multiselect-->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>


<style scoped>
.hoverRow {
  background-color: transparent;
  transition: background-color 0.3s ease-in-out;
}

.hoverId {
  background-color: rgba(255, 0, 0, 0.1);
}

.remove-btn-wrapper {
  display: inline-block;
  position: relative;
}
.remove-btn:hover {
  color: black;
}

</style>
