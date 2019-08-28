import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";
import { Task } from "../../model-contracts/task";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    }
  })
);


export type ProjectViewComponentProps = {
  project: Project;
  tasks: Task
};

export function ProjectViewComponent({ project }: ProjectViewComponentProps) {
  const classes = useStyles();

  return (
  );
}
