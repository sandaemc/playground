import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Done from "@material-ui/icons/Done";

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
    onDoneClick: any;
}

export function AddProjectBarComponent(props: Props) {
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
                    Add Project
                </Typography>
                <IconButton
                    onClick={() => props.onDoneClick()}
                    edge="end"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="done">
                    <Done />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}
