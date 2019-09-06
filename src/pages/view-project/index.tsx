import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import {ProjectViewComponent} from "./project-view";
import {TaskListComponent} from "./task-list";
import isEmpty from 'lodash/isEmpty';
import './index.css';
import { RouteComponentProps } from "react-router";
import {findProject, Project} from "../../models/project";

type IRouteParams = {
    projectId: string;
};

export default ({ match }: RouteComponentProps<IRouteParams>) => {
    const [project, setProject] = useState<Project>({} as Project);

    useEffect(() => {
        setProject(findProject(Number.parseInt(match.params.projectId)));
    }, []);

    return (
        <Container maxWidth="sm">
            <div className="progressbar" />
            {!isEmpty(project) ? <ProjectViewComponent project={project}/> : null}
            <br />
            {!isEmpty(project) && project.tasks ? <TaskListComponent tasks={project.tasks}/> : null}
        </Container>
    );
}
