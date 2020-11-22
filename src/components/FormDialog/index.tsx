import React, { useEffect, useState } from 'react';
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
import { addFiles, listFiles } from '../../services/storage';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    createStyles,
    makeStyles,
    Theme
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import InputLabel from "@material-ui/core/InputLabel";
import FilledInput from "@material-ui/core/FilledInput";
import FormControl from "@material-ui/core/FormControl";
import { useForm } from "react-hook-form";
import Select from '@material-ui/core/Select';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import { ListItemIcon } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from '@material-ui/icons/Folder';
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import { listDirectories } from "../../helpers";

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
        button: {
            margin: theme.spacing(1),
            display: 'flex',
            justifyContent: 'right',
        },
    }),
);

type DirectoryForm = {

}

type DialogState = {
   files: Array<string>,
   createDirectory: boolean,
   directory: string | null,
   directoryList: [] | null,
}

type FileObject = {
    key: string;
    etag: string;
    lastModified: Date;
    size: number;
}

export const FormDialog = (props: FormDialogProps) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const { formDialogOpen, isLoading } = useSelector(
        (state: any) => state.ui
    );

    const [state, setState] = useState<DialogState>({
        files: [],
        createDirectory: false,
        directory: null,
        directoryList: null,
    });

    const title = 'Upload a file';
    const message = 'Select a directoy to upload a file to or create a new one.';

    const handleChange = (files: any) => {
        setState({...state, files: files});
    };

    const handleDirName = (event: any) => {
        setState({...state, directory: event.target.value});
    };

    const handleClose = () => {
        dispatch(formDialog());
    };

    const toggleCreateDirectory = () => {
        setState({...state, createDirectory: !state.createDirectory});
    }

    useEffect(() => {
        if (state.directoryList === null) {
            listFiles('').then(files => {
                const directories = listDirectories(files);
                setState({...state, directoryList: directories});
            });
        }
    },[]);

    const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
        const name = event.target.name as keyof typeof state;
        const value = event.target.value;
        if (value != 'New-Directory') {
            setState({
                ...state,
                [name]: event.target.value,
            });
        } else {
            toggleCreateDirectory()
        }
    };

    const { register } = useForm<DirectoryForm>();

    const handleSave = async () => {
        dispatch(setLoading());
        addFiles(state.files[0], state.directory).then(res => {
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
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                    { !state.createDirectory
                        ? <FormControl variant="filled"
                                       fullWidth
                          >
                            <InputLabel htmlFor="filled-age-native-simple">Directory</InputLabel>
                            <Select onChange={handleSelectChange}
                                    inputProps={{
                                        name: 'directory',
                                        id: 'directory-select',
                                    }}>
                                { state.directoryList && state.directoryList.map(directory =>
                                    <MenuItem
                                        value={directory}
                                        key={directory}>
                                        <ListItemIcon>
                                            <FolderIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={directory} />
                                    </MenuItem>
                                )}
                                <Divider />
                                <MenuItem value={'New-Directory'}>
                                    <ListItemIcon>
                                        <CreateNewFolderIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="New Directory" />
                                </MenuItem>
                            </Select>
                          </FormControl>
                        : <div>
                            <FormControl variant="filled"
                                         fullWidth
                                         margin={"normal"}
                            >
                                <InputLabel htmlFor="name">Directory name</InputLabel>
                                <FilledInput name="name"
                                             inputRef={
                                                 register({
                                                     required: 'A directory is required',
                                                     maxLength: {
                                                         value: 50,
                                                         message: 'Name is to long'
                                                     },
                                                     minLength: {
                                                         value: 2,
                                                         message: 'Name is to short'
                                                     }
                                                 })
                                             }
                                             onChange={handleDirName}
                                             id="name"
                                             //error={ errors.name ? true : false }
                                             endAdornment={
                                                 <InputAdornment position="end">
                                                     <IconButton
                                                         aria-label="toggle password visibility"
                                                         onClick={toggleCreateDirectory}
                                                     >
                                                         <CancelIcon />
                                                     </IconButton>
                                                 </InputAdornment>
                                             }
                                />
                            </FormControl>
                          </div> }
                    <DropzoneArea onChange={handleChange}
                                  maxFileSize={15000000}
                                  acceptedFiles={[
                                      'image/jpeg',
                                      'image/png',
                                      'image/bmp',
                                      'application/pdf',
                                      'application/xlsx',
                                      '.csv',
                                      'text/csv',
                                      'application/vnd.ms-excel',
                                      'application/csv',
                                      'text/x-csv',
                                      'application/x-csv',
                                      'text/comma-separated-values', 
                                      'text/x-comma-separated-values'
                                  ]}
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
                    <Button onClick={() => {handleSave()}}
                            variant="contained"
                            color="primary"
                            disabled={isLoading || !state.files.length || state.directory == null}
                    >
                        Upload
                    </Button>
                    { isLoading && <CircularProgress size={24} className={classes.buttonProgress} /> }
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
};
