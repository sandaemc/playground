import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage, AboutPage } from "./pages";
import "typeface-roboto";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
      </Switch>
    </>
  );
};

export default App;
