import { Storage } from "aws-amplify";

export const listFiles = async (path: string) => {
    return Storage.list(path, { level: "public" }).catch(e => e);
}

export const deleteFile = async (file: string) => {
    return Storage.remove(file).catch(e => e);
}

export const addFiles = async (file: any, path: any) => {
    return Storage.put(`${path}/${file.name}`, file).catch(e => e);
}

