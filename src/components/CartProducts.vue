<template>
  <!--Начало корзины -->
  <section v-if="visibleCart">
    <template>
      <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
        <v-toolbar-title>Корзина: {{ cart_sum }}$ </v-toolbar-title>
        <v-btn
          @click="clearCart(), updateCart()"
          color="indigo darken-5"
          light
          flat
          ><v-toolbar-title class="text-end pa-2"
            >Очистить</v-toolbar-title
          ></v-btn
        >
      </v-toolbar>
    </template>

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
                    <th class="text-left">Кол-во</th>
                    <th class="text-left">Сумма</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in response" :key="item.name" v-bind="item">
                    <td>{{ item.product.productName }}</td>
                    <td>{{ item.product.unitPrice }}</td>
                    <td>
                      <template>
                        <v-icon
                          @click="
                            delCartItem(item.amount, item.product.productId),
                              updateCart()
                          "
                          slot="prepend"
                          color="green"
                        >
                          mdi-minus
                        </v-icon>

                        {{ item.amount }}

                        <v-icon
                          @click="
                            changheCountCartItem(
                              (item.amount += 1),
                              item.product.productId
                            )
                          "
                          slot="append"
                          color="red"
                        >
                          mdi-plus
                        </v-icon>
                      </template>
                    </td>
                    <td>
                      {{ (sum_prod = item.product.unitPrice * item.amount) }}
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

    <template>
      <v-toolbar class="mt-2" color="indigo" dark flat>
        <v-toolbar-title class="subheading"> </v-toolbar-title>
      </v-toolbar>
    </template>
  </section>
  <!--Конец корзины -->
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      response: [
        {
          productId: "ID Продукта",
          productName: "Название",
          unitPrice: "Цена",
          quantityPerUnit: "Кол-во за единицу",
        },
      ],
      sel: {},
      visibleCart: false,
    };
  },

  methods: {
    toggleCart() {
      this.visibleCart = !this.visibleCart;
    },

    updateCart() {
      //вывод из бд
      axios
        .get(`http://localhost:5090/cart/`)
        .then((resp_cart) => {
          console.log("проверыч корзины: ");
          console.log(resp_cart.data);
          this.response = resp_cart.data;
          this.cartSum(resp_cart.data);
        })
        .catch((e) => {
          console.error(e);
        });
    },

    clearCart() {
      axios
        .delete(`http://localhost:5090/cart/`)
        .then((clear_cart) => {
          console.log("проверыч корзины удаления: ");
          console.log(clear_cart);
          this.response = [];
        })
        .catch((e) => {
          console.error("Произошла неведомая хрень: " + e);
        });
    },

    delCartItem(amount, id) {
      if (amount > 1) {
        this.changheCountCartItem((amount -= 1), id);
      } else {
        axios
          .delete(`http://localhost:5090/cart/${id}`)
          .then(() => {
            this.updateCart();
          })
          .catch((e) => {
            console.error("Произошла неведомая хрень: " + e);
          });
      }
    },

    changheCountCartItem(amount, id) {
      axios.put(`http://localhost:5090/cart/${id}/${amount}`).then(() => {
        this.updateCart();
      });
    },

    cartSum(items) {
      this.cart_sum = items.map((i) => i.product.unitPrice * i.amount);
      this.cart_sum = this.cart_sum.reduce((sum, current) => {
        sum + current;
      }, 0);

      console.log("Типа сумма: ");
      console.log(this.cart_sum);

      this.changeSum();
    },

    changeSum() {
      this.$emit(`cart_sum`, this.cart_sum);
    },
  },
};
</script>
