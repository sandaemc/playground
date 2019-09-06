import React from "react";
import { Route, Switch } from "react-router-dom";
import ListProjects from "./pages/list-projects";
import ViewProject from "./pages/view-project";
import { AppBarComponent } from "./components/app-bar";
import 'typeface-roboto';

const App: React.FC = () => {
  return (
    <>
      <AppBarComponent />
      <Switch>
        <Route exact path="/" component={ListProjects} />
        <Route path="/projects/:projectId" component={ViewProject} />
      </Switch>
    </>
  );
};

export default App;
