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
import { WeeklyReportComponent } from "./weekly-report";
import { Paper } from "@material-ui/core";

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
  const [log, setLog] = useState({} as Log);

  useEffect(() => {
    setProject(findProject(match.params.projectId));
    setLog(findLog(match.params.projectId));
  }, [match.params.projectId]);

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
            <ProjectViewComponent project={project} log={log} />
          ) : null}

          <WeeklyReportComponent />
        </Grid>
      </Grid>
    </div>
  );
};
