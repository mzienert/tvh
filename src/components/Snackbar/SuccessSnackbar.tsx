import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import { clearSnackbar } from "../../redux/actions";
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SuccessSnackbar() {
    const dispatch = useDispatch();
    const { snackbarMessage, snackbarOpen, snackbarType } = useSelector(
        (state: any) => state.ui
    );

    function handleClose() {
        dispatch(clearSnackbar());
    }

    return (
        <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
        >
            <Alert onClose={handleClose} severity={snackbarType}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    );
}


