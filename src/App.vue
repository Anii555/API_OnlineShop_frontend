<template>
  <!-- аля html -->
  <div style="width: 70%; max-width: 1200px; margin: 30px auto">
    <div id="app">
      <!-- Таблица с продуктами -->
      <h1 class="display-2 font-weight-bold mb-3">Продуктовая лавка</h1>
      <br />
      <v-simple-table height="300px">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Продукт</th>
              <th class="text-left">Цена</th>
              <th class="text-left">Мульон кнопок</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in response"
              :key="item.name"
              @click="selectProduct(item)"
              v-bind="item"
            >
              <td>{{ item.productName }}</td>
              <td>{{ item.unitPrice }}</td>
              <td>
                <v-btn
                  @click="addInBasket(item.productId)"
                  class="mx-2 mb-2"
                  fab
                  dark
                  large
                  color="purple"
                >
                  <v-icon dark> mdi-android </v-icon>
                  BUY
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <!-- Таблица с продуктами -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data: function () {
    //вывод данных в textarea
    return {
      response: [
        {
          productId: "ID Продукта",
          productName: "Название",
          unitPrice: "Цена",
        },
      ],
      basket: [
        {
          name: undefined,
          price: undefined,
        },
      ],
      sel: undefined,
    };
  },

  methods: {
    addInBasket(id) {
      axios.post(`http://localhost:5090/product/${id}`);
    },
  },

  mounted: function () {
    //вывод из бд
    axios
      .get("http://localhost:5090/product/getAllProduct")
      .then((resp) => {
        console.log(resp);
        this.response = resp.data;
      })
      .catch((e) => {
        console.error(e);
      });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #3a1a6a;
  margin-top: 60px;
}
</style>
