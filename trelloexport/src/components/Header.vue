<template>
  <div class="row main-container">
    <div class="col-6" style="height: 20%;">
        <img class="col" src="../assets/images/trello-logo-blue.svg"/>
    </div>
    <div class="col-6" style="height: 20%;">
      <div class="row"> 
        <img style="height: 250px;" src="../assets/images/excel.png"/>
        <h1>Exports</h1>
      </div>
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
  font-family: "Simplisicky", Helvetica, Arial;
}
.main-container {
  margin: .5%;
  border-bottom: 2px solid lightslategrey;
  border-radius: 30px;
  max-width: 100%;
  align-content: center;
  justify-content: center;
}
.main-container {
  margin: .5%;
  max-width: 100%;
  align-content: center;
  justify-content: center;
}
</style>
