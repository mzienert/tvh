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

export const getFile = async (file: any) => {
    Storage.get(file.key, { download: true })
        .then((res: any) => {
            const fileName = file.key.split('/')
            downloadBlob(res.Body, fileName[1])
        })
}

// TODO: this probably wont work on ie or safari
// https://docs.amplify.aws/lib/storage/download/q/platform/js#file-download-option
export function downloadBlob(blob: any, filename: any) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'download';
    const clickHandler = () => {
        setTimeout(() => {
            URL.revokeObjectURL(url);
            a.removeEventListener('click', clickHandler);
        }, 150);
    };
    a.addEventListener('click', clickHandler, false);
    a.click();
    return a;
}
