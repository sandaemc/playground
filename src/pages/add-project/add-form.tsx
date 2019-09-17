import React, { ChangeEvent, useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Project } from "../../models/project";
import Slider from "@material-ui/core/Slider";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  sliderGrid: {
    marginTop: theme.spacing(2),
    height: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  scheduleContainer: {}
}));

type Props = {
  onChange: any;
  initial: Project;
};

const labels = {
  MO: "Monday",
  TU: "Tuesday",
  WE: "Wednesday",
  TH: "Thursday",
  FR: "Friday"
};

export function AddFormComponent(props: Props) {
  const classes = useStyles();

  function handleChange(
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) {
    props.onChange({
      ...props.initial,
      [event.target.name as string]: event.target.value
    });
  }

  const handleSliderChange = (name: string) => (
    event: any,
    value: number | number[]
  ) => {
    const schedules = props.initial.schedules;
    const index = schedules.findIndex(c => c.day === name);
    const schedule = schedules[index];

    if (schedule.goal === (value as number)) return;

    schedules.splice(index, 1, { ...schedule, goal: value as number });

    props.onChange({
      ...props.initial,
      schedules
    });
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <TextField
            inputProps={{
              name: "name"
            }}
            label="Name"
            value={props.initial.name}
            margin="normal"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="color">Color</InputLabel>
          <Select
            value={props.initial.color}
            className={classes.selectEmpty}
            onChange={handleChange}
            inputProps={{
              name: "color",
              id: "color"
            }}
          >
            <MenuItem value="BLUE">Blue</MenuItem>
            <MenuItem value="ORANGE">Orange</MenuItem>
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} className={classes.sliderGrid}>
        <Typography variant="overline" gutterBottom>
          Pomodoro goals per day
        </Typography>
        {props.initial.schedules.map((sched, i) => (
          <div key={i}>
            <Typography variant="overline" gutterBottom>
              {labels[sched.day]}
            </Typography>
            <Slider
              defaultValue={0}
              step={1}
              marks
              min={0}
              max={10}
              onChangeCommitted={handleSliderChange(sched.day)}
              valueLabelDisplay="auto"
            />
          </div>
        ))}
      </Grid>
    </Grid>
  );
}
