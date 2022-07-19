import axios from "axios";
const path_product = `http://localhost:5090/product/`;

export function getAllProducts() {
  //вывод из бд
  return axios.get(path_product + getAllProducts);
}
