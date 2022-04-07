<template>
  <!-- аля html -->
  <div style="width: 70%; max-width: 1200px; margin: 30px auto">
    <div id="app">
      <h1 class="display-2 font-weight-bold mb-3">Продуктовая лавка</h1>
      <div>
        <h1>Корзинка</h1>
        <v-simple-table dense>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Корзинный товар</th>
                <th class="text-left">Корзинная цена</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <!-- а могу просто забиндить v-bind="basket" v-for="item in basket" :key="item.name"-->
                <td>{{ basket.name }}</td>
                <td>{{ basket.price }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <div class="text-center">
        <v-btn @click="addInBasket" class="mx-2" fab dark large color="purple">
          <v-icon dark> mdi-android </v-icon>
          BUY
        </v-btn>
      </div>

      <div class="text-center">
        <v-btn class="ma-2" outlined color="indigo"> POST </v-btn>
        <label v-bind="response">Добавленный элемент(?): {{ sel }}</label>
      </div>

      <!-- Таблица с продуктами -->
      <h1>Продукты</h1>
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
            >
              <td>{{ item.productName }}</td>
              <td>{{ item.unitPrice }}</td>
              <td>
                <v-btn
                  @click="addInBasket"
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
          name: null,
          price: null,
        },
      ],
      sel: null,
    };
  },

  methods: {
    addInBasket() {
      // const newProductOfBasket = {
      this.basket = {
        name: this.sel.productName,
        price: this.sel.unitPrice,
      };
      //this.basket.push(newProductOfBasket);
      console.log(
        `currentProduct, ${this.basket}! товар: ${this.basket.name} цена: ${this.basket.price}`
      );

      axios.post(`http://localhost:5090/Product/${this.basket.productId}`, {
        body: this.response,
      });
    },

    selectProduct(currentProduct) {
      this.basket = currentProduct;
      this.sel = currentProduct;
      alert(this.sel.productName); //"Вывод выбранного товара"
    },
  },

  mounted: function () {
    //вывод из бд
    axios
      .get("http://localhost:5090/Product/GetAllProduct")
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
