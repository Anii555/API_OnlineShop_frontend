<template>
  <!-- аля html -->
  <!-- <div
    :style="{ backgroundImage: 'url(' + require('@/assets/meat.jpg') + ')' }"
  > -->
  <div style="width: 70%; max-width: 1200px; margin: 30px auto">
    <div id="app">
      <h1 class="display-2 font-weight-bold mb-3">Продуктовая лавка</h1>

      <!-- <v-img
        src="https://sun9-44.userapi.com/impg/hLDGW6FL2wCqoRhKSYMeBUmJz2Rww8nsn3oYDg/v0p7e46upww.jpg?size=1080x1080&quality=95&sign=8a2db2e12c7bc12a2664f5217500bf6d&type=album"
        aspect-ratio="2"
      ></v-img>
      <div class="subheading pt-4"></div> -->
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
                <!-- а могу просто забиндить v-bind="Basket" v-for="item in Basket" :key="item.name"-->
                <td>{{ Basket.name }}</td>
                <td>{{ Basket.price }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>

      <div class="text-center">
        <v-btn @click="AddInBasket" class="mx-2" fab dark large color="purple">
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

      <div class="text-center">
        <v-btn @click="created" class="ma-2" outlined color="indigo">
          POST
        </v-btn>
        <v-btn class="ma-2" outlined fab color="teal">
          <v-icon>mdi-format-list-bulleted-square</v-icon>
        </v-btn>
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
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in response" :key="item.name" @click="select(item)">
              <td>{{ item.productName }}</td>
              <td>{{ item.unitPrice }}</td>
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
      Basket: [],
      sel: null,
    };
  },

  methods: {
    AddInBasket() {
      // const NewProductOfBasket = {
      this.Basket = {
        name: this.sel.productName,
        price: this.sel.unitPrice,
      };
      //this.Basket.push(NewProductOfBasket);

      alert(
        `currentProduct, ${this.Basket}! товар: ${this.Basket.name} цена: ${this.Basket.price}`
      );
      //console.log(currentProduct);

      //localStorage.setItem("cryptonomicon-list", JSON.stringify(this.tickers));
      //this.subscribeToUpdates(currentProduct.name);
    },

    created() {
      (this.response.productId = "555"),
        (this.response.productName = "ТЕСТ"),
        (this.response.unitPrice = "555"),
        axios
          .post("http://localhost:5090/product", this.response)
          //.then((response) => (this.productName = response.data.productName));
          .then((rez) => {
            console.log(rez);
            this.response = JSON.stringify(rez.data); //для массива
            //this.response = rez.data;
            //this.productId = this.resp.data;
          });
      alert(this.response);
    },

    add: function () {
      axios
        .post("http://localhost:5090/product", {
          body: this.response,
        })
        .then((resp) => {
          console.log(resp);
          //this.response = JSON.stringify(resp.data); //для массива
          this.response = resp.data;
          //this.productId = this.resp.data;
        })
        .catch((e) => {
          console.error(e);
        });
    },

    select(currentProduct) {
      this.Basket = currentProduct;
      this.sel = currentProduct;
      alert(this.sel.productName); //"Вывод выбранного товара"
    },
  },

  mounted: function () {
    //вывод из бд
    axios
      .get("http://localhost:5090/product")
      .then((resp) => {
        console.log(resp);
        //this.response = JSON.stringify(resp.data); //для массива
        this.response = resp.data;
        //this.productId = this.resp.data;
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
