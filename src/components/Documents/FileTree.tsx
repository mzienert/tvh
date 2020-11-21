import React, {useEffect, useState} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DescriptionIcon from '@material-ui/icons/Description';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { getFile } from "../../services/storage";

declare module 'csstype' {
    interface Properties {
        '--tree-view-color'?: string;
        '--tree-view-bg-color'?: string;
    }
}

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
    labelIcon: React.ElementType<SvgIconProps>;
    labelInfo?: string;
    labelText: string;
};

const useTreeItemStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: theme.palette.text.secondary,
            '&:hover > $content': {
                backgroundColor: theme.palette.action.hover,
            },
            '&:focus > $content, &$selected > $content': {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
                color: 'var(--tree-view-color)',
            },
            '&:focus > $content $label, &:hover > $content $label, &$selected > $content $label': {
                backgroundColor: 'transparent',
            },

        },
        content: {
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '$expanded > &': {
                fontWeight: theme.typography.fontWeightRegular,
            },
        },
        group: {
            marginLeft: 0,
            '& $content': {
                paddingLeft: theme.spacing(2),
            },
        },
        expanded: {},
        selected: {},
        label: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
        labelRoot: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(0.5, 0),
        },
        labelIcon: {
            marginRight: theme.spacing(1),
        },
        labelText: {
            fontWeight: 'inherit',
            flexGrow: 1,
        },
    }),
);

const StyledTreeItem = (props: StyledTreeItemProps) => {
    const classes = useTreeItemStyles();
    const { labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other } = props;

    return (
        <TreeItem
            label={
                <div className={classes.labelRoot}>
                    <LabelIcon color="inherit" className={classes.labelIcon} />
                    <Typography variant="body2" className={classes.labelText}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </div>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
            }}
            classes={{
                root: classes.root,
                content: classes.content,
                expanded: classes.expanded,
                selected: classes.selected,
                group: classes.group,
                label: classes.label,
            }}
            {...other}
        />
    );
}

const useStyles = makeStyles(
    createStyles({
        root: {
            flexGrow: 1,
        },
        noFileText: {
            textAlign: 'center',
        },
    }),
);

export type DisplayTreeProps = {
    sortedFiles: any,
}

export const DisplayTree = (props: DisplayTreeProps) => {
    const classes = useStyles();

    const [state, setState] = useState<any>({
        directories: [],
    });

    const formatDate = (date: Date) => date.toDateString();

    useEffect(() => {
        const directories = Object.keys(props.sortedFiles);
        setState({...state, directories})

    }, [props]);

    const downloadFile = (file: any) => {
        getFile(file);
    }

    if (state.directories.length) {
        return (
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ArrowDropDownIcon/>}
                defaultExpandIcon={<ArrowRightIcon/>}
                defaultEndIcon={<div style={{width: 24}}/>}
            >
                {state.directories.map((directory: any) => (
                    <StyledTreeItem
                        nodeId={directory}
                        labelText={directory}
                        labelIcon={FolderIcon}
                        key={directory}>
                        {props.sortedFiles[directory].map((file: any) => (
                            <StyledTreeItem
                                nodeId={file.key.split('/')[1]}
                                labelText={file.key.split('/')[1]}
                                labelIcon={DescriptionIcon}
                                labelInfo={formatDate(file.lastModified)}
                                color="#1a73e8"
                                bgColor="#e8f0fe"
                                onClick={() => downloadFile(file)}
                            />
                        ))}
                    </StyledTreeItem>
                ))}
            </TreeView>
        );
    } else {
        return (
            <p className={classes.noFileText}>No files have been added yet.</p>
        )
    }
}

