import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/home";
import { LandingPage } from "./pages/landing";
import { NewPage } from "./pages/new";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "typeface-roboto";

console.log(document.referrer);

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/new" component={NewPage} />
        <Route path="/landing" component={LandingPage} />
      </Switch>
    </>
  );
};

export default App;
