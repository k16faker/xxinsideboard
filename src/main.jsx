import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { Wrapper } from "@googlemaps/react-wrapper";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Wrapper apiKey='AIzaSyD2BCZJWbMnNLb73wUivkqv8eoY4cNUqaE' libraries={["places"]} >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Wrapper>
  </Provider>
);
