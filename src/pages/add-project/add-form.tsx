import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import { Project } from "../../models/project";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
    </Grid>
  );
}
