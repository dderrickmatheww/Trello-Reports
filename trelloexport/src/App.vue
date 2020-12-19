<template>
  <div id="app">
    <Header />
    <Export />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Export from './components/Export';

export default {
  name: 'App',
  components: {
    Header,
    Export
  },
  beforeCreate: function () {
    this.$store.commit('getTrelloCards');
  }
}
</script>

<style>

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

@font-face {
  font-family: "Simplisicky";
  src: local("Simplisicky"),
   url(./fonts/Simplisicky.ttf) format("truetype");
}
</style>
