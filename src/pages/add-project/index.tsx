import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import {AddFormComponent} from "./add-form";
import {AddProjectBarComponent} from "./add-project-bar";
import { RouteComponentProps } from "react-router";
import {addProject} from "../../models/project";

export default ({ history }: RouteComponentProps) => {
    const [project, setProject] = useState<{ name: string }>({
        name: ''
    });

    const onChange = (data: any) => setProject(data);

    const onDone = () => {
        addProject(project);
        history.push('/');
    };

    return (
        <Container maxWidth="sm">
            <AddProjectBarComponent
                onBackClick={() => history.push("/")}
                onDoneClick={onDone} />
            <AddFormComponent initial={project} onChange={onChange}/>
        </Container>
    );
}
