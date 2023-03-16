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
                />
                <!-- Show errors, if any -->
                <span class="text-black" v-if="v$.event.name.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.event.name.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span>
              </label>
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
                />
                <!-- Show errors, if any -->
                <span class="text-black" v-if="v$.event.date.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.event.date.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
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
                ></textarea>
              </label>
            </div>
  
            <div></div>
            <div></div>
            <div></div>
            <!-- Services Offered checboxes -->
            <div class="flex flex-col grid-cols-3">
              <label>Services Offered at Event</label>
              <div>
                <ul>
                    <li v-for="service in organizationServices" :key="service.id" v-show="service.active">
                        <input type="checkbox" name="service.name" :id="service.id" :value="service.id" v-model="eventServiceIds"
                        class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                        notchecked>
                        <label class="inline-flex items-center">{{ service.name }}</label>
                    </li>
                </ul>
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
                  v-model="event.address1"
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
                  v-model="event.address2"
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
                  v-model="event.city"
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
                  v-model="event.county"
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
                  v-model="event.zip"
                />
              </label>
            </div>
          </div>
          
          <!--Add New Event submit button-->
          <div class="flex justify-between mt-10 mr-20">
            <button class="bg-red-700 text-white rounded" type="submit">
              Add New Event
            </button>
          </div>
        </form>
      </div>
    </main>

    <!--Modal component that appears when event is created-->
    <modalComponent v-if="showEventCreated" @close="createdEventPush">
      <template v-slot:eventCreatedSlot>
        Event Created!
        <p>Redirecting to Event List...</p>
      </template>
    </modalComponent>
  </template>

<script>
//import functionalities
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapState } from 'vuex'
import modalComponent from '../components/modalComponent.vue'

export default {
  setup() {
    //setup vuelidate
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  // allow modal component
  components: {
    modalComponent
  },
  data() {
    return {
      //variable to hold new event information
      event: {
        id: null,
        name: '',
        date: '',
        description: '',
        date: '',
        address1: '',
        address2: '',
        county: '',
        city: '',
        zip: ''
      },
      //variable to assign service IDs to event (user clicks checkboxes to add services to event)
      eventServiceIds: [],
      //variable that determines when the modal component appears
      showEventCreated: false
    }
  },
  computed: {
    //compute states so I can reference them in code
    ...mapState(['organizationEvents', 'organizationServices', 'organizationEventServices'])
  },
  methods: {
    //method called when user clicks "Add New Event" button
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        //assign a new event ID
        this.event.id = Math.max(...this.organizationEvents.map(event => event.id)) + 1;
        const payload = {
          event: this.event,
          eventServiceIds: this.eventServiceIds
        }
        // call the "addEvent" mutation in 'store/index.js' to add the new event
        this.$store.commit('addEvent', payload)
        //show the modal component that displays an event was created
        this.showEventCreated = true
      }
    },
    //when modal component emits a 'close' event, this method is called. It pushes the user to "FindEvent.vue"
    createdEventPush() {
      this.showEventCreated = false
      this.$router.push('/findevents')
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      event: {
        name: { required },
        date: { required }
      }
    }
  }
}
</script>
