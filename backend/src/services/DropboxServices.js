const Dropbox = require('dropbox').Dropbox;

// configuração do dropbox
const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
});

// função para upar o arquivo
const uploadFile = async (path, filename, picture) => {

    // files upload recebe
    //'path', nome do destino na nuvem dropBox para enviar o arquivo
    //contents, {}, que recebe os arquivos que serão upados
    return await dbx.filesUpload({
        path: `/${path}/${filename}`,
        contents: picture
    })
        .then(res => res)
        .catch(err => err);
}

const getTemporaryPictureLink = async (path, filename) => {
    return await dbx.filesGetTemporaryLink({
        path: `/${path}/${filename}`
    })
        .then(res => res.result.link)
        .catch(err => err)
}

const deleteFile = async (path, filename) => {
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