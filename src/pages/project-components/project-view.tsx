import React, {useState} from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Project } from "../../model-contracts/project";
import Container from "@material-ui/core/Container";
import {PomodoroComponent} from "../../components/pomodoro";
import subMinutes from 'date-fns/subMinutes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    }
  })
);

export type ProjectViewComponentProps = {
  project: Project;
};

export function ProjectViewComponent({ project }: ProjectViewComponentProps) {
    const [isFocusing, setIsFocusing] = useState(false);

  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.root}>
      <h1>{project.name}</h1>
        {isFocusing
            ? <PomodoroComponent initial={5} onDone={() => alert("Allo")} onUpdate={() => console.log("Sample")}/>
            : <button onClick={() => setIsFocusing(true)}>Focus</button>}

    </Container>
  );
}

/*
<Fab style={{ textAlign: 'center'}}>
    <PlayArrow/>
</Fab>

 */
