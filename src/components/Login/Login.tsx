import React, { useState } from 'react';
import './login.css';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useForm } from "react-hook-form";
import { userLogin } from "../../services/auth";

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

type LoginForm = {
    email: string,
    password: string
}

export const LoginCard = (props: any) => {
    const classes = useStyles();
    const [state, setState] = useState({
        email: '',
        password: '',
        cognitoUser: props.cognitoUser,
    });
    const { register, handleSubmit, errors } = useForm<LoginForm>();

    if (Object.keys(errors).length > 0) {
        const firstError =  Object.values(errors)[0];
        if (firstError) {
            props.displayToast(firstError.message, 'error');
        }
    }

    const onSubmit = async (loginData: LoginForm) => {
        props.setLoading();

        try {
            const email = loginData.email.toLowerCase().trim();
            const password = loginData.password.trim();
            const response = await userLogin(email, password);

            if (response && response.challengeName) {
                props.setLoading();
                props.onCognitoUser(response);
                props.displayToast('A new password is required', 'info');
            }

            if(response && response.signInUserSession !== null) {
                props.setLoading();
                props.updateAuth();
            }

        } catch (error) {
            props.setLoading();
            props.displayToast(error.message, 'error');
        }
    };

    const handleChange = (event: any) => {
        setState({...state, [event.target.id]: event.target.value});
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
                        <Typography variant="h5">LOGIN</Typography>
                        <Divider />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl variant="filled"
                                         fullWidth
                                         margin={"normal"}>
                                <InputLabel htmlFor="email">Email address</InputLabel>
                                <FilledInput
                                    name="email"
                                    inputRef={
                                        register({
                                            required: 'An Email is required',
                                            maxLength: {
                                                value: 50,
                                                message: 'Email is to long'
                                            },
                                            minLength: {
                                                value: 6,
                                                message: 'Email is to short'
                                            }
                                        })
                                    }
                                    onChange={handleChange}
                                    id="email"
                                    error={ errors.email ? true : false }
                                    fullWidth />
                            </FormControl>
                            <FormControl variant="filled"
                                         fullWidth
                                         margin={"normal"}>
                                <InputLabel htmlFor="password">Password</InputLabel>
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
