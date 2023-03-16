<template>
  <!--div to make the background slightly darkened when modal component appears-->
  <div class="backdrop">
    <!--if background is clicked, then the modal component is closed-->
    <div class="modal" @click.self="closeModal">
      <!--main content-->
        <div class="modal-content">
            <p>Hello Professor (or TA),</p>
            <p>Please login with any of these users:</p>
            <br>
            <p>Viewers (username and password are the same)</p>
            <p>Org 1: viewer1</p>
            <p>Org 2: viewer2</p>
            <p>Org 3: viewer3</p>
            <br>
            <p>Editors (username and password are the same)</p>
            <p>Org 1: editor1</p>
            <p>Org 2: editor2</p>
            <p>Org 3: editor3</p>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        methods: {
          //method called when clicking anywhere other than the model component's main box - this will emit a 'close' to LoginView.vue, which holds a function to detect this event and close the modal component
            closeModal() {
                this.$emit('close')
            }
        }
    }
</script>

<style scoped>
  .backdrop {
        top: 0;
        position: fixed;
        background: rgba(0,0,0,0.5);
        width: 100%;
        height: 100%;
  }
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
</style>