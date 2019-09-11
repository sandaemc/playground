import React, {useState} from "react";
import {AddFormComponent} from "./add-form";
import {AddProjectBarComponent} from "./add-project-bar";
import {RouteComponentProps} from "react-router";
import {addProject} from "../../models/project";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core";

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

export default ({history}: RouteComponentProps) => {
    const classes = useStyles();

    const [project, setProject] = useState<{ name: string }>({
        name: ''
    });

    const onChange = (data: any) => setProject(data);

    const onDone = () => {
        addProject(project);
        history.push('/');
    };

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={12}>
                    <AddProjectBarComponent
                        onBackClick={() => history.push("/")}
                        onDoneClick={onDone}/>
                    <AddFormComponent initial={project} onChange={onChange}/>
                </Grid>
            </Grid>
        </div>
    );
}
