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
                v-model="description"
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
              @click="loadData"
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
            <span v-if="role === 'editor'">Click table row to edit/display an entry</span>
            <span v-if="role === 'viewer'">Click table row to display an entry</span>
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
                @click="editService(service._id)"
                v-for="service in services"
                :key="service._id"
                class="cursor-pointer"
                :class="{ 'hoverRow': hoverId === service._id }"
                @mouseenter="hoverId = service._id"
                @mouseleave="hoverId = null"
              >
                <td class="p-4 text-left">{{ service.name }}</td>
                <td class="p-4 text-left text-sm">{{ service.description }}</td>
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
import { getOrgRecentServices, searchServices } from '../../api/api'
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
            //variable to hold the services for the organization
            services: null,
            // Parameters for search to occur
            searchBy: null,
            name: null,
            description: null,
            // variable stores the ID of the row that the mouse is currently hovering over (to highlight the row red)
            hoverId: null,
            isLoading: false,
            alreadyMounted: false,
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
                this.name = ''
                this.description = ''
                console.log('loadData called')
                this.isLoading = true;
                try {
                    const response = await getOrgRecentServices();
                    this.services = response;
                } catch (error) {
                    console.log('loadData error', error)
                }
                this.isLoading = false;

                if (!this.alreadyMounted) {
                  const query = new URLSearchParams(this.$route.query);
                  if (query.get('success') === 'true') {
                      console.log('success is true')
                      this.successModal = true;
                      this.title = "Success!"
                      this.message = "Service successfully created"
                  }
                  if (query.get('update') === 'true') {
                      console.log('update is true')
                      this.updateModal = true;
                      this.title = "Updated!"
                      this.message = "Service successfully updated."
                  }
                  if (query.get('delete') === 'true') {
                      console.log('delete is true')
                      this.deleteModal = true;
                      this.title = "Deleted!"
                      this.message = "Service successfully deleted."
                  }
                  this.alreadyMounted = true;
                }

            },

            async handleSubmitForm() {
                if (this.searchBy === 'Service Name') {
                    if (this.name) {
                    try {
                        const query = {
                            searchBy: 'name',
                            name: this.name
                        }
                        console.log('query', query)
                        const response = await searchServices(query)
                        this.services = response;
                    } catch (error) {
                        console.error('Error searching services:', error)
                    }
                    }
                } else if (this.searchBy === 'Service Description') {
                    if (this.description) {
                        try {
                            const query = {
                                searchBy: 'description',
                                description: this.description
                            }
                            const response = await searchServices(query)
                            this.services = response;
                        } catch (error) {
                            console.error('Error searching services:', error)
                        }
                    }
                }
            },

            //method called when user clicks on a service row in the "List of Services" section
            editService(serviceID) {
              //if user has the role "editor", they will be pushed to "ServiceDetails.vue" with the service ID as a parameter, where they may view and edit the selected service.
              if (this.role === 'editor') {
                this.$router.push({ name: 'servicedetails', params: { id: serviceID }, query: { main: true } })
              }
              //if user has the role "viewer", they will be pushed to "ViewService.vue" with the service ID as a parameter, where they may only view the service information, not edit.
              else if (this.role === 'viewer') {
                this.$router.push({ name: 'viewservice', params: { id: serviceID } })
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