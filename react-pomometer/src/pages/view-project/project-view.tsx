import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { PomodoroComponent } from "./pomodoro";
import Button from "@material-ui/core/Button";
import LocalCafeIcon from "@material-ui/icons/LocalCafe";
import LaptopIcon from "@material-ui/icons/Laptop";
import { Project } from "../../models/project";
import Typography from "@material-ui/core/Typography";
import * as fx from "../../lib/fx";
import { incrementFlowPoint, incrementTimeSpent, Log } from "../../models/log";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    button: {
      margin: theme.spacing(1)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  })
);

export type ProjectViewComponentProps = {
  project: Project;
  log: Log;
};

enum PomodoroAction {
  focus = 25,
  break = 5
}

export function ProjectViewComponent({
  project,
  log
}: ProjectViewComponentProps) {
  const classes = useStyles();

  const [nextAction, setNextAction] = useState(PomodoroAction.focus);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [flowPoint, setFlowPoint] = useState(log.flowPoint);

  function start() {
    setIsTimerRunning(true);
  }

  function done() {
    setIsTimerRunning(false);

    fx.exclaimDone(nextAction === PomodoroAction.focus);

    if (nextAction === PomodoroAction.focus) {
      incrementFlowPoint(project.id);
      setFlowPoint(flowPoint + 1);
    }

    setNextAction(
      nextAction === PomodoroAction.focus
        ? PomodoroAction.break
        : PomodoroAction.focus
    );
  }

  function onMinuteCycle() {
    if (nextAction === PomodoroAction.focus) incrementTimeSpent(project.id);
  }

  function canFocus() {
    return nextAction === PomodoroAction.focus;
  }

  return (
    <Container maxWidth="sm" className={classes.root}>
      <br />

      <div style={{ textAlign: "center" }}>
        {isTimerRunning ? (
          <PomodoroComponent
            color="blue"
            onDone={() => done()}
            onMinuteCycle={onMinuteCycle}
            initial={canFocus() ? PomodoroAction.focus : PomodoroAction.break}
          />
        ) : (
          <Button
            className={classes.button}
            size="large"
            onClick={() => start()}
            variant="contained"
            color="primary"
          >
            {canFocus() ? (
              <LaptopIcon className={classes.extendedIcon} />
            ) : (
              <LocalCafeIcon className={classes.extendedIcon} />
            )}
            {canFocus() ? "Focus" : "Break"}
          </Button>
        )}

        <Typography variant="overline" display="block" gutterBottom>
          Goal: {flowPoint} / 0
        </Typography>
      </div>
    </Container>
  );
}
