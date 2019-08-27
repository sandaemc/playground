import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    },
    progress: {
      margin: theme.spacing(2)
    }
  })
);

export type ProjectListComponentProps = {
  projects?: [];
};

export default ({ projects }: ProjectListComponentProps) => {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      <ListItem button>
        <ListItemIcon>
          <CircularProgress
            className={classes.progress}
            variant="static"
            value={50}
          />
        </ListItemIcon>
        <ListItemText primary="Work - Pomometer" secondary="25 minutes left" />
      </ListItem>
      <Divider />
      <ListItem button>
        <ListItemText primary="Work - IE" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  );
};
