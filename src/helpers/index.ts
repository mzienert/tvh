type FileObject = {
    key: string;
    etag: string;
    lastModified: Date;
    size: number;
}

export const listDirectories = (files: any) => {
    const removeFileNames = getFileDirectories(files);
    const directoryNames = removeFileNames.filter((directory: string, index: string) => {
        if (directory.length) {
            return removeFileNames.indexOf(directory) === index
        }
    });
    const sortedDirectoryNames = directoryNames.sort((a: string, b: string) => a.localeCompare(b));
    return sortedDirectoryNames;
};

export const getFileDirectories = (files: any) => files.map((file: FileObject) => file.key.split('/')[0]);