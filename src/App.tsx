import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "@material-ui/core/Container";
import { TodayPageComponent } from "./pages/today";
import { AppBarComponent } from "./components/app-bar";

const App: React.FC = () => {
  return (
    <>
      <AppBarComponent />
      <Switch>
        <Route exact path="/" component={TodayPageComponent} />
      </Switch>
    </>
  );
};

export default App;
