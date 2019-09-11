import React from "react";
import { Route, Switch } from "react-router-dom";
import ListProjects from "./pages/list-projects";
import ViewProject from "./pages/view-project";
import AddProject from "./pages/add-project";
import "typeface-roboto";

const App: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={ListProjects} />
        <Route path="/projects/view/:projectId" component={ViewProject} />
        <Route path="/projects/add" component={AddProject} />
      </Switch>
    </>
  );
};

export default App;
