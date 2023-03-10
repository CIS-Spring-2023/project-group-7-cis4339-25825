<template>
  <div class="backdrop">
    <div class="modal" @click.self="closeModal">
        <div class="modal-content">
            <p>Hello Professor (or TA),</p>
            <p>Please login with any of these users:</p>
            <br>
            <p>Community Garden Organization:</p>
            <p>usersame/password: viewer1</p>
            <p>usersame/password: editor1</p>
            <br>
            <p>NextGen Weightlifting Organization</p>
            <p>usersame/password: viewer2</p>
            <p>usersame/password: editor2</p>
            <br>
            <p>Animal Welfare Community</p>
            <p>usersame/password: viewer3</p>
            <p>usersame/password: editor3</p>
            <br>
            <br>
            <p>Please Note:</p>
            <p>- Refreshing the app will lose any changes to data.</p>
            <p>- Please remember to run the JSON file:</p>
            <p>npm install -g json-server</p>
            <p>json-server data/db.json</p>
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