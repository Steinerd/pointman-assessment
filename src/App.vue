<template>
  <div id="app">
    <ContactsList/>
  </div>
</template>

<script>
import ContactsList from "./components/ContactsList";

export default {
  name: "App",
  components: {
    ContactsList
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
