import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Edit from "@material-ui/icons/Edit";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

interface Props {
    onBackClick: any;
    onEditClick: any;
    title: string;
}

export function ViewProjectBarComponent(props: Props) {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <IconButton
            onClick={() => props.onBackClick()}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="back">
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
            {props.title}
        </Typography>
        <IconButton
            onClick={() => props.onEditClick()}
            edge="end"
            className={classes.menuButton}
            color="inherit"
            aria-label="edit">
          <Edit />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
