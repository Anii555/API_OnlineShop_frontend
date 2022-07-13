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
              v-bind="item"
              @click="selectProduct(item)"
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
      <template>
        <v-container fluid>
          <v-data-iterator
            :items="response"
            :items-per-page.sync="infoCardPerPage"
            hide-default-footer
          >
            <template v-slot:header> image.png </template>

            <template>
              <v-row>
                <v-col cols="12" sm="8" md="2" lg="7">
                  <v-card>
                    <!-- Начало удачной вставки-->
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
                            v-bind="item"
                            @click="selectProduct(item)"
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
                  </v-card>
                </v-col>
                <!-- Конец удачной вставки-->
                <v-col cols="12" sm="4" md="2" lg="5">
                  <v-card v-if="sel" class="relative">
                    <v-card-title class="subheading font-weight-bold">
                      Информация о продукте
                    </v-card-title>

                    <v-divider></v-divider>

                    <v-list dense>
                      <v-list-item>
                        <v-list-item-content>ID:</v-list-item-content>
                        <v-list-item-content class="align-end">
                          {{ sel.productId }}
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>Название:</v-list-item-content>
                        <v-list-item-content class="align-end">
                          {{ sel.productName }}
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>Цена:</v-list-item-content>
                        <v-list-item-content class="align-end">
                          {{ sel.unitPrice }}
                        </v-list-item-content>
                      </v-list-item>

                      <v-list-item>
                        <v-list-item-content>Кол-во:</v-list-item-content>
                        <v-list-item-content class="align-end">
                          {{ sel.quantityPerUnit }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </v-card>
                </v-col>
              </v-row>
            </template>

            <template v-slot:footer>
              <v-toolbar class="mt-2" color="indigo" dark flat>
                <v-toolbar-title class="subheading"> </v-toolbar-title>
              </v-toolbar>
            </template>

            <cart-products ref="cartProd" @cart_sum="changeSum" />
          </v-data-iterator>
        </v-container>
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CartProducts from "./components/CartProducts.vue";

export default {
  name: "App",

  components: {
    CartProducts,
  },

  data: function () {
    //вывод данных в textarea
    return {
      response: [
        {
          productId: "ID Продукта",
          productName: "Название",
          unitPrice: "Цена",
          quantityPerUnit: "Кол-во за единицу",
        },
      ],
      basket: [],
      sel: {},
      infoCardPerPage: 1,
      visibleCart: false,
      total: {
        cart_sum: 0.0,
      },
    };
  },

  methods: {
    addInBasket(id) {
      axios.post(`http://localhost:5090/cart/${id}`).then(() => {
        this.$refs.cartProd.updateCart();
      });
    },

    selectProduct(selectItem) {
      this.sel = selectItem;
    },

    changeSum(cart_sum) {
      this.total.cart_sum = cart_sum;
    },
  },

  mounted: function () {
    //вывод из бд
    axios
      .get("http://localhost:5090/product/getAllProducts")
      .then((resp) => {
        console.log(resp);
        this.response = resp.data;
      })
      .catch((e) => {
        console.error(e);
      });

    this.$root.$on(`cart_sum`, this.changeSum);
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
