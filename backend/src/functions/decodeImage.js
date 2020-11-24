const { PROJECT_DIR } = require('../../project');
const fs = require('fs');

const formatEncodedAndGetFormat = (encodedPicture) => {
    const s = encodedPicture.slice(0, 40);

    var result =
    {
        newEncodedPicture: '',
        format: ''
    }

    if (s.includes("png")) {
        result.format='png';
        result.newEncodedPicture = encodedPicture.replace("data:image/png;base64,", "");


    } else if (s.includes("jpeg")) {
        result.format='jpeg';
        result.newEncodedPicture = encodedPicture.replace("data:image/jpeg;base64,", "");
    }

    return result
}


const convertImage = (encodedPicture, uniqueValue) => {
    const result = formatEncodedAndGetFormat(encodedPicture);

    var picture = Buffer.from(result.newEncodedPicture, 'base64');

    const now = Date.now().toLocaleString('pt-br');
    const filename = `${uniqueValue}${now}.${result.format}`;
    const path = `${PROJECT_DIR}/public/${filename}`;

    fs.writeFileSync(path, picture);

    return filename;
}

module.exports = convertImage;