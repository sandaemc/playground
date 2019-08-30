import React, {useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import {ProjectListComponent} from "./projects-components/project-list";
import {Project} from "../model-contracts/project";

const projectsSource: Project[] =  [
    { name: "Work - Pomometer", minutesLeft: 25, tasks: [] },
    { name: "Work - IE", minutesLeft: 25, tasks: [] },
    { name: "Work - Example", minutesLeft: 100, tasks: [] }
];

export function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        setProjects(projectsSource);
    }, [projects]);

    return (
        <Container maxWidth="sm">
            {projects && <ProjectListComponent projects={projects}/>}
        </Container>
    );
}
