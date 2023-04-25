<template>
    <Transition name="bounce">
      <div
        class="bg-blue-300 text-blue-900 rounded shadow-xl p-4 fixed top-20 right-4 max-w-md w-full"
        role="alert"
        v-if="isVisible"
      >
        <h4 class="text-xl font-quicksand font-semibold mb-2 text-blue-900">{{ title }}</h4>
        <p class="text-lg font-quicksand font-semibold text-blue-900">{{ message }}</p>
        <button
          class="absolute top-2 right-2 focus:outline-none text-3xl"
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
  mounted() {
    this.startTimer();
  },
  methods: {
    startTimer() {
      setTimeout(() => {
        this.isVisible = false;
        this.$emit("close");
      }, 5000); // close after 5 seconds
    },
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
  background-color: rgba(0, 0, 139, 1);
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
