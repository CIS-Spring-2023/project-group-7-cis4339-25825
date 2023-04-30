<!-- This component allows a user to update a specific event's information. -->

<template>
    <main>
      <div>
        <!--Header-->
        <h1
          class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
        >
          Update Event
        </h1>
      </div>
      <div class="px-10 py-20">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Event Details</h2>
          <!-- Event Name input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Event Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.name"
                :disabled="confirmModal"
              />
              <span v-if="v$.event.name.$error" class="text-red-500">
                Event Name is required
              </span>
            </label>
          </div>

          <!-- Date input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Date</span>
              <span style="color: #ff0000">*</span>
              <input
                type="date"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.date"
                :disabled="confirmModal"
              />
              <span v-if="v$.event.date.$error" class="text-red-500">
                <span v-if="v$.event.date.required.$invalid">
                  Event Date is required
                </span>
                <span v-else-if="!v$.event.date.required.$invalid && v$.event.date.validDate.$invalid">
                  Event Date must be a valid date
                </span>
              </span>
            </label>
          </div>

          <div></div>
          <div></div>
          <!-- Description input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Description</span>
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                rows="2"
                v-model="event.description"
                :disabled="confirmModal"
              ></textarea>
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <!-- Services Offered at Event checkboxes -->
          <div class="flex flex-col grid-cols-3">
            <label class="text-lg font-semibold mb-2">Services Offered at Event</label>
            <div>
              <ul v-if="services.length" class="space-y-2">
                <li v-for="service in services" :key="service._id" :data-service-id="service._id" class="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 transition-colors relative">
                  <label class="block w-full h-full">
                    <input
                      type="checkbox"
                      :id="service._id"
                      :value="service._id"
                      :checked="event.services.includes(service._id)"
                      v-model="event.services"
                      class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 mr-2"
                      :disabled="confirmModal"
                    >
                    <span class="font-medium">{{ service.name }}</span>
                  </label>
                  <div
                    v-if="service.description"
                    class="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                    @click.stop="toggleDetails(service._id)"
                  >
                    <svg
                      v-if="!descriptionOpenStates[service._id]"
                      class="h-4 w-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    <svg
                      v-else
                      class="h-4 w-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </div>
                  <transition name="slide-fade">
                    <p
                      v-show="descriptionOpenStates[service._id]"
                      class="text-sm text-gray-600 mt-2 pr-8"
                    >
                      {{ service.description }}
                    </p>
                  </transition>
                </li>
              </ul>
              <!--If there are no active services for the user's organization, this will appear instead of list of checkboxes-->
              <p v-else class="text-gray-600">No Active Services Available</p>
            </div>
          </div>
        </div>

        <!-- grid container -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Address</h2>
          <!-- Address 1 input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.line1"
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
                placeholder
                v-model="event.address.line2"
                :disabled="confirmModal"
              />
            </label>
          </div>
          <!-- City input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">City</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.city"
                :disabled="confirmModal"
              />
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
                placeholder
                v-model="event.address.county"
                :disabled="confirmModal"
              />
            </label>
          </div>
          <!-- Zip Code input field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Zip Code</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="event.address.zip"
                :disabled="confirmModal"
              />
            </label>
          </div>
        </div>

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
        <!--Update Event button-->
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="submitEventUpdateRequest"
              type="submit"
              class="bg-green-700 text-white rounded"
              :disabled="confirmModal"
            >
              Update Event
            </button>
          </div>
          <!--Delete Event button-->
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="submitDeleteEventRequest"
              type="submit"
              class="bg-red-700 text-white rounded"
              :disabled="confirmModal"
            >
              Delete Event
            </button>
            <!--Go back button-->
          </div>
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

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div>
            <h2 class="text-2xl font-bold">List of Attendees</h2>
            <h3 class="italic">Click table row to edit/display an entry</h3>
          </div>
          <!--Table showing the list of attendees for the selected event-->
          <div class="flex flex-col col-span-2">
            <table class="min-w-full shadow-md rounded">
              <thead class="bg-gray-50 text-xl">
                <tr>
                  <th class="p-4 text-left">Name</th>
                  <th class="p-4 text-left">City</th>
                  <th class="p-4 text-left">Phone Number</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-300">
                  <tr
                  @click="editClient(client._id)"
                  v-for="client in clients"
                  :key="client._id"
                  class="cursor-pointer"
                  :class="{ 'hoverRow': hoverId === client._id }"
                  @mouseenter="hoverId = client._id"
                  @mouseleave="hoverId = null"
                  >
                  <td class="p-2 text-left">
                    {{ client.firstName + ' ' + client.lastName }}
                  </td>
                  <td class="p-2 text-left">{{ client.address.city }}</td>
                  <td class="p-2 text-left">
                    {{ client.phoneNumber.primary }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <!-- Loading modal appears when API calls are being made -->
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>

      <!-- ConfirmModal appears when the user wants to update/delete the event -->
      <Transition name="bounce">
          <ConfirmModal v-if="confirmModal" @close="closeConfirmModal" :title="title" :message="message"/>
      </Transition>      

    </main>
</template>

<script>
//import vuelidate functionalities
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
// import API calls
import { getEventById, getEventAttendees, getActiveServices, updateEvent, deleteEventById } from '../../api/api'
// import modal components
import LoadingModal from '../components/LoadingModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
  //accept event ID as data from parent components
    props: ['id'],
    // allow components
    components: {
      LoadingModal,
      ConfirmModal
    },
    data() {
        return {
            //variable to hold clients for selected event
            clients: [],
            //variable to hold services for selected event
            services: [],
            //variable to hold event information
            event: {
                _id: null,
                name: null,
                description: null,
                date: null,
                address: {
                    line1: null,
                    line2: null,
                    city: null,
                    county: null,
                    zip: null
                },
                attendees: [],
                services: []
            },
            // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
            hoverId: null,
            // variable that determines when loading wheel appears
            isLoading: false,
            // variable that determines when confirmation modal appears
            confirmModal: false,            
            // variable that determines which services have their descriptions opened
            openDescriptions: [],
        }
    },

    setup() {
      // Register Vuelidate
      const v$ = useVuelidate();
      return { v$ };
    },

    validations() {
      // validations
      const validDate = (value) => {
        const date = new Date(value)
        return !isNaN(date)
      }

      return {
        event: {
          name: { required },
          date: {
            required,
            validDate
          },
        }
      }
    },

    computed: {
      // computed function for which services to have their descriptions opened
      descriptionOpenStates() {
        return this.services.reduce((acc, service) => {
          acc[service._id] = this.openDescriptions.includes(service._id);
          return acc;
        }, {});
      },
    },

    mounted() {
      // when component is mounted, data is loaded
        this.loadData();
    },

    methods: {
      // method called when component is mounted -> loads all the data
        async loadData() {
          // show loading wheel
          this.isLoading = true;
          // get event information, get clients registered under this event, and get all active services
            try {
                const [eventResponse, clientsResponse, servicesResponse] = await Promise.all([
                    getEventById(this.$route.params.id),
                    getEventAttendees(this.$route.params.id),
                    getActiveServices(),
                ]);

                eventResponse.date = new Date(eventResponse.date).toISOString().substring(0, 10);

                this.event = eventResponse;
                this.clients = clientsResponse;
                this.services = servicesResponse;

            } catch (error) {
                console.log('error loading data', error)
            }
          // hide loading wheel
          this.isLoading = false;
        },

        // method called when user attempts to update the event -> asks for confirmation
        submitEventUpdateRequest() {
          // Trigger validation
          this.v$.$validate();

          if (this.v$.$error) {
            // Form is invalid, do not proceed
            return;
          }
          // If form is valid, ConfirmModal appears to ask for confirmation
          this.confirmModal = true
          this.title = 'Please Confirm Update'
          this.message = 'Are you sure you want to update this event?'
        },

        // method called when user attempts to delete the event
        submitDeleteEventRequest() {
          // Submit form
          this.confirmModal = true
          this.title = 'Please Confirm Delete'
          this.message = 'Are you sure you want to delete this event?'
        },

        // method to close ConfirmModal. If user clicks "yes" when attempting to update/delete the event, then the API calls are made and the event will be updated/deleted
        closeConfirmModal(value) {
            this.confirmModal = false
            if (value === 'yes') {
              if (this.title === 'Please Confirm Update') {                    
                    this.title = '';
                    this.message = '';
                    this.submitEventUpdate();
                }
                else if (this.title === 'Please Confirm Delete') {
                    this.title = '';
                    this.message = '';
                    this.submitDeleteEvent();
                }
            }
        },

        // method to make the API call to update the event
        async submitEventUpdate() {
          try {
              const response = await updateEvent(this.$route.params.id, this.event);
              if (response.success) {
                  this.$router.push('/findevents?update=true')
              } else {
                  console.log('Event update failed');
              }
          } catch (error) {
              console.log('error updating event', error)
          }
        },

        // method to make the API call to delete the event
        async submitDeleteEvent() {
          try {
            const response = await deleteEventById(this.$route.params.id);
            if (response.success) {
                this.$router.push('/findevents?delete=true')
            } else {
                console.log('Event delete failed');
            }
          } catch (error) {
            console.log('error deleting event:', error)
          }
        },

        // method called when user clicks on a client in the clients table
        editClient(clientID) {
          this.$router.push({ name: 'updateclient', params: { id: clientID } })
        },

        // method called when user clicks the "Go Back" button
        goBack() {
          if (this.$route.query.main) {
            this.$router.push('/findevents')
          } else if (this.$route.query.dash) {          
            this.$router.push('/dashboard')
          } else {            
            this.$router.back()
          }
        },

        // method called when user expands a service in the list to also show its description
        toggleDetails(serviceId) {          
          if (this.openDescriptions.includes(serviceId)) {
            this.openDescriptions = this.openDescriptions.filter(id => id !== serviceId);
          } else {
            this.openDescriptions.push(serviceId);
          }
        },
    }
}
</script>

<style scoped>
.hoverRow {
  background-color: rgba(255, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
}

.arrow-container {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-1rem);
}
.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
