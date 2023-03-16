<template>
    <main>
      <div>
        <!--Header-->
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
          <!-- Displays Service Name and Description selection -->
          <div class="flex flex-col">
            <select
              class="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              v-model="searchBy"
            >
              <option value="Service Name">Service Name</option>
              <option value="Service Description">Service Description</option>
            </select>
          </div>
          <!--Display service name search field-->
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
          <!--Display service description search field-->
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
            <!--Clear Search button-->
            <button
              class="mr-10 border border-red-700 bg-white text-red-700 rounded"
              @click="clearSearch"
              type="submit"
            >
              Clear Search
            </button>
            <!--Search Service button-->
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
      <!--List of Services table-->
        <div class="ml-10">
          <h2 class="text-2xl font-bold">List of Services</h2>
          <h3 class="italic">
            <span v-if="userRole === 'editor'">Click table row to edit/display an entry</span>
            <span v-if="userRole === 'viewer'">Click table row to display an entry</span>
          </h3>
        </div>
        <div class="flex flex-col col-span-2">
          <table class="min-w-full shadow-md rounded">
            <thead class="bg-gray-50 text-xl">
              <tr>
                <th class="p-4 text-left" style="width: 25%;">Service Name</th>
                <th class="p-4 text-left" style="width: 75%;">Service Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-300">
              <tr
                @click="editService(service.id)"
                v-for="service in servicesList"
                :key="service.id"
                class="cursor-pointer"
                :class="{ 'hoverRow': hoverId === service.id }"
                @mouseenter="hoverId = service.id"
                @mouseleave="hoverId = null"
              >
                <td class="p-4 text-left">{{ service.name }}</td>
                <td class="p-4 text-left text-sm">{{ service.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </template>

<script>
//import functionalities
import { mapState } from 'vuex'

export default {
  data() {
    return {
      //variable to hold the services for the organization
      servicesList: [],
      // Parameters for search to occur
      searchBy: '',
      name: '',
      desc: '',
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  computed: {
    //computed states so they can be referenced in code
    ...mapState(['organizationServices', 'userRole'])
  },
  //when component is mounted, setServicesList is called
  mounted() {
    this.setServicesList() 
  },
  methods: {
    //method called when component is mounted, it sets the "servicesList" variable to the "organizationServices" state, which holds all services and their information for the organization
    setServicesList() {
        this.servicesList = this.organizationServices
    },
    //method called when user searches for services with criteria
    handleSubmitForm() {
      //if user searched by service name
        if (this.searchBy === 'Service Name') {
          //filter the services list by service name
            this.servicesList = this.organizationServices.filter((service) => service.name.toLowerCase().includes(this.name.toLowerCase()));
        } 
        //if user searched by service description
        else if (this.searchBy === 'Service Description') {
            //filter the services list by service description
            this.servicesList = this.organizationServices.filter((service) => service.description.toLowerCase().includes(this.desc.toLowerCase()));
        }
    },
    //method called when user clicks "Clear Search" button
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.desc = ''
      this.setServicesList()
    },
    //method called when user clicks on a service row in the "List of Services" section
    editService(serviceID) {
      //if user has the role "editor", they will be pushed to "ServiceDetails.vue" with the service ID as a parameter, where they may view and edit the selected service.
      if (this.userRole === 'editor') {
        this.$router.push({ name: 'servicedetails', params: { id: serviceID } })
      }
      //if user has the role "viewer", they will be pushed to "ViewService.vue" with the service ID as a parameter, where they may only view the service information, not edit.
      else if (this.userRole === 'viewer') {
        this.$router.push({ name: 'viewservice', params: { id: serviceID } })
      }
    }
  }
}
</script>

<style scoped>
  .hoverRow {
    background-color: rgba(255, 0, 0, 0.1);
    transition: background-color 0.3s ease-in-out;
  }
</style>