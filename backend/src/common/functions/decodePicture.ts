
// Função para localizar o formadto da imagem que foi upada e também retirar o termo data:image/png;FORMATO_DA_IMAGEM, para a imagem ser apresentada como foi enviada
import fs from 'fs';
import path from 'path';

const getFileFormat = (base64Picture: string) => {
    var matches = base64Picture.match(/^data:image([A-Za-z-+\/]+);base64,(.+)$/);

    return matches;
}

// Decodificar a imagem passada, que está em formato 'base64'

// Logo depois a imagem criada é criada com o seguinte nome (user._id + horário agora + formato tirado da função formatEncodedAndGetFormat)
const decodePicture = (base64Picture: string, uniqueValue: string) => {
    
    const now = Date.now().toLocaleString('pt-br');
    const matches = getFileFormat(base64Picture);
    
    if(matches?.length !== 3) {
        console.log("Erro: imagem inválida.")
        return {picture: Buffer.from(base64Picture) , pictureName: ""}
    }

    const fileFormat: string = matches[1].slice(1);
    const base64Content: string =  matches[2];
    
    const pictureName: string = `${uniqueValue}${now}.${fileFormat}`;
    const picture: Buffer = Buffer.from(base64Content, 'base64');


    // fs.writeFileSync(path.join(process.cwd() + '/files/', pictureName), picture);


//     //retornando o arquivo pronto para ser enviado e o seu nome
    return { picture: picture, pictureName: pictureName || ""};
// }
    
}

export default decodePicture;