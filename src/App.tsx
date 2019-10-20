import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/home";
import { ListPage } from "./pages/list";
import { NewPage } from "./pages/new";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "typeface-roboto";
import { HeaderComponent } from "./components/header";
import { FooterComponent } from "./components/footer";

const App: React.FC = () => {
  return (
    <>
      <HeaderComponent />
      <main role="main" className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/list" component={ListPage} />
          <Route path="/new" component={NewPage} />
        </Switch>
      </main>
    </>
  );
};

export default App;
