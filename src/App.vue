<template> <!-- аля html -->
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <textarea v-model="response"></textarea>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'

export default {
  name: 'App',
  data: function () { //вывод данных в textarea
    return {
      response: 'Что-нибудь'
    }
  },
  mounted: function () { //вывод из бд
    axios.get('http://localhost:5090/product').then( resp => {
        console.log(resp)
        this.response = JSON.stringify(resp.data)
    })
    .catch(e => {
      console.error(e)
    });
  },
  components: {
    HelloWorld
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
  margin-top: 60px;
}
</style>
