import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// TODO: Create a centered text field for entering distraction
// TODO: Ask for current energy level
// TODO: Ask for what were you doing before acccessing the website?
// TODO: Setup log model for persisting redirectedFrom (required), timeOfDay (required), energyLevel (optional), note (optional)
// TODO: Create energyLog table; can be use by other service like enlog
// TODO: triggered by - challenged, bored, reward, aimlessness, waiting; 
// TODO: Display logs in a table
// TODO: Auto-save
// TODO: Write blocking / redirect plugin
// TODO: Syncing (premium users only)
