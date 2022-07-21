import axios from "axios";

const path_cart = `http://localhost:5090/account/`;

export function signIn(login, password) {
  var rez = JSON.stringify({ login, password });

  return axios.post(path_cart + "register", rez);
}

//способ 1
export function signUp() {
  return axios.post(path_cart + "login");
}

//способ 2 (этот наверное правильнее? после коммов удалю "//")
export function login(login, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  };

  return fetch(path_cart + "login", requestOptions)
    .then(handleResponse)
    .then((user) => {
      // login successful if there's a jwt token in the response
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

export function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        location.reload(true);
      }

      const error = (data && data.message) || response.statusText;

      return Promise.reject(error);
    }

    return data;
  });
}

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}
