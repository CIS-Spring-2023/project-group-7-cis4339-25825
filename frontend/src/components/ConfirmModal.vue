<template>
    <Transition name="bounce">
      <div
        class="alert-modal bg-gray-200 p-4 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-md shadow-xl rounded"
        role="alert"
        v-if="isVisible"
      >
        <div class="text-left">
          <h4 class="text-2xl font-quicksand font-semibold mb-2">{{ title }}</h4>
          <p class="mb-4 text-lg font-quicksand font-medium">{{ message }}</p>
        </div>
        <div class="btn-group alert-modal-buttons text-center" role="group" aria-label="Modal buttons">
          <button
            type="button"
            class="btn-yes bg-green-500 hover:bg-green-600 text-white py-2 px-20 rounded mr-2 transition-colors font-bold"
            @click="closeModalWithYes"
          >
            Yes
          </button>
          <button
            type="button"
            class="btn-no bg-red-500 hover:bg-red-600 text-white py-2 px-20 rounded transition-colors font-bold"
            @click="closeModalWithNo"
          >
            No
          </button>
        </div>
      </div>
    </Transition>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        default: "Alert",
      },
      message: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        isVisible: true,
      };
    },
    methods: {
      closeModalWithNo() {
        this.isVisible = false;
        this.$emit("close", "no");
      },
      closeModalWithYes() {
        this.isVisible = false;
        this.$emit("close", "yes");
      },
    },
  };
  </script>
  
  <style scoped>
  .bounce-enter-active {
    transform: translate(-50%, -50%);
    animation: bounce-in 0.5s;
  }
  
  .bounce-leave-active {
    transform: translate(-50%, -50%);
    animation: bounce-in 0.5s reverse;
  }
  
  @keyframes bounce-in {
    0% {
      transform: translate(-50%, -50%) scale(0);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.25);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  </style>
  