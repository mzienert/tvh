import {
    SNACKBAR_CLEAR,
    USER_HAS_AUTHENTICATED,
    SNACKBAR_SUCCESS,
    LOADING_BAR,
    ALERT_DIALOG,
    FORM_DIALOG
} from "./actionTypes";

export const userHasAuthenticated = (isAuthenticated: boolean) => ({
    type: USER_HAS_AUTHENTICATED,
    payload: {
        isAuthenticated
    }
});

export const showSnackbar = (snackbarMessage: any, snackbarType: any) => ({
    type: SNACKBAR_SUCCESS,
    payload: {
        snackbarMessage,
        snackbarType,
    }
});

export const clearSnackbar = () => ({
    type: SNACKBAR_CLEAR
});

export const setLoading = () => ({
    type: LOADING_BAR
});

export const alertDialog = () => ({
    type: ALERT_DIALOG
})

export const formDialog = () => ({
    type: FORM_DIALOG,
})
