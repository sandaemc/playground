import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {ProjectListComponent} from "./project-list";
import {Project} from "../../model-contracts/project";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

const projectsSource: Project[] = [
    {name: "Work - Pomometer", minutesLeft: 25, tasks: []},
    {name: "Work - IE", minutesLeft: 25, tasks: []},
    {name: "Work - Example", minutesLeft: 100, tasks: []}
];

export default () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const classes = useStyles();

    useEffect(() => {
        setProjects(projectsSource);
    }, [projects]);

    return (
        <Container maxWidth="sm">
            <Fab aria-label="Add" className={classes.fab} color="primary">
                <AddIcon/>
            </Fab>
            {projects && <ProjectListComponent projects={projects}/>}
        </Container>
    );
}
