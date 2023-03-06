<script>
import { DateTime } from 'luxon'
import axios from 'axios'
const apiURL = import.meta.env.VITE_ROOT_API

export default {
  data() {
    return {
      services: [],
      // Parameter for search to occur
      searchBy: '',
      name: '',
      serviceDate: ''
    }
  }
};
</script>

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
            <option value="Service Date">Service Date</option>
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
        <!-- Displays Service date search field -->
        <div class="flex flex-col" v-if="searchBy === 'Service Date'">
          <input
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="date"
            v-model="serviceDate"
            v-on:keyup.enter="handleSubmitForm"
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
              <th class="p-4 text-left">Service Date</th>
              <th class="p-4 text-left">Service Address</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-300">
            <tr
              @click="editEvent(service._id)"
              v-for="service in services"
              :key="event._id"
            >
              <td class="p-2 text-left">{{ service.name }}</td>
              <td class="p-2 text-left">{{ formattedDate(service.date) }}</td>
              <td class="p-2 text-left">{{ service.address.line1 }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
