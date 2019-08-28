import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
      color: "secondary"
    }
  })
);

export function ProgressIndicatorComponent() {
  const classes = useStyles();

  return (
    <CircularProgress
      className={classes.progress}
      variant="static"
      thickness={4}
      size={24}
      value={50}
    />
  );
}
