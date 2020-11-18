import { UserForm } from "../components/Directory/UserCard";

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

export const userFullName = (user: any) => {
    const firstName = user.find((attrs: any) => attrs.Name === 'name');
    const lastName = user.find((attrs: any) =>  attrs.Name === 'family_name');
    const email = getUserEmail(user);
    if (!firstName) {
        return email.Value
    }

    return `${firstName.Value} ${lastName.Value}`
}

export const getUserAttributeValue = (value: string, user: any) => user.find((val: any) => val.Name === value);

const getUserEmail = (user: any) => user.find((user: any) => user.Name === 'email');

export const buildAddressString = (userForm: UserForm) => {
    const { firstName, lastName, email, phone, ...addressValues } = userForm;
    return  Object.values(addressValues).join(',');
}
