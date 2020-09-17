import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { alertDialog, showSnackbar } from "../../redux/actions";
import { AlertDialogProps } from "./AlertDialogProps.d";
import { deleteFile } from "../../services/storage";

export const AlertDialog = (props: AlertDialogProps) => {
    const dispatch = useDispatch();
    const { alertDialogOpen } = useSelector(
        (state: any) => state.ui
    );

    const handleClose = () => {
        dispatch(alertDialog());
    };

    const fileDelete = () => {
        const fileName = props.file.split('/');
        handleClose();
        deleteFile(props.file)
            .then(res => {
                dispatch(showSnackbar(`${fileName[1]} has been deleted`, 'info'));
                props.fileList();
            })
            .catch(e => {
                dispatch(showSnackbar(e.message, 'error'));
            })
    }

    return (
        <div>
            <Dialog
                open={alertDialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}
                            variant="contained"
                            color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={fileDelete}
                            variant="contained"
                            color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
