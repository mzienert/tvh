import { Storage } from "aws-amplify";

export const listFiles = async (path: string) => {
    return Storage.list(path, { level: "public" })
        .then(result => result)
        .catch(err => err);
}

export const deleteFile = async (file: string) => {
    return Storage.remove(file).catch(e => e);
}

export const addFiles = async (file: any, path: any) => {
    console.log('file: ', file.name);
    return Storage.put(`${path}/${file.name}`, file).catch(e => e);
}

