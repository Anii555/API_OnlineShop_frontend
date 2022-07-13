const axios = require("axios").default;

function addInBasket(id) {
  axios.post(`http://localhost:5090/cart/${id}`).then(() => {
    this.$refs.cartProd.updateCart();
  });
}
