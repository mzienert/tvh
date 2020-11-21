import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UserFormProps } from "./UserProps";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import { Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {setLoading, showSnackbar} from "../../redux/actions";
import {getCurrentUserAttributes, getUserList, updateCurrentUserAttributes} from "../../services/auth";
import { buildAddressString, getUserAttributeValue } from "../../helpers";

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

export type UserForm = {
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
    console.log('setLoading: ', setLoading);
    const classes = useStyles();
    const dispatch = useDispatch();
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
    const [editUser, setEditUser] = useState(false);
    const { register, handleSubmit, errors, setValue } = useForm<UserForm>({defaultValues: state});

    const handleChange = (event: any) => {
        setState({...state, [event.target.id]: event.target.value});
    }

    if (Object.keys(errors).length > 0) {
        const firstError =  Object.values(errors)[0];
        if (firstError) {
           dispatch(showSnackbar(firstError.message, 'error'));
        }
    }

    const hydrateUserForm = (user: any) => {
        const currentUserId = user.find((attr: any) => attr.Name === 'sub');
        const selectedUserEqCurrentUser = currentUserId.Value === props.selectedUser ? true : false;
        const email = getUserAttributeValue('email', user);
        setValue('email', email.Value);
        if(user.length > 3) {
            const name = getUserAttributeValue('name', user);
            const familyName = getUserAttributeValue('family_name', user);
            const phone = getUserAttributeValue('phone_number', user);
            const address = getUserAttributeValue('address', user);
            const addressArray = address.Value.split(',')
            if (selectedUserEqCurrentUser) {
                setValue('firstName', name.Value);
                setValue('lastName', familyName.Value);
                setValue('phone', phone.Value);
                setValue('address', addressArray[0]);
                setValue('city', addressArray[1]);
                setValue('state', addressArray[2]);
                setValue('zip', addressArray[3]);
            }
        }
    }

    const hydrateUserCard = (selectedUser: any) => {
        // TODO: DONT CALL THIS EVERY TIME A USER IS SELECTED
        getUserList().then(list => {
            const userList = list.Users;
            const userObj = userList.find((user: any) => user.Username === selectedUser);
            const userAttributes = userObj.Attributes;
            if(userAttributes.length > 3) {
                const firstName = getUserAttributeValue('name', userAttributes).Value;
                const lastName = getUserAttributeValue('family_name', userAttributes).Value;
                const email = getUserAttributeValue('email', userAttributes).Value;
                const phone = getUserAttributeValue('phone_number', userAttributes).Value;
                const address = getUserAttributeValue('address', userAttributes);
                const addressArray = address.Value.split(',');
                setState({
                    firstName,
                    lastName,
                    email,
                    phone,
                    address: addressArray[0],
                    city: addressArray[1],
                    state: addressArray[2],
                    zip: addressArray[3],
                })
            } else {
                const email = getUserAttributeValue('email', userAttributes).Value;
                setState({
                    firstName: '',
                    lastName: '',
                    email,
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: '',
                })
            }
        })
    }

    useEffect(() => {
        const currentUserAttributes = async () => await getCurrentUserAttributes();
        currentUserAttributes().then(user => {
            const userId = getUserAttributeValue('sub', user);
            if (userId.Value === props.selectedUser) {
                setEditUser(true)
                hydrateUserForm(user)
            } else {
                setEditUser(false)
                hydrateUserCard(props.selectedUser)
            }
        });
    }, [props.selectedUser])

    const { isLoading } = useSelector(
        (state: any) => state.ui
    );

    const onSubmit = async (userForm: UserForm) => {
        const formattedAddress = buildAddressString(userForm);
        const userAttributes = {
            name: userForm.firstName.trim(),
            family_name: userForm.lastName.trim(),
            email: userForm.email.trim(),
            phone_number: `+1${userForm.phone.trim().replace(/\D/g,'')}`,
            address: formattedAddress,
        }
        dispatch(setLoading())
        updateCurrentUserAttributes(userAttributes).then(res => {
            if (res.code) {
                dispatch(showSnackbar(res.message, 'error'));
            }
            dispatch(setLoading())
            dispatch(showSnackbar('Contact information updated.', 'info'));
        })
    }

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.iconContainer}>
                <AccountCircleIcon  className={classes.accountCircleIcon}/>
            </CardMedia>
            {editUser
            ? <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5">
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
                                    <InputLabel htmlFor="firstName" shrink>First Name</InputLabel>
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
                                    <InputLabel htmlFor="lastName" shrink>Last Name</InputLabel>
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
                                        defaultValue={''}
                                        error={ errors.lastName ? true : false }/>
                                </FormControl>
                            </Grid>
                            <Grid
                                item
                                xs={6}>
                                <FormControl
                                    variant="filled"
                                    fullWidth>
                                    <InputLabel htmlFor="email" shrink>Email</InputLabel>
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
                                    <InputLabel htmlFor="phone" shrink>Phone</InputLabel>
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
                                    <InputLabel htmlFor="address" shrink>Address</InputLabel>
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
                                    <InputLabel htmlFor="city" shrink>City</InputLabel>
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
                                    <InputLabel htmlFor="state" shrink>State</InputLabel>
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
                                    <InputLabel htmlFor="zip" shrink>Zip</InputLabel>
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
                        color="primary"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        type="submit"
                        disabled={isLoading}
                        >
                        Save
                    </Button>
                </CardActions>
            </form>
            : <CardContent>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        spacing={2}>
                        <Grid
                            item
                            xs={12}>
                            Name:<br />
                            <Typography variant="h6" gutterBottom>
                            {`${state.firstName} ${state.lastName}`}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            Email:<br />
                            <Typography variant="h6" gutterBottom>
                            {state.email}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={6}>
                            Phone:<br />
                            <Typography variant="h6" gutterBottom>
                            {state.phone}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}>
                            Address:<br />
                            <Typography variant="h6" gutterBottom>
                            {`${state.address} ${state.city} ${state.state} ${state.zip}`}
                            </Typography>
                        </Grid>
                    </Grid>
              </CardContent> }
        </Card>
    )
}
