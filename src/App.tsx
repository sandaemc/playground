import React from "react";
import { Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/home";
import { ListPage } from "./pages/list";
import { NewPage } from "./pages/new";
import { LoginPage } from "./pages/login";
import { HeaderComponent } from "./components/header";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "typeface-roboto";
import { useAuth } from "./hooks/use-auth";

const App: React.FC = () => {
  return (
    <>
      <Route component={HeaderComponent} />
      <main role="main" className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/list" component={ListPage} />
          <Route path="/new" component={NewPage} />
        </Switch>
      </main>
    </>
  );
};

export default App;
