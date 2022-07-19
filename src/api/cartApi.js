import axios from "axios";

const path_cart = `http://localhost:5090/cart/`;

export function addInBasket(id) {
  return axios.post(path_cart + id);
}

export function getCart() {
  //вывод из бд
  return axios.get(path_cart);
}

export function clearCart() {
  return axios.delete(path_cart);
}

export function delCartItem(amount, id) {
  return axios.delete(path_cart + id);
}

export function changheCountCartItem(amount, id) {
  return axios.put(path_cart + id + `/` + amount);
}
