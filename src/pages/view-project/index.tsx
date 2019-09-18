import React, { useEffect, useState } from "react";
import { ProjectViewComponent } from "./project-view";
import isEmpty from "lodash/isEmpty";
import "./index.css";
import { RouteComponentProps } from "react-router";
import { findProject, Project } from "../../models/project";
import { ViewProjectBarComponent } from "./view-project-bar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Log, findLog } from "../../models/log";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

type IRouteParams = {
  projectId: string;
};

export default ({ match, history }: RouteComponentProps<IRouteParams>) => {
  const classes = useStyles();

  const [project, setProject] = useState<Project>({} as Project);

  useEffect(() => {
    setProject(findProject(match.params.projectId));
  }, []);

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <ViewProjectBarComponent
            title={project.name}
            onBackClick={() => history.push("/")}
            onEditClick={() => history.push(`/projects/edit/${project.id}`)}
          />

          {!isEmpty(project) ? (
            <ProjectViewComponent project={project} />
          ) : null}
        </Grid>
      </Grid>
    </div>
  );
};
/*
<br />
{!isEmpty(project) && project.tasks ? <TaskListComponent tasks={project.tasks}/> : null}
 */
