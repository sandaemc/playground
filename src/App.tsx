import React from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import { TodayPage } from "./pages";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Switch>
        <Route exact path="/" component={TodayPage} />
      </Switch>
    </div>
  );
};

export default App;
