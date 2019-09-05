import React, {useState} from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Project } from "../../model-contracts/project";
import Container from "@material-ui/core/Container";
import {PomodoroComponent} from "../../components/pomodoro";

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
    const [focusCount, setFocusCount] = useState(0);
    const [isBreaking, setIsBreaking] = useState(false);

  const classes = useStyles();

  function startBreak() {
      if (!isFocusing && !isBreaking && focusCount > 0)
          setIsBreaking(true);
  }

  function startFocus() {
      if (!isFocusing && !isBreaking)
          setIsFocusing(true);
  }

  function stopFocus() {
     if (isFocusing)
         setIsFocusing(false);
  }

  function doneFocusing() {
      setIsFocusing(false);
      setFocusCount(focusCount + 1);
  }

  function stopBreak() {
      if (isBreaking)
          setIsBreaking(false);
  }

  function doneBreaking() {
      setIsBreaking(false);
  }

  return (
    <Container maxWidth="xs" className={classes.root}>
      <h1>{project.name}</h1>
        {isFocusing
            ? <PomodoroComponent initial={1}
                                 onDone={() => { doneFocusing()}}
                                 onUpdate={({ timeSpent }: any) => console.log("Spent: " + timeSpent)}/>
            : <button onClick={() => startFocus()}>Focus</button>}

        {isBreaking && !isFocusing && focusCount > 0
            ? <PomodoroComponent onDone={() => doneBreaking()} onUpdate={() => console.log("hello")} initial={5}/>
            : <button onClick={() => startBreak()}>Break</button>}



    </Container>
  );
}

/*
<Fab style={{ textAlign: 'center'}}>
    <PlayArrow/>
</Fab>

 */
