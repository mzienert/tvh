import React, {Component, useState} from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from "react-redux";
import { formDialog } from "../../redux/actions";
//import { DialogProps } from "./AlertDialog.d";
import { deleteFile } from "../../services/storage";
import TextField from '@material-ui/core/TextField';
import { FormDialogProps } from "./FormDialogProps.d";
import { addFiles } from '../../services/storage';


export const FormDialog = (props: FormDialogProps) => {
    const dispatch = useDispatch();
    const { formDialogOpen } = useSelector(
        (state: any) => state.ui
    );

    const [state, setState] = useState<any>({
        files: [],
    });

    const handleChange = (files: any) => {
        setState({...state, files: files});
    }

    const handleClose = () => {
        dispatch(formDialog());
    };

    const handleSave = () => {
        addFiles(state.files[0]).then(res => console.log('res: ', res))
        console.log('state.files: ', state.files);
    }

    //console.log('state.files: ', state.files);
    return (
        <div>
            <Dialog
                open={formDialogOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.message}
                    </DialogContentText>
                    <DropzoneArea
                        onChange={handleChange}
                        maxFileSize={15000000}
                        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']} //application/pdf
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Subscribe
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
