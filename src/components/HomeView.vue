<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="8">
            <v-card class="elevation-12">
              <v-window v-model="step">
                <v-window-item :value="1">
                  <v-row>
                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >
                          Sign in to Anii Project
                        </h1>
                        <h4 class="text-center mt-4">
                          Ensure your Login for registration
                        </h4>
                        <v-form>
                          <v-text-field
                            v-model="login"
                            label="Login"
                            name="Login"
                            type="text"
                            color="teal accent-3"
                          >
                            {{ login }}
                          </v-text-field>

                          <v-text-field
                            v-model="password"
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-form>
                        <h3 class="text-center mt-4">Forgot your password ?</h3>
                      </v-card-text>
                      <div class="text-center mt-3">
                        <v-btn
                          @click="signIn(this.login, this.password)"
                          rounded
                          color="teal accent-3"
                          dark
                          >SIGN IN</v-btn
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Hello, Friend!</h1>
                        <h5 class="text-center">
                          Enter your personal details and start journay with us
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step++"
                          >SIGN UP</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
                <v-window-item :value="2">
                  <v-row class="fill-height">
                    <v-col cols="12" md="4" class="teal accent-3">
                      <v-card-text class="white--text mt-12">
                        <h1 class="text-center display-1">Welcome Back!</h1>
                        <h5 class="text-center">
                          To Keep connected with us please login with your
                          personnel info
                        </h5>
                      </v-card-text>
                      <div class="text-center">
                        <v-btn rounded outlined dark @click="step--"
                          >Sign in</v-btn
                        >
                      </div>
                    </v-col>

                    <v-col cols="12" md="8">
                      <v-card-text class="mt-12">
                        <h1
                          class="text-center display-2 teal--text text--accent-3"
                        >
                          Create Account
                        </h1>
                        <h4 class="text-center mt-4">
                          Ensure your login for registration
                        </h4>
                        <v-form>
                          <v-text-field
                            label="Login"
                            name="Login"
                            type="text"
                            color="teal accent-3"
                          />

                          <v-text-field
                            id="password"
                            label="Password"
                            name="password"
                            type="password"
                            color="teal accent-3"
                          />
                        </v-form>
                      </v-card-text>
                      <div class="text-center mt-n5">
                        <v-btn
                          @click="signUp(login, password)"
                          rounded
                          color="teal accent-3"
                          dark
                          >SIGN UP</v-btn
                        >
                      </div>
                    </v-col>
                  </v-row>
                </v-window-item>
              </v-window>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import accountApi from "../api/accountApi.js";

export default {
  data: function () {
    return {
      response: [
        {
          login: "login",
          password: "password",
        },
      ],
      step: 1,
    };
  },
  props: {
    source: String,
  },

  methods: {
    signIn(login, password) {
      accountApi.signIn().then((resp) => {
        console.log("login: " + login + " password: " + password);
        console.log(resp);
      });
    },
  },

  signUp(login, password) {
    accountApi.signUp().then((resp) => {
      console.log("login: " + login + " password: " + password);
      console.log(resp);
    });
  },

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
  },
};
</script>
