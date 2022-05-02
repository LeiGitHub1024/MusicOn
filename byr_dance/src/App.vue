<template>
<VotePage></VotePage>
</template>

<script>
import VotePage from './components/Vote.vue'

export default {
  name: 'App',
  components: {
    VotePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1rem;
}
</style>
