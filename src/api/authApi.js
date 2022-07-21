import axios from "axios";

const path_cart = `http://localhost:5090/account/`;

export function signUp(login, password) {
  var rez = JSON.stringify({ login, password });

  return axios.post(path_cart + "register", rez);
}

//способ 1
export function signIn() {
  return axios.post(path_cart + "login").then((user) => {
    if (user.status === 401) {
      // auto logout if 401 response returned from api
      logout();
      location.reload(true);
    }

    // login successful if there's a jwt token in the response
    if (user.token) {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user.data));
    }
    return user;
  });
}

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
