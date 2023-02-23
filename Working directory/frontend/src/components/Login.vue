<script>
    export default {
        data() {
            return {
            username: '',
            password: '',
            };
        }
    };
</script>

<template>
    <div>
      <h1
        class="font-bold text-4xl text-red-700 tracking-widest text-center mt-10"
      >
        Login
      </h1>
      <br>
      <form class="flex flex-col items-center" @submit.prevent="login">
        <label class="text-2xl font-bold">
          Username:
          <input type="text" v-model="username" required class="w-80 p-2 border border-gray-400 rounded">
        </label>
        <br>
        <label class="text-2xl font-bold">
          Password:
          <input type="password" v-model="password" required class="w-80 p-2 border border-gray-400 rounded">
        </label>
        <br>
        <button class="bg-red-700 text-white rounded" type="submit">Login</button>
      </form>
    </div>
  </template>
