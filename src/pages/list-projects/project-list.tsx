import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { Project } from '../../models/project';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    }
  })
);

export type ProjectListComponentProps = {
  projects: Project[];
};

export function ProjectListComponent({ projects }: ProjectListComponentProps) {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {projects.map((v: Project) => (
        <ListItem key={v.id} button divider component={Link} to={`/projects/view/${v.id}`}>
          <ListItemText
            primary={v.name}
            secondary={
              <span>
              </span>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
