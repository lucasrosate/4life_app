interface PixelCrop {
    x: number,
    y: number,
    width: number,
    height: number
}

interface OnLoadAble {
    onload: any;
 }

function onLoadPicture<T extends OnLoadAble>(obj: T): Promise<T> {
    return new Promise((resolve, reject) => {
    obj.onload = () => resolve(obj);
  });
 }

const getRadianAngle = (degree: number) => (degree * Math.PI) / 180;



const getCropppedPic: Function = async (PictureFile: Object, pixelCrop: PixelCrop, rotation: number) => {

    var picture: HTMLImageElement = new Image();
    var croppedPicture;
    
    const picturePromise = onLoadPicture(picture);
    picture.src = URL.createObjectURL(PictureFile);
    picture.setAttribute('crossOrigin', 'anonymous');

    
    picture = await picturePromise;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(picture.width, picture.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
    
    canvas.width = safeArea;
    canvas.height = safeArea;

    ctx!.translate(safeArea / 2, safeArea / 2);
    ctx!.rotate(getRadianAngle(rotation));
    ctx!.translate(-safeArea / 2, -safeArea / 2);

    ctx!.drawImage(
        picture,
        safeArea / 2 - picture.width * 0.5,
        safeArea / 2 - picture.height * 0.5
    )

    const data = ctx!.getImageData(0, 0, safeArea, safeArea);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx!.putImageData(
        data,
        Math.round(0 - safeArea / 2 * picture.width * 0.5 - pixelCrop.x),
        Math.round(0 - safeArea / 2 * picture.height * 0.5 - pixelCrop.y)
    );

    return new Promise((resolve) => {
        resolve((canvas.toDataURL("image/jpeg").replace(/^data:image\/(png|jpg);base64,/, "")));
      })
    
}

export default getCropppedPic;