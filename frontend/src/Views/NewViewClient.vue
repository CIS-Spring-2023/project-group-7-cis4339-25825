<template>
    <main>
      <!--Header-->
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        View Client
      </h1>
      <div class="px-10 py-20">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Personal Details</h2>
          <!-- First name field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">First Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="client.firstName"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>

          <!-- Middle name field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Middle Name</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="client.middleName"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>

          <!-- Last name field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Last Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder
                v-model="client.lastName"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <div></div>
          <!-- Email field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Email</span>
              <input
                type="email"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.email"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <!-- Phone number field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Phone Number</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.phoneNumber.primary"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <!-- Alternative phone number field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Alternative Phone Number</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.phoneNumber.alternate"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
        </div>

        <!-- grid container -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Address Details</h2>
          <!-- Address 1 field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 1</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.line1"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <!-- Address 2 field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Address Line 2</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.line2"
                style="color: gray; font-style: italic;"
                disabled
                />
            </label>
          </div>
          <!-- City field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">City</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.city"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <div></div>
          <!-- County field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">County</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.address.county"
                style="color: gray; font-style: italic;"
                disabled
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
                v-model="client.address.zip"
                style="color: gray; font-style: italic;"
                disabled
              />
            </label>
          </div>
          <div></div>
        </div>

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
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
          <div>
            <h2 class="text-2xl font-bold">Events for Client</h2>
            <h3 class="italic">Click table row to display an entry</h3>
          </div>
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
                  @click="goToEvent(event._id)"
                  v-for="event in events"
                  :key="event._id"
                  class="cursor-pointer"
                  :class="{ 'hoverRow': hoverId === event._id }"
                  @mouseenter="hoverId = event._id"
                  @mouseleave="hoverId = null"
                >
                  <td class="p-2 text-left">{{ event.name }}</td>
                  <td class="p-2 text-left">
                    {{ formatDate(event.date) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>        
      </div>
    </main>
</template>

<script>

import { getClientById, getClientEvents } from '../../api/api'

export default {
    props: ['id'],
    data() {
        return {
            //variable to hold all events that the client is associated with
            events: [],    
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
        }
    },

    mounted() {
        this.loadData();
    },

    methods: {
        async loadData() {
            try {
                const [clientResponse, eventsResponse] = await Promise.all([
                    getClientById(this.$route.params.id),
                    getClientEvents(this.$route.params.id),
                ]);

                console.log('eventsResponse:', eventsResponse)
                console.log('clientResponse:', clientResponse)

                this.client = clientResponse;
                this.events = eventsResponse;
            } catch (error) {
                console.log('error loading data:', error)
            }
        },

        formatDate(date) {
            const isoDate = new Date(date);
            const year = isoDate.getUTCFullYear();
            const month = String(isoDate.getUTCMonth() + 1).padStart(2, '0');
            const day = String(isoDate.getUTCDate()).padStart(2, '0');
            return `${month}/${day}/${year}`;
        },

        //method called when user clicks on an event row in "Events for Client"
        goToEvent(eventID) {
          //push user to "ViewEvent.vue" with the event ID as a parameter, where the user may view the edit information, not edit
          this.$router.push({ name: 'viewevent', params: { id: eventID } })
        },
    },
}
</script>

<style scoped>
  .hoverRow {
    background-color: rgba(255, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;
  }
</style>