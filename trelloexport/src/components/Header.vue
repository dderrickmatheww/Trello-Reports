<template>
  <div class="row">
    <div class="col-6" style="height: 20%;">
        <img class="col" src="../assets/images/trello-logo-blue.svg"/>
    </div>
    <div class="col-6" style="height: 20%;">
        <h1>Exports</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: center;
  font-size: 225px;
  color: #1D6F42;
}
.row {
  margin: .5%;
  border-bottom: 2px solid lightslategrey;
  border-radius: 30px;
  max-width: 100%;
  align-content: center;
  justify-content: center;
}
</style>
