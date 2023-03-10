<template>
    <div class="backdrop">
      <div class="modal">
        <div :class="['content', 'text-2xl', 'font-bold']">
          <slot name="loginSuccess"></slot>
          <slot name="loginFailed"></slot>
          <slot name="logoutSlot"></slot>
          <slot name="clientRegisteredSlot"></slot>
          <slot name="clientAddedSlot"></slot>
          <slot name="clientUpdatedSlot"></slot>
          <slot name="clientDeletedSlot"></slot>
          <slot name="eventCreatedSlot"></slot>
          <slot name="eventUpdatedSlot"></slot>
          <slot name="eventDeletedSlot"></slot>
          <slot name="serviceCreatedSlot"></slot>
          <slot name="serviceUpdatedSlot"></slot>
          <slot name="serviceDeletedSlot"></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    created() {
    let duration = 1500;
    if (this.$slots.clientRegisteredSlot || this.$refs.clientAddedSlot) {
      duration = 3000;
    }
    const timer = setInterval(() => {
      clearInterval(timer);
      if (!this.closed) {
        this.$emit("close");
      }
    }, duration);
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
    },
  };
  </script>
  
  <style scoped>
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    max-width: 90%; /* Set a maximum width for the modal */
    width: auto; /* Set the width to adjust automatically */
    height: auto; /* Set the height to adjust automatically */
    background-color: white;
    border-radius: 10px; /* Add more rounded corners */
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1),
      0 6px 6px rgba(0, 0, 0, 0.2); /* Add box shadow */
    text-align: center;
    margin: 0 auto;
    padding: 2%;
    display: flex; /* Center the content of the slot horizontally */
    flex-direction: column;
    justify-content: center;/* Center the content of the slot horizontally */
    align-items: center;
}
  .content {
    /* Optional: add some styles to the content of the slot */
    font-size: 1.5rem; /* Adjust the font size to your liking */
    margin-bottom: 20px;
    height: 100%; /* Set the height to 100% */
    display: flex; /* Use flexbox to center the text */
    flex-direction: column; /* Set flex-direction to column */
    justify-content: center; /* Center the text vertically */
  }
  
  ::v-deep .content p {
    font-size: 1.2rem; /* Adjust the font size of the p tag */
    color: gray; /* Set the color of the p tag */
    margin: 0 auto; /* Remove any default margin */
    text-align: center; /* Center the text horizontally */
  }
  </style>
  