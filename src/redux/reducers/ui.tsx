import {
    SNACKBAR_SUCCESS,
    SNACKBAR_CLEAR,
    LOADING_BAR,
    ALERT_DIALOG,
    FORM_DIALOG
} from "../actionTypes";

const initialState = {
    snackbarOpen: false,
    snackbarMessage: null,
    snackbarType: null,
    isLoading: false,
    alertDialogOpen: false,
    formDialogOpen: false,
};

export default function(state = initialState, action: any) {
    switch (action.type) {
        case SNACKBAR_SUCCESS:
            const { snackbarMessage, snackbarType } = action.payload;
            return {
                ...state,
                snackbarOpen: true,
                snackbarMessage,
                snackbarType,
            };
        case SNACKBAR_CLEAR:
            return {
                ...state,
                snackbarOpen: false,
                errorSnackbarOpen: false,
                infoSnackbarOpen: false
            };
        case LOADING_BAR:
            return {
                ...state,
                isLoading: !state.isLoading,
            }
        case ALERT_DIALOG:
            return {
                ...state,
                alertDialogOpen: !state.alertDialogOpen
            }
        case FORM_DIALOG:
            return {
                ...state,
                formDialogOpen: !state.formDialogOpen
            }
        default:
            return state;
    }
};

