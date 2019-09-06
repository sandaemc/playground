import React from "react";
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from "react-router-dom";
import {ListItemIcon} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {Task} from "../../models/project";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            backgroundColor: theme.palette.background.paper
        }
    })
);

export type TaskListComponentProps = {
    tasks: Task[];
};

export function TaskListComponent({tasks}: TaskListComponentProps) {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Tasks
            </Typography>
        <List component="nav" className={classes.root} aria-label="mailbox folders">
            {tasks.map((v: Task, k) => (
                <ListItem key={k} button divider component={Link} to="/projects/123">
                    <ListItemIcon>
                        <Checkbox edge="start" checked={false} />
                    </ListItemIcon>
                    <ListItemText primary={v.name}/>
                </ListItem>
            ))}
        </List>
        </div>
    );
}
