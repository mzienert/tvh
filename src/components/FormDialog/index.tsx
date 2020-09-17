import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    useDispatch,
    useSelector
} from "react-redux";
import {
    formDialog,
    setLoading,
    showSnackbar,
} from "../../redux/actions";
import { FormDialogProps } from "./FormDialogProps.d";
import { addFiles } from '../../services/storage';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            alignItems: 'center',
        },
        wrapper: {
            margin: theme.spacing(1),
            position: 'relative',
        },
        buttonSuccess: {
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[700],
            },
        },
        fabProgress: {
            color: green[500],
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }),
);

export const FormDialog = (props: FormDialogProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { formDialogOpen, isLoading } = useSelector(
        (state: any) => state.ui
    );

    const [state, setState] = useState<any>({
        files: [],
    });

    const handleChange = (files: any) => {
        setState({...state, files: files});
    };

    const handleClose = () => {
        dispatch(formDialog());
    };

    const handleSave = async (path: string) => {
        dispatch(setLoading());
        addFiles(state.files[0], path).then(res => {
            const fileName = res.key.split('/');
            dispatch(setLoading());
            dispatch(formDialog());
            dispatch(showSnackbar(`File ${fileName[1]} has been uploaded`, 'info'));
            props.fileList();
        });
    };

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
                    <Button onClick={handleClose}
                            variant="contained"
                            color="secondary"
                    >
                        Cancel
                    </Button>
                    <div className={classes.wrapper}>
                    <Button onClick={() => {handleSave(props.path)}}
                            variant="contained"
                            color="primary"
                            disabled={isLoading || !state.files.length}
                    >
                        Upload
                    </Button>
                    {isLoading && <CircularProgress size={24} className={classes.buttonProgress} />}
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}
