import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { listFiles } from "../../services/storage";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DescriptionIcon from '@material-ui/icons/Description';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { AlertDialog } from '../AlertDialog';
import { useDispatch } from "react-redux";
import { alertDialog } from "../../redux/actions";
import { formDialog } from "../../redux/actions";
import { FormDialog } from "../FormDialog";
import { AlertDialogProps } from "../AlertDialog/AlertDialogProps.d";
import { FormDialogProps } from "../FormDialog/FormDialogProps.d";
import Skeleton from '@material-ui/lab/Skeleton';

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

export const Minutes = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [state, setState] = useState<any>({
        files: [],
        deleteFile: null,
    });

    const fileList = async () => await listFiles('minutes');
    const handleClickOpen = (file: string) => {
        setState({...state, deleteFile: file});
        dispatch(alertDialog());
    };

    const alertDialogProps: AlertDialogProps = {
        message: 'This will peremanently delete this file.  Are you sure you want to do this?',
        title: 'Delete Minutes Files',
        file: state.deleteFile,
    }
    const formDialogProps: FormDialogProps = {
        message: 'Add a record of minutes by uploading a file.  Date will be set upon upload.',
        title: 'Upload Minutes File',
    }

    const uploadFile = () => {
        dispatch(formDialog());
    }

    const displaySkeleton = () => (
        <div>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    );

    const displayList = () => {
        if (!state.files.length) {
            return (
                <p>There are no files.</p>
            )
        }

        return (
            <List component="nav" aria-label="secondary mailbox folders">
                {state.files.slice(1).map((file: any) => {
                    const fileSize = file.size / 1024 / 1024;
                    const fileName = file.key.split('/');
                    const fileNameNoExtension = fileName[1].split('.');
                    const date = file.lastModified.toLocaleDateString()
                    return (
                        <ListItem button>
                            <ListItemIcon>
                                <DescriptionIcon/>
                            </ListItemIcon>
                            <ListItemText primary={fileNameNoExtension[0]}
                                          secondary={`Date: ${date} | File Size: ${fileSize.toFixed(2)} MB`}/>
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon onClick={() => handleClickOpen(file.key)}/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        )
    };

    useEffect(() => {
        fileList().then(res => setState({...state, files: res}))
    }, []);

    return (
        <Paper className={classes.paper}>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={uploadFile}
            >
                Upload
            </Button>
            <Divider />
            {state.files.length ? displayList() : displaySkeleton()}
            <AlertDialog {...alertDialogProps} />
            <FormDialog {...formDialogProps} />
        </Paper>
    )

}
