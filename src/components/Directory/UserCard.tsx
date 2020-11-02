import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    media: {
        height: 300,
    },
    icon: {
        fontSize: '6rem',
        textAlign: 'center',
    }
});

export const UserCard = () => {
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
                    : <CardMedia>
                        <AccountCircleIcon className={classes.icon} />
                      </CardMedia>}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    )
}