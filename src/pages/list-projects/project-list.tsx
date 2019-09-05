import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { Project } from "../../model-contracts/project";

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
      {projects.map((v: Project, k) => (
        <ListItem key={k} button divider component={Link} to="/projects/123">
          <ListItemText
            primary={v.name}
            secondary={
              <span>
                <small>{v.minutesLeft} minutes left</small>
              </span>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
