const axios = require("axios").default;

mounted: function getAllProducts() {
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
}
