<template>
    <main>
      <div>
        <h1
          class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
        >
          Find Client
        </h1>
      </div>
      <div class="px-10 pt-20">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Search Client By</h2>
          <!-- Displays Client Name search field -->
          <div class="flex flex-col">
            <select
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="searchBy"
            >
              <option value="Client Name">Client Name</option>
              <option value="Client Number">Client Number</option>
            </select>
          </div>
          <div class="flex flex-col" v-if="searchBy === 'Client Name'">
            <label class="block">
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="firstName"
                v-on:keyup.enter="handleSubmitForm"
                placeholder="Enter first name"
              />
            </label>
          </div>
          <div class="flex flex-col" v-if="searchBy === 'Client Name'">
            <label class="block">
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="lastName"
                v-on:keyup.enter="handleSubmitForm"
                placeholder="Enter last name"
              />
            </label>
          </div>
          <!-- Displays Client Number search field -->
          <div class="flex flex-col" v-if="searchBy === 'Client Number'">
            <input
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              type="text"
              v-model="phone"
              v-on:keyup.enter="handleSubmitForm"
              placeholder="Enter Client Phone Number"
            />
          </div>
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <div></div>
          <div></div>
          <div class="mt-5 grid-cols-2">
            <button
              class="mr-10 border border-red-700 bg-white text-red-700 rounded"
              @click="clearSearch"
              type="submit"
            >
              Clear Search
            </button>
            <button
              class="bg-red-700 text-white rounded"
              @click="handleSubmitForm"
              type="submit"
            >
              Search Client
            </button>
          </div>
        </div>
      </div>
  
      <hr class="mt-10 mb-10" />
      <!-- Display Found Data -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
      >
        <div class="ml-10">
          <h2 class="text-2xl font-bold">List of Clients</h2>
          <h3 class="italic">Click table row to edit/display an entry</h3>
        </div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr>
                <th class="p-4 text-left">Name</th>
                <th class="p-4 text-left">Phone number</th>
                <th class="p-4 text-left">City</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="editClient(client.id)"
                v-for="client in clients"
                :key="client.id"
                class="cursor-pointer"
              >
                <td class="p-2 text-left">
                  {{ client.firstName + ' ' + client.lastName }}
                </td>
                <td class="p-2 text-left">
                  {{ client.phone }}
                </td>
                <td class="p-2 text-left">{{ client.city }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p>{{ organizationClients }}</p>
    </main>
  </template>
  

<script>
import { mapState } from 'vuex'

export default {
    data() {
    return {
      clients: [],
      // Parameter for search to occur
      searchBy: '',
      firstName: '',
      lastName: '',
      phone: ''

    }
  },
  computed: {
    ...mapState(['organizationId', 'organizationClients'])
  },
  mounted() {
    this.setClients() 
  },
  methods: {
    setClients() {
        this.clients = this.organizationClients
    },
    handleSubmitForm() {
        if (this.searchBy === 'Client Name') {
            if (this.firstName && this.lastName) {
            this.clients = this.organizationClients.filter((client) => client.firstName.toLowerCase().includes(this.firstName.toLowerCase()) && client.lastName.toLowerCase().includes(this.lastName.toLowerCase()));
            } else if (this.firstName && !this.lastName) {
            this.clients = this.organizationClients.filter((client) => client.firstName.toLowerCase().includes(this.firstName.toLowerCase()));
            } else if (this.lastName && !this.firstName) {
            this.clients = this.organizationClients.filter((client) => client.lastName.toLowerCase().includes(this.lastName.toLowerCase()));
            }
        } else if (this.searchBy === 'Client Number') {
            this.clients = this.organizationClients.filter((client) => client.phone.includes(this.phone));
        }
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.phone = ''
      this.setClients()
    },
    editClient(clientId) {
      this.$router.push({ name: 'updateclient', params: { id: clientId } })
    }
  }
}
</script>