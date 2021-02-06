interface PixelCrop {
    x: number,
    y: number,
    width: number,
    height: number
}

interface OnLoadAble {
    onload: any;
 }

function onLoadPicture (pictureURL: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
    const picture = new Image();
    picture.src = pictureURL;
    picture.setAttribute('crossOrigin', 'anonymous');
    picture.onload = () => resolve(picture);
  });
 }

const getRadianAngle = (degree: number) => (degree * Math.PI) / 180;



const getCropppedPic: Function = async (PictureFile: Object, pixelCrop: PixelCrop, rotation: number) => {

    const pictureObj = await onLoadPicture(URL.createObjectURL(PictureFile));

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    //verificando qual lado é maior
    const maxSize = Math.max(pictureObj.width, pictureObj.height);

    //safeArea = duas vezes a medida máxima que um dos lados pode alcançar, i.e, 2*sen(45°)*maxSize
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
    

    //setando as dimensões do canvas para a dimensão máxima acima, para que a imagem seja rotacionada sem perder seus elementos
    canvas.width = safeArea;
    canvas.height = safeArea;

    //centralizando a imagem
    ctx!.translate(safeArea / 2, safeArea / 2);

    //rotacionando a imagem
    ctx!.rotate(getRadianAngle(rotation));

    //reposicionando a imagem após a rotação
    ctx!.translate(-safeArea / 2, -safeArea / 2);

    ctx!.drawImage(
        pictureObj,
        (safeArea / 2) - pictureObj.width * 0.5,
       ( safeArea / 2) - pictureObj.height * 0.5
    )

    const data = ctx!.getImageData(0, 0, safeArea, safeArea);

    
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx!.putImageData(
        data,
        Math.round( - (safeArea / 2) + pictureObj.width * 0.5 - pixelCrop.x),
        Math.round( - (safeArea / 2) + pictureObj.height * 0.5 - pixelCrop.y)
    );
    
    const croppedPicture = new Promise((resolve) => canvas.toBlob((file) => resolve(URL.createObjectURL(file))));
    const encodedCroppedPicture = new Promise((resolve) => resolve(canvas.toDataURL('image/jpeg')));
    
    return { 
        croppedPicture: await croppedPicture,
        encodedCroppedPicture: await encodedCroppedPicture
    };
}

export default getCropppedPic;