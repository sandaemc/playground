import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import {ProjectViewComponent} from "./project-components/project-view";
import {TaskListComponent} from "./project-components/task-list";
import isEmpty from 'lodash/isEmpty';
import { Project } from "../model-contracts/project";
import './project.css';

const projectSource: Project = {
    name: "Work - Pomometer",
    minutesLeft: 25,
    tasks: [
        {name: 'Simple 1', done: false},
        {name: 'Simple 2', done: false}
    ]
};

export function ProjectPage() {
    const [project, setProject] = useState<Project>({} as Project);

    useEffect(() => {
        setProject(projectSource);
    });

    return (
        <Container maxWidth="sm">
            <div className="progressbar" />
            {!isEmpty(project) ? <ProjectViewComponent project={project}/> : null}
            {!isEmpty(project) && project.tasks ? <TaskListComponent tasks={project.tasks}/> : null}
        </Container>
    );
}
