import React from "react";
import { Route, Switch } from "react-router-dom";
import { ProjectsPage } from "./pages/projects";
import { ProjectPage } from "./pages/project";
import { AppBarComponent } from "./components/app-bar";

const App: React.FC = () => {
  return (
    <>
      <AppBarComponent />
      <Switch>
        <Route exact path="/" component={ProjectsPage} />
        <Route path="/projects/:id" component={ProjectPage} />
      </Switch>
    </>
  );
};

export default App;
