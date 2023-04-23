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
                <!-- <span class="text-black" v-if="v$.event.name.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.event.name.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span> -->
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
                <!-- <span class="text-black" v-if="v$.event.date.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.event.date.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span> -->
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
                    <li v-for="service in activeServices" :key="service._id">
                        <input type="checkbox" name="service.name" :id="service._id" :value="service._id" v-model="event.services"
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
                  v-model="event.address.line1"
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
    <p>role: {{ role }}</p>
    <p>event: {{ event }}</p>
    <p>event.services: {{ event.services }}</p>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { mapState } from 'vuex'
import { getActiveServices, createEvent } from '../../api/api'

export default {
    setup() {
        //setup vuelidate
        return { v$: useVuelidate({ $autoDirty: true }) }
    },

    data() {
        return {
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
            activeServices: []
        }
    },

    computed: {
        //computed states so they can be referenced in code
        ...mapState(['role'])
    },

    mounted() {
        this.loadData();
    },

    methods: {
        async loadData() {
            try {
                const response = await getActiveServices();
                this.activeServices = response
            } catch (error) {
                console.log('error fetching active services:', error)
            }
        },
        async handleSubmitForm() {
            try {
                const response = await createEvent(this.event);
                if (response.success) {
                        console.log(response.message);
                        this.$router.push('/findevents')
                    } else {
                        console.log('Client creation failed');
                    }
            } catch (error) {
                console.log('error creating new event:', error)
            }
        }
    },


}
</script>

<style>

</style>