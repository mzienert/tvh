import React, {
    useState
} from 'react';
import './login.css';
import { createStyles,
         makeStyles,
         Theme
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import Button from "@material-ui/core/Button";
import { useForm } from "react-hook-form";
import { authChallenge } from "../../services/auth";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'left',
            color: theme.palette.text.secondary,
        },
    }),
);

type PasswordForm = {
    password: string
}

export const NewPassword = (props: any) => {
    const classes = useStyles();
    const [state, setState] = useState({
        password: '',
    });
    const { register, handleSubmit, errors } = useForm<PasswordForm>();

    if (Object.keys(errors).length > 0) {
        const firstError =  Object.values(errors)[0];
        if (firstError) {
            props.displayToast(firstError.message, 'error');
        }
    }

    const onSubmit = async (passwordData: PasswordForm) => {
        props.setLoading();

        try {
            const password = passwordData.password.trim();
            const response = await authChallenge(password, props.cognitoUser);

            if (response && response.username) {
                props.setLoading();
                props.updateAuth();
                props.displayToast('Password updated successfully', 'info');
            }
        } catch (error) {
            props.setLoading();
            props.displayToast(error.message, 'error');
        }
    }

    const handleChange = (event: any) => {
        setState({...state, [event.target.id]: event.target.value})
    }


    return (
        <div className={classes.root}>
            <Grid container
                  spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center"
                  style={{ minHeight: '100vh' }}>
                <Grid item
                      xs={11}
                      sm={4}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5">NEW PASSWORD</Typography>
                        <Divider />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl variant="filled"
                                         fullWidth
                                         margin={"normal"}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                {(errors.password) && console.log('thing')}
                                <FilledInput
                                    name="password"
                                    inputRef={
                                        register({
                                            required: 'A Password is required',
                                            maxLength: {
                                                value: 50,
                                                message: 'Password is to long'
                                            },
                                            minLength: {
                                                value: 2,
                                                message: 'Password is to short'
                                            }
                                        })
                                    }
                                    type="password"
                                    id="password"
                                    onChange={handleChange}
                                    error={ errors.password ? true : false }
                                    fullWidth />
                            </FormControl>
                            <Button
                                size="small"
                                variant="contained"
                                color="primary"
                                type="submit"
                                //disabled={isLoading}
                            >Submit</Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
