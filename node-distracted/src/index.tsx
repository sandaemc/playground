import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { ProvideAuth } from "./hooks/use-auth";

ReactDOM.render(
  <Router>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// TODO: Create a tags of what users can select. i.e. What's your current state? Lazy, Bored, Aimless, Waiting
// TODO: triggered by - challenged, bored, reward, aimlessness, waiting;
// TODO: Display logs in a table
// TODO: Write blocking / redirect plugin
