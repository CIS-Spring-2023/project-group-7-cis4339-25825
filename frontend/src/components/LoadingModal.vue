<!-- This file contains the loading wheel to show when API calls are being made. This is so that the user knows they must wait a bit for the API calls to finish-->

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="w-32 h-32 rounded-full flex items-center justify-center">
      <svg class="animate-spin h-16 w-16 text-gray-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
        <path class="opacity-75" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M7.5 12a4.5 4.5 0 0 1 4.5-4.5"></path>
      </svg>
    </div>
  </div>
</template>
  
<script>
export default {};
</script>

<style>
</style>
  