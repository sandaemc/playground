import React, { useState } from "react";
import { AddFormComponent } from "./add-form";
import { AddProjectBarComponent } from "./add-project-bar";
import { RouteComponentProps } from "react-router";
import { addProject, Project } from "../../models/project";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import v4 from "uuid/v4";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  })
);

export default ({ history }: RouteComponentProps) => {
  const classes = useStyles();

  const [project, setProject] = useState<Project>({
    id: v4(),
    name: "",
    color: "BLUE",
    tasks: [],
    schedules: [
      { day: "MO", goal: 0 },
      { day: "TU", goal: 0 },
      { day: "WE", goal: 0 },
      { day: "TH", goal: 0 },
      { day: "FR", goal: 0 }
    ]
  });

  const onChange = (data: any) => setProject(data);

  const onDone = () => {
    addProject(project);
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <AddProjectBarComponent
            onBackClick={() => history.push("/")}
            onDoneClick={onDone}
          />
          <Container maxWidth="xl">
            <AddFormComponent initial={project} onChange={onChange} />
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};
