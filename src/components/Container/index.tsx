import React from 'react';
import {
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import {
    makeStyles,
    useTheme
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ContactsIcon from '@material-ui/icons/Contacts';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import CloseIcon from '@material-ui/icons/Close';
import { Documents } from '../Documents';
import './container.css';
import { userLogout } from "../../services/auth";
import { useDispatch } from "react-redux";
import { showSnackbar, userHasAuthenticated } from "../../redux/actions";
import { Directory } from '../Directory';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    closeMenuButton: {
        marginRight: 'auto',
        marginLeft: 0,
    },
}));

const Home = () => {
    return <h2>Home</h2>;
}

export const Container = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const logout = () => {
        userLogout().then(r => r);
        dispatch(userHasAuthenticated(false));
        history.push('/');
        dispatch(showSnackbar('You have signed out successfully.', 'info'))
    };

    const topNavButtons = [
        { text: 'Documents', icon: <MenuBookIcon />, path: '/documents' },
        { text: 'Directory', icon: <ContactsIcon />, path: '/directory' }
    ];

    const bottomNavButtons = [
        { text: 'Signout', icon: <ExitToAppIcon />, click: logout }
    ];

    const drawer = (
            <div>
                <List>
                    {topNavButtons.map((button, index) => (
                        <Link to={button.path} key={button.text}>
                            <ListItem button key={button.text}>
                                <ListItemIcon>{button.icon}</ListItemIcon>
                                <ListItemText primary={button.text} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>
                    {bottomNavButtons.map((button, index) => (
                        <ListItem button key={button.text} onClick={button.click}>
                            <ListItemIcon>{button.icon}</ListItemIcon>
                            <ListItemText primary={button.text} />
                        </ListItem>
                    ))}
                </List>
            </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Twilight View HOA
                    </Typography>
                </Toolbar>
            </AppBar>

            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        <IconButton onClick={handleDrawerToggle}
                                    className={classes.closeMenuButton}
                        >
                            <CloseIcon/>
                        </IconButton>
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        <div className={classes.toolbar} />
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                    <Route path="/documents">
                        <Documents />
                    </Route>
                    <Route path="/directory">
                        <Directory />
                    </Route>
                </Switch>
            </div>
        </div>
    )
};
