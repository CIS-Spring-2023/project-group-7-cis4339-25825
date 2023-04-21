<template>
    <main>
      <div>
        <!--Header-->
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
        <!--Search Client By selection-->
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
          <!--Input box for searching by Client First Name-->
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
          <!--Input box for searching by Client Last Name-->
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
          <!--Clear Search button-->
          <div class="mt-5 grid-cols-2">
            <button
              class="mr-10 border border-red-700 bg-white text-red-700 rounded"
              @click="clearSearch"
              type="submit"
            >
              Clear Search
            </button>
            <!--Search Client button-->
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
          <h3 class="italic">
            <span v-if="userRole === 'editor'">Click table row to edit/display an entry</span>
            <span v-if="userRole === 'viewer'">Click table row to display an entry</span>
          </h3>
        </div>
        <!--Table showing list of Clients-->
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
                :class="{ 'hoverRow': hoverId === client.id }"
                @mouseenter="hoverId = client.id"
                @mouseleave="hoverId = null"
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
    </main>
  </template>
  

<script>
//import functionalities
import { mapState } from 'vuex'

export default {
    data() {
    return {
      //variable to store all clients and their information for the organization
      clients: [],
      // Parameters for search to occur
      searchBy: '',
      firstName: '',
      lastName: '',
      phone: '',
      // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
      hoverId: null,
    }
  },
  computed: {
    //computed states so they can be referenced in code
    ...mapState(['organizationId', 'organizationClients', 'userRole'])
  },
  mounted() {
    //when this component is mounted, the setClients method is called
    this.setClients() 
  },
  methods: {
    //method called when component is mounted. This sets the "clients" variable to the "organizationClients" state, which holds all clients and their information for the organization
    setClients() {
        this.clients = this.organizationClients
    },
    //method called when user searches by client name or number
    handleSubmitForm() {
      //if user searches by client name
        if (this.searchBy === 'Client Name') {
          //if user searches by both first name and last name
            if (this.firstName && this.lastName) {
            //filter the client list by first and last name
              this.clients = this.organizationClients.filter((client) => client.firstName.toLowerCase().includes(this.firstName.toLowerCase()) && client.lastName.toLowerCase().includes(this.lastName.toLowerCase()));
            } 
            //if user searches only by first name
            else if (this.firstName && !this.lastName) {
              //filter the client list by first name only
              this.clients = this.organizationClients.filter((client) => client.firstName.toLowerCase().includes(this.firstName.toLowerCase()));
            } 
            //if user searches only by last name
            else if (this.lastName && !this.firstName) {
              //filter the client list by last name only
              this.clients = this.organizationClients.filter((client) => client.lastName.toLowerCase().includes(this.lastName.toLowerCase()));
            }
        //if user searches by client phone number
        } else if (this.searchBy === 'Client Number') {
          //filter the client list by phone number
            this.clients = this.organizationClients.filter((client) => client.phone.includes(this.phone));
        }
    },
    //method called when user clicks "Clear Search" button
    clearSearch() {
      // Resets all the variables
      this.searchBy = ''
      this.name = ''
      this.phone = ''
      this.setClients()
    },
    //method called when user clicks on a client row in the list of clients
    editClient(clientId) {
      //if the user is an editor, they will be pushed to "UpdateClient.vue" with the client ID as a parameter. This will allow them to edit the selected client.
      if (this.userRole === 'editor') {
        this.$router.push({ name: 'updateclient', params: { id: clientId } })
      }
      //if the user is a viewer, they will be pushed to "ViewClient.vue" with the client ID as a parameter. This will only allow them to view the selected client's information, not edit.
      else if (this.userRole === 'viewer') {
        this.$router.push({name: 'viewclient', params: { id: clientId } })
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