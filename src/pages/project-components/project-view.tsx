import React from "react";
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import {Project} from "../../model-contracts/project";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Container from "@material-ui/core/Container";
import Fab from '@material-ui/core/Fab';
import {Grid, Paper} from "@material-ui/core";
import {ProgressIndicatorComponent} from "../../components/progress-indicator";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            backgroundColor: theme.palette.background.paper,
        }
    })
);

export type ProjectViewComponentProps = {
    project: Project;
};

export function ProjectViewComponent({project}: ProjectViewComponentProps) {
    const classes = useStyles();

    return <Container maxWidth="xs" className={classes.root}>
            <h1>{project.name}</h1>

                <div className="c100 p65 blue">
                    <span onClick={() => alert("Hello")}>stop</span>
                    <div className="slice">
                        <div className="bar"></div>
                        <div className="fill"></div>
                    </div>
                </div>

        </Container>;

}

/*
<Fab style={{ textAlign: 'center'}}>
    <PlayArrow/>
</Fab>

 */
