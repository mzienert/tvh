import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { listFiles } from "../../services/storage";
import { AlertDialog } from '../AlertDialog';
import { useDispatch } from "react-redux";
import { alertDialog } from "../../redux/actions";
import { formDialog } from "../../redux/actions";
import { FormDialog } from "../FormDialog";
import { AlertDialogProps } from "../AlertDialog/AlertDialogProps.d";
import { FormDialogProps } from "../FormDialog/FormDialogProps.d";
import { listDirectories } from "../../helpers";
import { DisplaySkeleton } from "./Skeleton";
import { DisplayTree, DisplayTreeProps } from "./FileTree";
import { getCurrentAuthUser, listUserGroups } from "../../services/auth";

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

export const Documents = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [state, setState] = useState<any>({
        deleteFile: null,
        loadingFiles: false,
        sortedFiles: {},
    });

    const [userGroups, setUserGroups] = useState([])

    const fileList = () => {
        setState({...state, loadingFiles: true });
        listFiles('')
            .then(files => {
                const directories = listDirectories(files);
                const sortedFiles = {};
                directories.forEach((directory: string) => {
                    const directoryFiles: any = [];
                    files.forEach((file: any) => {
                        const filePath = file.key.split('/')[1];
                        const fileDirectory = file.key.split('/')[0];
                        if (fileDirectory === directory && filePath) {
                            directoryFiles.push(file);
                        }
                    });
                    Object.assign(sortedFiles, {[directory]: directoryFiles});
                });
                setState({...state, sortedFiles, loadingFiles: false})
            });
    };

    const handleClickOpen = (file: string) => {
        setState({
            ...state,
            deleteFile: file
        });
        dispatch(alertDialog());
    };

    useEffect(() => {
        fileList();
        getCurrentAuthUser().then(user =>  {
            listUserGroups(user.username).then(groups => {
                setUserGroups(groups.Groups);
            });
        });
    }, []);

    const alertDialogProps: AlertDialogProps = {
        message: 'This will peremanently delete this file.  Are you sure you want to do this?',
        title: 'Delete Document Files',
        file: state.deleteFile,
        fileList,
    }

    const displayTreeProps: DisplayTreeProps = {
        sortedFiles: state.sortedFiles,
    }
    const formDialogProps: FormDialogProps = {
        fileList,
    }

    const uploadFile = () => {
        dispatch(formDialog());
    };

    const downloadFile = (file: string) => {
        const awsUrl = 'https://tvh18afe5eae1ad44429cdbc502eb2fafa844416-master.s3-us-west-2.amazonaws.com/public/';
        window.location.href=`${awsUrl}${file}`;
    }

    const canEdit =  userGroups.find((group: any) => group.GroupName === 'editors');

    return (
        <Paper className={classes.paper}>
            {canEdit
             ?
                <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={uploadFile}
                >
                Upload
              </Button>
             : ''}
            <Divider />
            {!state.loadingFiles ? <DisplayTree {...displayTreeProps} /> : <DisplaySkeleton />}
            <AlertDialog {...alertDialogProps} />
            <FormDialog {...formDialogProps} />
        </Paper>
    );
};
