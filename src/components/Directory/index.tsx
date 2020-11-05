import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import { UserCard } from './UserCard';
import { UserList } from "./UserList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
    }),
);

export const Directory = () => {
    const classes = useStyles();

    const [state, setState] = useState<any>({});

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <UserList />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <UserCard />
                </Grid>
            </Grid>
        </div>
    )
}
