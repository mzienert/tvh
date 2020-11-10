import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UserFormProps } from "./UserProps";
import EditIcon from '@material-ui/icons/Edit';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { showSnackbar } from "../../redux/actions";
import { getCurrentUserAttributes, updateCurrentUserAttributes } from "../../services/auth";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        media: {
            height: 300,
        },
        iconContainer: {
            textAlign: 'center',
            justifyContent: 'center',
            padding: theme.spacing(2),
        },
        accountCircleIcon: {
            fontSize: '6rem',
        }
    })
);

type UserForm = {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    state: string,
    zip: string,
}

export const UserCard = (props: UserFormProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const userImage = '';
    const { register, handleSubmit, errors } = useForm<UserForm>();
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    const handleChange = (event: any) => {
        setState({...state, [event.target.id]: event.target.value});
    }

    if (Object.keys(errors).length > 0) {
        const firstError =  Object.values(errors)[0];
        if (firstError) {
           dispatch(showSnackbar(firstError.message, 'error'));
        }
    }

    const editUser = () => {

        console.log('Mattt')
    }

    const onSubmit = async (userForm: UserForm) => {
        const formattedAddress = buildAddressString(userForm);
        const userAttributes = {
            name: userForm.firstName.trim(),
            family_name: userForm.lastName.trim(),
            email: userForm.email.trim(),
            phone_number: userForm.phone.trim(),
            address: formattedAddress,
        }
        updateCurrentUserAttributes(userAttributes).then(res => getCurrentUserAttributes().then(
            res => console.log('res: ', res)
        ))

    }

    const buildAddressString = (userForm: UserForm) => {
        const {firstName, lastName, email, phone, ...addressValues} = userForm;
        return  Object.values(addressValues).join(',');
    }
    return (
        <Card className={classes.root}>
            <form onSubmit={handleSubmit(onSubmit)}>
                {userImage
                    ? <CardMedia
                        className={classes.media}
                        image="https://picsum.photos/id/237/500/240"
                        title="Contemplative Reptile" />
                    : <CardMedia className={classes.iconContainer}>
                        <AccountCircleIcon  className={classes.accountCircleIcon}/>
                    </CardMedia>}
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5">
                            {props.selectedUser}
                        </Typography>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            spacing={2}>
                            <Grid
                                item
                                xs={6}>
                                <FormControl
                                    variant="filled"
                                    fullWidth>
                                    <InputLabel htmlFor="firstName">First Name</InputLabel>
                                    <FilledInput
                                        name="firstName"
                                        id="firstName"
                                        fullWidth
                                        inputRef={
                                            register({
                                                required: 'First name is required',
                                                maxLength: {
                                                    value: 50,
                                                    message: 'First name is too long'
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'First name is too short'
                                                }
                                            })
                                        }
                                        onChange={handleChange}
                                        error={ errors.firstName ? true : false }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={6}>
                                <FormControl
                                    variant="filled"
                                    fullWidth>
                                    <InputLabel htmlFor="lastName">Last Name</InputLabel>
                                    <FilledInput
                                        name="lastName"
                                        id="lastName"
                                        fullWidth
                                        inputRef={
                                            register({
                                                required: 'Last name is required',
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Last name is too long'
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'Last name is too short'
                                                }
                                            })
                                        }
                                        onChange={handleChange}
                                        error={ errors.lastName ? true : false }/>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={6}>
                                <FormControl
                                    variant="filled"
                                    fullWidth>
                                    <InputLabel htmlFor="email">Email</InputLabel>
                                    <FilledInput
                                        name="email"
                                        id="email"
                                        fullWidth
                                        inputRef={
                                            register({
                                                required: 'Email is required',
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Email is too long'
                                                },
                                                minLength: {
                                                    value: 6,
                                                    message: 'Email is too short'
                                                }
                                            })
                                        }
                                        onChange={handleChange}
                                        error={ errors.email ? true : false }/>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={6}>
                                <FormControl
                                    variant="filled"
                                    fullWidth>
                                    <InputLabel htmlFor="phone">Phone</InputLabel>
                                    <FilledInput
                                        name="phone"
                                        id="phone"
                                        fullWidth
                                        inputRef={
                                            register({
                                                required: 'Phone is required',
                                                maxLength: {
                                                    value: 20,
                                                    message: 'Phone is too long'
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'Phone is too short'
                                                }
                                            })
                                        }
                                        onChange={handleChange}
                                        error={ errors.phone ? true : false }/>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={12}>
                                <FormControl
                                    variant="filled"
                                    fullWidth>
                                    <InputLabel htmlFor="address">Address</InputLabel>
                                    <FilledInput
                                        name="address"
                                        id="address"
                                        fullWidth
                                        inputRef={
                                            register({
                                                required: 'Address is required',
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Address is too long'
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'Address is too short'
                                                }
                                            })
                                        }
                                        onChange={handleChange}
                                        error={ errors.address ? true : false }/>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={5}>
                                <FormControl
                                    variant="filled"
                                    fullWidth>
                                    <InputLabel htmlFor="city">City</InputLabel>
                                    <FilledInput
                                        name="city"
                                        id="city"
                                        fullWidth
                                        inputRef={
                                            register({
                                                required: 'City is required',
                                                maxLength: {
                                                    value: 50,
                                                    message: 'City is too long'
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'City is too short'
                                                }
                                            })
                                        }
                                        onChange={handleChange}
                                        error={ errors.city ? true : false }/>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={3}>
                                <FormControl
                                    variant="filled"
                                    fullWidth>
                                    <InputLabel htmlFor="state">State</InputLabel>
                                    <FilledInput
                                        name="state"
                                        id="state"
                                        fullWidth
                                        inputRef={
                                            register({
                                                required: 'State is required',
                                                maxLength: {
                                                    value: 50,
                                                    message: 'State is too long'
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'State is too short'
                                                }
                                            })
                                        }
                                        onChange={handleChange}
                                        error={ errors.state ? true : false }/>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={4}>
                                <FormControl
                                    variant="filled"
                                    fullWidth>
                                    <InputLabel htmlFor="zip">Zip</InputLabel>
                                    <FilledInput
                                        name="zip"
                                        id="zip"
                                        fullWidth
                                        inputRef={
                                            register({
                                                required: 'Zip code is required',
                                                maxLength: {
                                                    value: 50,
                                                    message: 'Zip code is too long'
                                                },
                                                minLength: {
                                                    value: 2,
                                                    message: 'Zip code is too short'
                                                }
                                            })
                                        }
                                        onChange={handleChange}
                                        error={ errors.zip ? true : false }/>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </CardContent>
                <CardActions>
                    <Button
                        size="small"
                        color="default"
                        variant="contained"
                        startIcon={<EditIcon />}
                        onClick={editUser}>
                        Edit
                    </Button>
                    <Button
                        size="small"
                        color="primary"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        type="submit"
                        >
                        Save
                    </Button>
                </CardActions>
            </form>
        </Card>
    )
}
