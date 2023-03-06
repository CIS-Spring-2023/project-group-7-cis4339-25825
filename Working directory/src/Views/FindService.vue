<template>
    <main>
      <div>
        <h1
          class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
        >
          List of Services
        </h1>
      </div>
      <div class="px-10 pt-20">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Search Service By</h2>
          <!-- Displays Service Name search field -->
          <div class="flex flex-col">
            <select
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="searchBy"
            >
              <option value="Service Name">Service Name</option>
              <option value="Service Description">Service Description</option>
            </select>
          </div>
          <div class="flex flex-col" v-if="searchBy === 'Service Name'">
            <label class="block">
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="name"
                v-on:keyup.enter="handleSubmitForm"
                placeholder="Enter service name"
              />
            </label>
          </div>
          <div class="flex flex-col" v-if="searchBy === 'Service Description'">
            <label class="block">
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="desc"
                v-on:keyup.enter="handleSubmitForm"
                placeholder="Enter service description"
              />
            </label>
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
              Search Service
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
          <h2 class="text-2xl font-bold">List of Services</h2>
          <h3 class="italic">Click table row to edit/display an entry</h3>
        </div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr>
                <th class="p-4 text-left">Service Name</th>
                <th class="p-4 text-left">Service Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="editEvent(service._id)"
                v-for="service in services"
                :key="service.id"
              >
                <td class="p-2 text-left">{{ service.name }}</td>
                <td class="p-2 text-left">{{ service.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      services: [],
      // Parameter for search to occur
      searchBy: '',
      name: '',
      desc: ''
    }
  },
  computed: {
    ...mapState(['organizationId', 'organizationServices'])
  },
  mounted() {
    this.setServices() 
  },
  methods: {
    setServices() {
        this.services = this.organizationServices
    },
    handleSubmitForm() {
        if (this.searchBy === 'Service Name') {
            this.services = this.organizationServices.filter((service) => service.name.toLowerCase().includes(this.name.toLowerCase()));
        } 
        else if (this.searchBy === 'Service Description') {
            this.services = this.organizationServices.filter((service) => service.description.toLowerCase().includes(this.desc.toLowerCase()));
        }
    },
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.desc = ''
      this.setServices()
    }
  }
}
</script>
