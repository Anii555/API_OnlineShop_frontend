import axios from "axios";

const path_cart = `http://localhost:5090/account/`;

export function signIn(login, password) {
  var rez = JSON.stringify({ login, password });
  return axios.post(path_cart + "register", rez);
}

export function signUp() {
  return axios.post(path_cart + "login");
}
