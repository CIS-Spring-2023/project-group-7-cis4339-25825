<template>
  <div>
    <div class="modal" @click.self="closeModal">
        <div class="modal-content">
            <h2>Hello Professor (or TA)</h2>
            <p>Please login with any of these users:</p>
            <br>
            <p>Community Garden Organization:</p>
            <p>usersame: viewer1</p>
            <p>password: viewer1</p>
            <p>usersame: editor1</p>
            <p>password: editor1</p>
            <br>
            <p>NextGen Weightlifting Organization</p>
            <p>usersame: viewer2</p>
            <p>password: viewer2</p>
            <p>usersame: editor2</p>
            <p>password: editor2</p>
            <br>
            <p>Animal Welfare Community</p>
            <p>usersame: viewer3</p>
            <p>password: viewer3</p>
            <p>usersame: editor3</p>
            <p>password: editor3</p>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        methods: {
            closeModal() {
                this.$emit('close')
            }
        }
    }
</script>

<style>
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