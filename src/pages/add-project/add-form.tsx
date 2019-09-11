import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

interface Props {
  onChange: any;
  initial: {
    name: string;
  };
}

export function AddFormComponent(props: Props) {
  const classes = useStyles();

  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onChange({ ...props.initial, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <FormControl fullWidth>
        <TextField
          label="Name"
          className={classes.textField}
          value={props.initial.name}
          margin="normal"
          onChange={handleChange("name")}
        />
      </FormControl>
    </form>
  );
}
