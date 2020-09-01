import {
    SNACKBAR_SUCCESS,
    SNACKBAR_CLEAR,
    LOADING_BAR
} from "../actionTypes";

const initialState = {
    snackbarOpen: false,
    snackbarMessage: null,
    snackbarType: null,
    isLoading: false,
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
        default:
            return state;
    }
};

