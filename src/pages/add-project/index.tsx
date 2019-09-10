import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import {AddFormComponent} from "./add-form";
import {AddProjectBarComponent} from "./add-project-bar";


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export default () => {
    const classes = useStyles();

    const onSubmit = (data: any) => console.log(data);

    return (
        <Container maxWidth="sm">
            <AddProjectBarComponent/>
            <AddFormComponent onSubmit={(data: any) => console.log(data)}/>
        </Container>
    );
}
