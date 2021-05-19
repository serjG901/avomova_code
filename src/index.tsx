import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({
  uri: "https://api-beta.anibel.net/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Media: {
        merge(existing = {}, incoming: {}) {
          return { existing, ...incoming };
        },
      },
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
