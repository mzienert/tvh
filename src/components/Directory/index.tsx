import React, {useEffect, useState} from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { UserCard } from './UserCard';
import { UserList } from "./UserList";
import {UserFormProps, UserListProps} from "./UserProps";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

export const Directory = () => {
    const classes = useStyles();

    const [selectedUser, setSelectedUser] = useState('');

    const userListProps: UserListProps = {
        setSelectedUser
    }

    const userFormProps: UserFormProps = {
        selectedUser
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid
                    item
                    xs={12}
                    sm={5}>
                    <UserList {...userListProps} />
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={7}>
                    { selectedUser ? <UserCard {...userFormProps}/> : '' }
                </Grid>
            </Grid>
        </div>
    )
}
