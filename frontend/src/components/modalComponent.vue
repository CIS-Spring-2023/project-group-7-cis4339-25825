<template>
  <!--div to make the background slightly darkened when modal component appears-->
    <div class="backdrop">
      <div class="modal">
        <div :class="['content', 'text-2xl', 'font-bold']">
          <!--Slot that appears when user successfully logs in-->
          <slot name="loginSuccess"></slot>
          <!--Slot that appears when user inputs wrong username/password-->
          <slot name="loginFailed"></slot>
          <!--Slot that appears when user logs out-->
          <slot name="logoutSlot"></slot>
          <!--Slot that appears when user attempts to create a new client, but phone number is already registered-->
          <slot name="clientRegisteredSlot"></slot>
          <!--Slot that appears when a new client is successfully created-->
          <slot name="clientAddedSlot"></slot>
          <!--Slot that appears when an existing client is updated-->
          <slot name="clientUpdatedSlot"></slot>
          <!--Slot that appears when a client is deleted-->
          <slot name="clientDeletedSlot"></slot>
          <!--Slot that appears when a new event is created-->
          <slot name="eventCreatedSlot"></slot>
          <!--Slot that appears when an event is updated-->
          <slot name="eventUpdatedSlot"></slot>
          <!--Slot that appears when an event is deleted-->
          <slot name="eventDeletedSlot"></slot>
          <!--Slot that appears when a new service is created-->
          <slot name="serviceCreatedSlot"></slot>
          <!--Slot that appears when a service is updated-->
          <slot name="serviceUpdatedSlot"></slot>
          <!--Slot that appears when a service is deleted-->
          <slot name="serviceDeletedSlot"></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // lifecycle hook that fires when this component is created
    created() {
      // set the default duration that modal component is on the screen
      let duration = 1500
      // if clientRegisteredSlot or clientAddedSlot is called, then the duration is longer to account for more text on the screen
      if (this.$slots.clientRegisteredSlot || this.$refs.clientAddedSlot) {
        duration = 3000;
      }
      // create a timer variable that emits a 'close' event after the duration (either 1500 or 3000) has been met
      const timer = setInterval(() => {
        clearInterval(timer);
        if (!this.closed) {
          this.$emit("close");
        }
      }, duration);
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
  
  :deep(.content) p {
    font-size: 1.2rem; /* Adjust the font size of the p tag */
    color: gray; /* Set the color of the p tag */
    margin: 0 auto; /* Remove any default margin */
    text-align: center; /* Center the text horizontally */
  }
  </style>
  