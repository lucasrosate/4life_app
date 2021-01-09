
// Função para localizar o formadto da imagem que foi upada e também retirar o termo data:image/png;FORMATO_DA_IMAGEM, para a imagem ser apresentada como foi enviada

const formatEncodedAndGetFormat = (encodedPicture) => {
    const s = encodedPicture.slice(0, 40);

    var result = {
        newEncodedPicture: '',
        format: ''
    }

    if (s.includes("png")) {
        result.format = 'png';
        result.newEncodedPicture = encodedPicture.replace("data:image/png;base64,", "");


    } else if (s.includes("jpeg")) {
        result.format = 'jpeg';
        result.newEncodedPicture = encodedPicture.replace("data:image/jpeg;base64,", "");
    }

    return result
}

// Decodificar a imagem passada, que está em formato 'base64'

// Logo depois a imagem criada é criada com o seguinte nome (user._id + horário agora + formato tirado da função formatEncodedAndGetFormat)
const decodePicture = (encodedPicture, uniqueValue) => {
    const result = formatEncodedAndGetFormat(encodedPicture);

    var picture = Buffer.from(result.newEncodedPicture, 'base64');

    const now = Date.now().toLocaleString('pt-br');

    //const path_saved = path.join(PROJECT_DIR, 'public');
    const pictureName = `${uniqueValue}${now}.${result.format}`;

    //const pictureFile = fs.writeFileSync(path.join(path_saved, pictureName), picture);

    //return { pictureFile: pictureFile, pictureName: pictureName, path_saved: path_saved };

    //retornando o arquivo pronto para ser enviado e o seu nome
    return { picture: picture, pictureName: pictureName };
}

module.exports = decodePicture;