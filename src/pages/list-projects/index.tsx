import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import {ProjectListComponent} from "./project-list";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {findProjects, Project} from "../../models/project";
import {ListProjectBarComponent} from "./list-project-bar";
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        root: {
            flexGrow: 1,
        },
    }),
);

export default () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const classes = useStyles();

    useEffect(() => {
        setProjects(findProjects());
    }, []);

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <ListProjectBarComponent/>
                    <Fab component={Link} to="/projects/add" aria-label="Add" className={classes.fab} color="primary">
                        <AddIcon/>
                    </Fab>
                    {projects && <ProjectListComponent projects={projects}/>}
                </Grid>
            </Grid>
        </div>
    );
}
