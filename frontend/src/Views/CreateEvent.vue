<!-- This component allows for the creation of a new event -->

<template>
      <main>
      <div>
        <!--Header-->
        <h1
          class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
        >
          Create New Event
        </h1>
      </div>
      <div class="px-10 py-20">
        <!--Form-->
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="handleSubmitForm">
          <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Event Details</h2>
  
            <!-- Event Name Input Field -->
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
              </label>
              <!-- Validation error messages -->
              <span v-if="v$.event.name.$error" class="text-red-500">
                Event Name is required
              </span>
            </div>
  
            <!-- Date input field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Date</span>
                <span style="color: #ff0000">*</span>
                <input
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="event.date"
                  type="date"
                  :disabled="confirmModal"
                />
              </label>
              <!-- Validation error messages -->
              <span v-if="v$.event.date.$error" class="text-red-500">
                <span v-if="v$.event.date.required.$invalid">
                  Event Date is required
                </span>
                <span v-else-if="!v$.event.date.required.$invalid && v$.event.date.validDate.$invalid">
                  Event Date must be a valid date
                </span>
                <span v-else-if="!v$.event.date.required.$invalid && !v$.event.date.validDate.$invalid && v$.event.date.notBeforeToday.$invalid">
                  New Event Date cannot be in the past.
                </span>
              </span>
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
              <ul v-if="activeServices.length" class="space-y-2">
                <li v-for="service in activeServices" :key="service._id" :data-service-id="service._id" class="rounded-lg border border-gray-300 p-2 hover:bg-gray-100 transition-colors relative">
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
            <!-- Zip code field -->
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
          
          <!--Add New Event submit button-->
          <div class="flex justify-between mt-10 mr-20">
            <button class="bg-red-700 text-white rounded" type="submit" :disabled="confirmModal">
              Add New Event
            </button>
          </div>
        </form>
      </div>
      <!-- Loading wheel appears when API calls are being made -->
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>

      <!-- Confirm Modal appears to confirm the creation of the event -->
      <Transition name="bounce">
          <ConfirmModal v-if="confirmModal" @close="closeConfirmModal" :title="title" :message="message"/>
      </Transition>
    </main>
</template>

<script>
// import vuelidate validations
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
// import functionality to reference session states
import { mapState } from 'vuex'
// import API calls
import { getActiveServices, createEvent } from '../../api/api'
// import modal components
import LoadingModal from '../components/LoadingModal.vue'
import ConfirmModal from '../components/ConfirmModal.vue'

export default {
  // allow modal components
  components: {
      LoadingModal,
      ConfirmModal,
  },
    data() {
        return {
          // event variable to hold new event information
            event: {
                _id: null,
                name: null,
                description: null,
                date: null,
                services: [],
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
            //variable to assign service IDs to event (user clicks checkboxes to add services to event)
            activeServices: [],
            // variable that determines if loading wheel appears
            isLoading: false,
            // variable that determines if confirmation modal appears
            confirmModal: false,
            // variable that determines which services in the List of Services checkboxes have expanded details
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

      // prevents form submission if new event has a date before the current date
      const notBeforeToday = (value) => {
        const today = new Date()

        return value >= today.toISOString().split('T')[0]
      }

      return {
        event: {
          name: { required },
          date: {
            required,
            validDate,
            notBeforeToday
          },
        }
      }
    },

    computed: {
      //computed states so they can be referenced in code
      ...mapState(['role']),

      // computed function to determine which services in the services list have their descriptions shown
      descriptionOpenStates() {
        return this.activeServices.reduce((acc, service) => {
          acc[service._id] = this.openDescriptions.includes(service._id);
          return acc;
        }, {});
      },
    },

    // when component is mounted, data is loaded
    mounted() {
        this.loadData();
    },

    methods: {
      // method to load data upon mount
        async loadData() {
          this.isLoading = true;
            try {
                const response = await getActiveServices();
                this.activeServices = response
            } catch (error) {
                console.log('error fetching active services:', error)
            }
            this.isLoading = false;
        },

        // method called when user tries to create new event
        handleSubmitForm() {
          // Trigger validation
          this.v$.$validate();

          if (this.v$.$error) {
            // Form is invalid, do not proceed
            return;
          }

          // If form is valid, ConfirmModal will appear to ask for confirmation
          this.confirmModal = true
          this.title = 'Please Confirm Creation'
          this.message = 'Are you sure you want to create this event?'
        },

        // method called when ConfirmModal closes. If user clicked "yes", then event will be created
        closeConfirmModal(value) {
            this.confirmModal = false
            this.title = ''
            this.message = ''
            if (value === 'yes') {
                this.registerEvent();
            }
        },

        // method called when user clicks "yes" in the ConfirmModal. API call is made to create new event
        async registerEvent() {
          this.isLoading = true;
            try {
                const response = await createEvent(this.event);
                if (response.success) {
                        this.$router.push('/findevents?success=true')
                    } else {
                        console.log('Event creation failed');
                    }
            } catch (error) {
                console.log('error creating new event:', error)
            }
            this.isLoading = false;
        },

        // method called when user clicks to expand a Service to show its description, or to close its description
        toggleDetails(serviceId) {
          if (this.openDescriptions.includes(serviceId)) {
            this.openDescriptions = this.openDescriptions.filter(id => id !== serviceId);
          } else {
            this.openDescriptions.push(serviceId);
          }
        },
    },
}
</script>

<style scoped>
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