<!-- This file is the modal component that appears when the user successfully deletes a client, event, or service. It provides visual confirmation feedback to let the user know the client/event/service was successfully deleted. -->

<template>
  <Transition name="bounce">
    <div
      class="bg-red-300 text-red-900 rounded shadow-xl p-4 fixed top-20 right-4 max-w-md w-full"
      role="alert"
      v-if="isVisible"
    >
    <!-- Show title and message -->
      <h4 class="text-xl font-quicksand font-semibold mb-2">{{ title }}</h4>
      <p class="text-lg font-quicksand font-semibold">{{ message }}</p>
      <!-- Close button -->
      <button
        class="absolute top-2 right-2 focus:outline-none text-3xl text-red-900"
        aria-label="Close"
        @click="closeModal"
      >
        &times;
      </button>
      <div class="progress w-full h-1 absolute bottom-0 left-0 bg-transparent"></div>
    </div>
  </Transition>
</template>


  
<script>
export default {
  // accept title and message as props from the parent component
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
  // when modal component appears, this will start a timer
  mounted() {
    this.startTimer();
  },
  methods: {
    // method to start timer. After 5 seconds, the modal component will close by itself
    startTimer() {
      setTimeout(() => {
        this.isVisible = false;
        this.$emit("close");
      }, 5000); // close after 5 seconds
    },
    // method to close the modal, either when the user manually clicks the "X" button or after 5 seconds have passed
    closeModal() {
      this.isVisible = false;
      this.$emit("close");
    },
  },
};
</script>
  
<style scoped>
.progress::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(139, 0, 0, 1); /* dark red */
  animation: decrease-width 5s linear forwards;
}

@keyframes decrease-width {
  from {
    width: 100%;
  }
  to {
    width: 0;
  }
}

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
    transform: translate(0, 0) scale(0);
  }
  50% {
    transform: translate(0, 0) scale(1.25);
  }
  100% {
    transform: translate(0, 0) scale(1);
  }
}
</style>

