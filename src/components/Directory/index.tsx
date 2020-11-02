import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import { UserCard } from './UserCard';

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
        button: {
            margin: theme.spacing(1),
            display: 'flex',
            justifyContent: 'right',
        },
    }),
);

export const Directory = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [state, setState] = useState<any>({});

    function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
        return <ListItem button component="a" {...props} />;
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper className={classes.paper}>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Inbox" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Drafts" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem button>
                                <ListItemText primary="Trash" />
                            </ListItem>
                            <ListItemLink href="#simple-list">
                                <ListItemText primary="Spam" />
                            </ListItemLink>
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <UserCard />
                </Grid>
            </Grid>
        </div>
    )
}