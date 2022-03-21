<template>
  <!-- аля html -->
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <textarea v-model="response"></textarea>

    <div class="text-center">
      <v-btn @click="add" class="mx-2" fab dark large color="purple">
        <v-icon dark> mdi-android </v-icon>
        BUY
      </v-btn>
    </div>

    <!-- @ = v-on -->
    <button
      @click="add"
      type="button"
      class="my-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      <!-- Heroicon name: solid/mail -->
      <svg
        class="-ml-0.5 mr-2 h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="#ffffff"
      >
        <path
          d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        ></path>
      </svg>
      Добавить
    </button>

    <v-simple-table height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Продукт</th>
            <th class="text-left">Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in response" :key="item.name">
            <td>{{ item.productId }}</td>
            <td>{{ item.unitPrice }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import axios from "axios";

export default {
  name: "App",
  data: function () {
    //вывод данных в textarea
    return {
      response: [
        {
          productId: "ПРОДУКТБЛЯТЬ",
          unitPrice: "НОЛЬСУКА",
        },
      ],
    };
  },

  methods: {
    add() {
      alert(this.response.data); //"На меня тыркнули!"
      //const map = new Map(this.response);
      //console.log(map.get("unitPrice"));
    },
  },
  /*   data() {
    //вывод данных в textarea
    return {
     response: [
        {
          productId: "",
          unitPrice: null,
        },
      ],
    };
  }, */

  mounted: function () {
    //вывод из бд
    axios
      .get("http://localhost:5090/product")
      .then((resp) => {
        console.log(resp);
        this.response = JSON.stringify(resp.data);
        this.productId = this.resp.data;
      })
      .catch((e) => {
        console.error(e);
      });
  },

  components: {
    HelloWorld,
  },
};
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
