import React, {useEffect, useState} from "react";
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

interface Props {
    onSubmit: any;
}

interface State {
    name: string;
}

export function AddFormComponent(props: Props)  {
    const classes = useStyles();

    const [values, setValues] = useState<State>({
        name: ''
    });

    const handleChange = (name: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [name]: event.target.value });
    };

    return (
        <form className={classes.container} noValidate autoComplete="off">
            <FormControl fullWidth>
                <TextField fullWidth label="Name"
                           className={classes.textField}
                           value={values.name}
                           margin="normal"
                           onChange={handleChange('name')}/>
            </FormControl>
        </form>
    );
}
