import { Dropbox } from 'dropbox';

// configuração do dropbox
const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN as string,
});

// função para upar o arquivo
export const uploadFile = async (path: string, filename: string, picture: string) => {

    // files upload recebe
    //'path', nome do destino na nuvem dropBox para enviar o arquivo
    //contents, {}, que recebe os arquivos que serão upados
    return await dbx.filesUpload({
        path: `/${path}/${filename}`,
        contents: picture
    })
        .then((res: any) => res)
        .catch((err: any) => err);
}

export const getTemporaryPictureLink = async (path: string, filename: string) => {
    return await dbx.filesGetTemporaryLink({
        path: `/${path}/${filename}`
    })
        .then(res => res.result.link)
        .catch(err => err)
}

export const deleteFile = async (path: string, filename: string) => {
    return await dbx.filesDeleteV2({
        path: `/${path}/${filename}`
    })
        .then(res => res)
        .catch(err => err);
}

module.exports = {
    uploadFile,
    getTemporaryPictureLink,
    deleteFile
};