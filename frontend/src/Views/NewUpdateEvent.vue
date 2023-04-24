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
              />
              <!--Show errors, if any-->
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
                type="date"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="event.date"
              />
              <!--Show errors, if any-->
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
                v-model="event.description"
              ></textarea>
            </label>
          </div>

          <div></div>
          <div></div>
          <div></div>
          <!-- Services Offered at Event checkboxes -->
          <div class="flex flex-col grid-cols-3">
            <label>Services Offered at Event</label>
              <div>
                <ul v-if="services.length">
                  <li v-for="service in services" :key="service._id">
                    <input
                      type="checkbox"
                      :id="service._id"
                      :value="service._id"
                      :checked="event.services.includes(service._id)"
                      v-model="event.services"
                      class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                    <label :for="service.name">{{ service.name }}</label>
                  </li>
                </ul>
                <!--If there are no active services for the user's organization, this will appear instead of list of checkboxes-->
                <p v-else>No Active Services Available</p>
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
          <!-- Zip Code input field -->
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

        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
        <!--Update Event button-->
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="handleEventUpdate"
              type="submit"
              class="bg-green-700 text-white rounded"
            >
              Update Event
            </button>
          </div>
          <!--Delete Event button-->
          <div class="flex justify-between mt-10 mr-20">
            <button
              @click="submitDeleteEvent"
              type="submit"
              class="bg-red-700 text-white rounded"
            >
              Delete Event
            </button>
            <!--Go back button-->
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


    </main>
    <p>event: {{ event }}</p>
</template>

<script>
import { getEventById, getEventAttendees, getActiveServices, updateEvent } from '../../api/api'

export default {
    props: ['id'],
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
        }
    },

    mounted() {
        this.loadData();
    },

    methods: {
        async loadData() {
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
        },

        async handleEventUpdate() {
            try {
                const response = await updateEvent(this.$route.params.id, this.event);
                if (response.success) {
                    console.log(response.message);
                    this.$router.back()
                } else {
                    console.log('Event update failed');
                }
            } catch (error) {
                console.log('error updating event', error)
            }
        },

        editClient(clientID) {
          this.$router.push({ name: 'updateclient', params: { id: clientID } })
        },


    }
}
</script>


<style scoped>
  .hoverRow {
    background-color: rgba(255, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;
  }

</style>