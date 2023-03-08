<script>
import useVuelidate from '@vuelidate/core'
import { required, email, alpha, numeric } from '@vuelidate/validators'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) }
  },
  data() {
    return {
      org: '',
      client: {
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: {
          primary: '',
          alternate: ''
        },
        address: {
          line1: '',
          line2: '',
          city: '',
          county: '',
          zip: ''
        }
      }
    }
  },
  created() {
    axios.get(`${apiURL}/org`).then((res) => {
      this.org = res.data._id
    })
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  methods: {
    // if valid:
    //  if client with phonenumber exists in db:
    //    if client already registered with org:
    //      do nothing
    //    else add org to client org array
    //  else create client document
    registerClient() {
      this.v$.$validate().then((valid) => {
        if (valid) {
          axios
            .get(`${apiURL}/clients/lookup/${this.client.phoneNumber.primary}`)
            .then((res) => {
              if (res.data) {
                if (res.data.orgs.includes(this.org)) {
                  alert('Client phone number has already been registered.')
                  this.$router.push({ name: 'findclient' })
                } else {
                  axios
                    .put(`${apiURL}/clients/register/${res.data._id}`)
                    .then(() => {
                      alert('Client registered')
                      this.$router.push({ name: 'findclient' })
                    })
                    .catch((error) => {
                      console.log(error)
                    })
                }
              } else {
                axios
                  .post(`${apiURL}/clients`, this.client)
                  .then(() => {
                    alert('Client added')
                    this.$router.push({ name: 'findclient' })
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              }
            })
        }
      })
    }
  },
  // sets validations for the various data properties
  validations() {
    return {
      client: {
        firstName: { required, alpha },
        lastName: { required, alpha },
        email: { email },
        address: {
          city: { required }
        },
        phoneNumber: {
          primary: { required, numeric }
        }
      }
    }
  }
}
</script>
<template>
  <main>
    <h1
      class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
    >
      Create Service
    </h1>
    <div class="px-10 py-20">
      <!-- @submit.prevent stops the submit event from reloading the page-->
      <form @submit.prevent="registerClient">
        <!-- grid container -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <h2 class="text-2xl font-bold">Service Details</h2>
          <!-- form field -->
          <div class="flex flex-col">
            <label class="block">
              <span class="text-gray-700">Service Name</span>
              <span style="color: #ff0000">*</span>
              <input
                type="text"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                v-model="client.firstName"
              />
              <span class="text-black" v-if="v$.client.firstName.$error">
                <p
                  class="text-red-700"
                  v-for="error of v$.client.firstName.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}!
                </p>
              </span>
            </label>
          </div>

          <!-- form field -->
          <div class="flex flex-col">
          <label>
            <span class="text-gray-700">Description:</span>
            <textarea class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"></textarea>
          </label>
          </div>

          <div class="flex flex-col">
            <label>
                <span class="text-gray-700">Active </span>
                <input 
                    type="checkbox"
                    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
                    checked
                    >
            </label>

          </div>
         
        </div>

        <!-- grid container -->
        <div
          class="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10"
        >
          <!-- submit button -->
          <div class="flex justify-between mt-10 mr-20">
            <button class="bg-red-700 text-white rounded" type="submit">
              Add Service
            </button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>
