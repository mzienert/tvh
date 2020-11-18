import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import { getUserList } from "../../services/auth";
import { Grid } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserListProps } from "./UserProps";
import { userFullName } from "../../helpers";

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
        loading: {
            display: 'flex',
            padding: theme.spacing(2),
            justifyContent: 'center',
        }
    }),
);

export const UserList = (props: UserListProps) => {
    const classes = useStyles();
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserList().then(res => usersLoaded(res.Users));
    }, [])

    const usersLoaded = (userData: any) => {
        setLoading(false)
        setUserList(userData)
    };

    const userListItems = () => (userList.map((user: any) => (
        <ListItem
            key={user.Username}
            button
            onClick={() => props.setSelectedUser(user.Username)}>
            <ListItemIcon>
                <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary={userFullName(user.Attributes)} />
        </ListItem>
    )));

    const loadingContainer = () => (
        <div className={classes.loading}>
            <CircularProgress />
        </div>
    );

    return (
        <Paper className={classes.paper}>
            <Grid
                container
                direction="row"
                alignItems="center">
                <Grid item>
                    <Typography variant="h5">Members</Typography>
                </Grid>
            </Grid>
            <List
                component="nav"
                aria-label="main mailbox folders">
                <Divider></Divider>
                { loading ? loadingContainer() : userListItems()}
            </List>
        </Paper>
    )
}
