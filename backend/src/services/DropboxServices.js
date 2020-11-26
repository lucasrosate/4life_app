const Dropbox = require('dropbox').Dropbox;

// configuração do dropbox
const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
});

// função para upar o arquivo
const uploadFile = async (picture, pictureName) => {

    // files upload recebe
    //'path', nome do destino na nuvem dropBox para enviar o arquivo
    //contents, {}, que recebe os arquivos que serão upados
    return await dbx.filesUpload({
        path: '/profilePictures/' + pictureName,
        contents: picture
    })
        .then(res => res)
        .catch(err => err);
}

const getTemporaryPictureLink = async (picturename, folder) => {
    return await dbx.filesGetTemporaryLink({
        path: `/${folder}/${picturename}`
    })
        .then(res => res.result.link)
        .catch(err => err)
}

module.exports = {
                uploadFile,
                getTemporaryPictureLink
                };