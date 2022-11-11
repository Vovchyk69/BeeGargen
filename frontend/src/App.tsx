import React from "react";
import axios, { AxiosError } from "axios";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { Footer, Player } from "./components";
import Routes from "./configs/routes";
import store, { history } from "./redux/store";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
  r => r.data.data,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      history.push("/login");
    }
    throw error;
  }
);

export default () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />

        <Player />

        <Footer />
      </Router>
    </Provider>
  );
};
