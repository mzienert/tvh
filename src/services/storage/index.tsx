import { Storage } from "aws-amplify";

export const listFiles = async (path: string) => {
    return Storage.list(path, { level: "public" })
        .then(result => result)
        .catch(err => err);
}

export const deleteFile = async (file: string) => {
    return Storage.remove(file).catch(e => e);
}

export const addFiles = async (file: string) => {
    return Storage.put('minutes/Matt.jpg', file).catch(e => e);
}

