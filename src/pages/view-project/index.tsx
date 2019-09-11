import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import {ProjectViewComponent} from "./project-view";
import {TaskListComponent} from "./task-list";
import isEmpty from 'lodash/isEmpty';
import './index.css';
import { RouteComponentProps } from "react-router";
import {findProject, Project} from "../../models/project";
import {ViewProjectBarComponent} from "./view-project-bar";
import { LineChart, Line } from 'recharts';

const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, {name: 'Page B', uv: 200, pv: 1400, amt: 1400}];

const renderLineChart = (
    <LineChart width={200} height={200} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
    </LineChart>
);



type IRouteParams = {
    projectId: string;
};

export default ({ match, history }: RouteComponentProps<IRouteParams>) => {
    const [project, setProject] = useState<Project>({} as Project);

    useEffect(() => {
        setProject(findProject(match.params.projectId));
    }, []);

    return (
        <Container maxWidth="sm">
            <ViewProjectBarComponent
                title={project.name}
                onBackClick={() => history.push("/")}
                onEditClick={() => history.push(`/projects/edit/${project.id}`)} />

            {!isEmpty(project) ? <ProjectViewComponent project={project}/> : null}
        </Container>
    );
}
/*
<br />
{!isEmpty(project) && project.tasks ? <TaskListComponent tasks={project.tasks}/> : null}
 */
