import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { UserFormProps } from "./UserProps";
import EditIcon from '@material-ui/icons/Edit';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import {register} from "../../serviceWorker";
import {Grid} from "@material-ui/core";

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

export const UserCard = (props: UserFormProps) => {
    const classes = useStyles();
    const userImage = '';

    return (
        <Card className={classes.root}>
            <CardActionArea>
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
                    <form>
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
                                        fullWidth />
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
                                        fullWidth />
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
                                        fullWidth />
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
                                        fullWidth />
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
                                        fullWidth />
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
                                        fullWidth />
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
                                        fullWidth />
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
                                        fullWidth />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="default"
                    variant="contained"
                    startIcon={<EditIcon />}>
                     Edit
                </Button>
                <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    disabled>
                    Save
                </Button>
            </CardActions>
        </Card>
    )
}
