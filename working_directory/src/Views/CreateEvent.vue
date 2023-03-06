<template>
    <main>
      <div>
        <h1
          class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
        >
          Create New Event
        </h1>
      </div>
      <div class="px-10 py-20">
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="handleSubmitForm">
          <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Event Details</h2>
  
            <!-- form field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Event Name</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="event.name"
                />
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
  
            <!-- form field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Date</span>
                <span style="color: #ff0000">*</span>
                <input
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="event.date"
                  type="date"
                />
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
            <!-- form field -->
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
            <!-- form field -->
            <div class="flex flex-col grid-cols-3">
              <label>Services Offered at Event</label>
              <div>
                <ul>
                    <li v-for="service in services" :key="service.id" v-show="service.active">
                        <input type="checkbox" name="service.name" :id="service.id" :value="service.id" v-model="event.serviceIds"
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
            <!-- form field -->
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
            <!-- form field -->
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
            <!-- form field -->
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
            <!-- form field -->
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
            <!-- form field -->
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
  
          <div class="flex justify-between mt-10 mr-20">
            <button class="bg-red-700 text-white rounded" type="submit">
              Add New Event
            </button>
          </div>
        </form>
      </div>
      <p>{{ events }}</p>
      <br>
      <p>{{ services }}</p>
    </main>
  </template>

<script>
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API
import { mapState } from 'vuex'

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      // removed unnecessary extra array to track services
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
        zip: '',
        serviceIds: [],
        clientIds: []
      },
      events: [],
      services: []
    }
  },
  mounted() {
    this.setEvents()
  },
  computed: {
    ...mapState(['organizationEvents', 'organizationServices'])
  },
  methods: {
    async handleSubmitForm() {
      // Checks to see if there are any errors in validation
      const isFormCorrect = await this.v$.$validate()
      // If no errors found. isFormCorrect = True then the form is submitted
      if (isFormCorrect) {
        alert('Event added')
        this.events.push(this.event)
        this.organizationEvents = this.events

      }
    },
    setEvents() {
        this.events = this.organizationEvents
        this.event.id = this.events.length + 1
        this.services = this.organizationServices
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
