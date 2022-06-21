<template>
  <!--Начало корзины -->
  <section v-if="visibleCart">
    <template>
      <v-toolbar class="mb-2" color="indigo darken-5" dark flat>
        <v-toolbar-title>Корзина: {{ cart_sum }}$</v-toolbar-title>
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

    <template>
      <v-toolbar class="mt-2" color="indigo" dark flat>
        <v-toolbar-title class="subheading"> </v-toolbar-title>
      </v-toolbar>
    </template>
  </section>
  <!--Конец корзины -->
</template>

<script>
export default {
  /*   emits: {
    "visable-cart-items": (value) => typeof value === "bool",
  }, */

  data: function () {
    return { visibleCart: false };
  },

  methods: {
    toggleCart() {
      this.visibleCart = !this.visibleCart;
      //this.$emit("visable-cart-items", this.visibleCart);
    },
  },
};
</script>
