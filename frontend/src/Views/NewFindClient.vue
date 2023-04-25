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
              v-model="phoneNumber"
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
              @click="loadData"
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
            <span v-if="role === 'editor'">Click table row to edit/display an entry</span>
            <span v-if="role === 'viewer'">Click table row to display an entry</span>
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
                <td class="p-2 text-left">
                  {{ client.phoneNumber.primary }}
                </td>
                <td class="p-2 text-left">{{ client.address.city }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <LoadingModal v-if="isLoading"></LoadingModal>
      </div>

      <Transition name="bounce">
          <SuccessModal v-if="successModal" @close="closeSuccessModal" :title="title" :message="message" />
      </Transition>

      <Transition name="bounce">
          <UpdateModal v-if="updateModal" @close="closeUpdateModal" :title="title" :message="message" />
      </Transition>

    <Transition name="bounce">
        <DeleteModal v-if="deleteModal" @close="closeDeleteModal" :title="title" :message="message" />
    </Transition>

    </main>
</template>

<script>
import { mapState } from 'vuex'
import { getOrgRecentClients, searchClients } from '../../api/api'
import LoadingModal from '../components/LoadingModal.vue'
import SuccessModal from '../components/SuccessModal.vue'
import UpdateModal from '../components/UpdateModal.vue'
import DeleteModal from '../components/DeleteModal.vue'

export default {
  components: {
      LoadingModal,
      SuccessModal,
      UpdateModal,
      DeleteModal
  },
    data() {
        return {
            //variable to store all clients and their information for the organization
            clients: null,
            // Parameters for search to occur
            searchBy: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
            hoverId: null,
            isLoading: false,
            successModal: false,
            updateModal: false,
            deleteModal: false,
            title: "",
            message: ""
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
            // Resets all the variables
            this.searchBy = ''
            this.firstName = ''
            this.lastName = ''
            this.phoneNumber = ''
            console.log('loadData called')
            this.isLoading = true;
            try {
                const response = await getOrgRecentClients();
                this.clients = response;
            } catch (error) {
                console.log('loadData error', error)
            }
            this.isLoading = false;
            const query = new URLSearchParams(this.$route.query);
            if (query.get('success') === 'true') {
                console.log('success is true')
                this.successModal = true;
                this.title = "Success!"
                this.message = "Client successfully created"
            }
            if (query.get('update') === 'true') {
                console.log('update is true')
                this.updateModal = true;
                this.title = "Updated!"
                this.message = "Client successfully updated."
            }
            if (query.get('delete') === 'true') {
                console.log('delete is true')
                this.deleteModal = true;
                this.title = "Deleted!"
                this.message = "Client successfully deleted."
            }
        },
        async handleSubmitForm() {
            if (this.searchBy === 'Client Name') {
                if (this.firstName || this.lastName) {
                try {
                    const query = {
                        searchBy: 'name',
                        firstName: this.firstName,
                        lastName: this.lastName,
                    }
                    console.log('query', query)
                    const response = await searchClients(query)
                    this.clients = response;
                } catch (error) {
                    console.error('Error searching clients:', error)
                }
                }
            } else if (this.searchBy === 'Client Number') {
                if (this.phoneNumber) {
                    try {
                        const query = {
                            searchBy: 'number',
                            phoneNumber: this.phoneNumber
                        }
                        const response = await searchClients(query)
                        this.clients = response;
                    } catch (error) {
                        console.error('Error searching clients:', error)
                    }                    
                }
            }
        },

        //method called when user clicks on a client row in the list of clients
        editClient(clientId) {
          //if the user is an editor, they will be pushed to "UpdateClient.vue" with the client ID as a parameter. This will allow them to edit the selected client.
          if (this.role === 'editor') {
            this.$router.push({ name: 'updateclient', params: { id: clientId }, query: { main: true } })
          }
          //if the user is a viewer, they will be pushed to "ViewClient.vue" with the client ID as a parameter. This will only allow them to view the selected client's information, not edit.
          else if (this.role === 'viewer') {
            this.$router.push({name: 'viewclient', params: { id: clientId } })
          }
        },

        closeSuccessModal() {
            this.successModal = false;
            this.title = '';
            this.message = '';
        },

        closeUpdateModal() {
            this.updateModal = false;
            this.title = '';
            this.message = '';
        },
        
        closeDeleteModal() {
            this.deleteModal = false;
            this.title = '';
            this.message = '';
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