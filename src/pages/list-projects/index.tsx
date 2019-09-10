import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {ProjectListComponent} from "./project-list";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {findProjects, Project} from "../../models/project";
import {ListProjectBarComponent} from "./list-project-bar";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
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
        <Container maxWidth="sm">
            <ListProjectBarComponent />

            <Fab aria-label="Add" className={classes.fab} color="primary">
                <AddIcon/>
            </Fab>
            {projects && <ProjectListComponent projects={projects}/>}
        </Container>
    );
}
