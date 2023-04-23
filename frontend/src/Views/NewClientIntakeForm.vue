<template>
      <main>
      <!--Header-->
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Client Intake Form
      </h1>
      <div class="px-10 py-20">
        <!-- form field -->
        <!-- @submit.prevent stops the submit event from reloading the page-->
        <form @submit.prevent="registerClient">
          <!-- grid container -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Personal Details</h2>
            <!--First Name Input Field-->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">First Name</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.firstName"
                />
                <!--Errors will show, if any-->
                <!-- <span class="text-black" v-if="v$.client.firstName.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.firstName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span> -->
              </label>
            </div>
  
            <!--Middle Name Input Field-->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Middle Name</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder
                  v-model="client.middleName"
                />
              </label>
            </div>
  
            <!--Last Name Input Field-->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Last Name</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder
                  v-model="client.lastName"
                />
                <!--Errors will show, if any-->
                <!-- <span class="text-black" v-if="v$.client.lastName.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.lastName.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span> -->
              </label>
            </div>
  
            <div></div>
            <!--Email Input Field-->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Email</span>
                <input
                  type="email"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.email"
                />
                <!--Errors will show, if any-->
                <!-- <span class="text-black" v-if="v$.client.email.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.email.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span> -->
              </label>
            </div>
            <!-- Phone Number Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Phone Number</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                  v-model="client.phoneNumber.primary"
                />
                <!--Errors will show, if any-->
                <!-- <span
                  class="text-black"
                  v-if="v$.client.phoneNumber.primary.$error"
                >
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.phoneNumber.primary.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span> -->
              </label>
            </div>
            <!-- Alternative Phone Number Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Alternative Phone Number</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                  v-model="client.phoneNumber.alternate"
                />
              </label>
            </div>
          </div>
  
          <!-- grid container -->
          <div
            class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
          >
            <h2 class="text-2xl font-bold">Address Details</h2>
            <!-- Address 1 Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Address Line 1</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.address.line1"
                />
              </label>
            </div>
            <!-- Address 2 Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Address Line 2</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.address.line2"
                />
              </label>
            </div>
            <!-- City Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">City</span>
                <span style="color: #ff0000">*</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.address.city"
                />
                <!--Errors will show, if any-->
                <!-- <span class="text-black" v-if="v$.client.address.city.$error">
                  <p
                    class="text-red-700"
                    v-for="error of v$.client.address.city.$errors"
                    :key="error.$uid"
                  >
                    {{ error.$message }}!
                  </p>
                </span> -->
              </label>
            </div>
            <div></div>
            <!-- County Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">County</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.address.county"
                />
              </label>
            </div>
            <!-- Zip Code Input Field -->
            <div class="flex flex-col">
              <label class="block">
                <span class="text-gray-700">Zip Code</span>
                <input
                  type="text"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  v-model="client.address.zip"
                />
              </label>
            </div>
            <div></div>
            <!-- Add Client Submit Button -->
            <div class="flex justify-between mt-10 mr-20">
              <button class="bg-red-700 text-white rounded" type="submit">
                Add Client
              </button>
            </div>
          </div>
        </form>
      </div>

      <!--Modal component that appears if phone number is already registered-->
      <div v-if="showClientRegisteredModal" >
        <modalComponent @close="clientAlreadyRegisteredPush">
          <template v-slot:clientRegisteredSlot>
            Client Phone # Already Registered
            <p>Please try again</p>
          </template>
        </modalComponent>
      </div>
      <!--Modal component that appears when client is created-->
      <div v-if="showClientAddedModal">
        <modalComponent @close="clientAddedPush">
          <template v-slot:clientAddedSlot>
            Client Added!
            <p>Redirecting...</p>
          </template>
        </modalComponent>
      </div>
    </main>
    <p>role: {{ role }}</p>
</template>

<script>
//import functionalities
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import { mapState } from 'vuex'
import modalComponent from '../components/modalComponent.vue'
import { createClient } from '../../api/api'

export default {
    // allow modal component
    components: {
        modalComponent
    },
    data() {
        return {
            //client variable to hold new client information
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
            },
            //variables that determines if modal components appears
            showClientRegisteredModal: false,
            showClientAddedModal: false
        }
    },

    computed: {
        //computed states so they can be referenced in code
        ...mapState(['role'])
    },

    setup() {
        return { v$: useVuelidate({ $autoDirty: true }) }
    },

    mounted() {
        
    },

    methods: {
        async registerClient() {
            const validateEmail = (email) => {
            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return re.test(String(email).toLowerCase());
            }

            // Usage:
            const isValidEmail = validateEmail(this.client.email);
            console.log(isValidEmail); // true or false
            if (isValidEmail) {
                try {
                    const response = await createClient(this.client);
                    if (response.success) {
                        console.log(response.message);
                        this.$router.push('/findclient')
                    } else {
                        console.log('Client creation failed');
                    }
                } catch (error) {
                    console.log('Error registering client', error)
                }
            } else if (!isValidEmail) {
                console.log('not a valid email')
            }
        }
    }
}
</script>

<style>

</style>