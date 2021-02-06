import React from 'react';
import getCroppedPic from '../../scripts/getCroppedPic';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider'
import { GoX } from "react-icons/go";
import style from '../../../styles/components/MyAccount/ChangePictureSystem.module.css';
import '../../../styles/components/MyAccount/ReactEasyCropContainer.css';
import { withStyles } from '@material-ui/core/styles';

const { useState, useCallback } = React;

interface Props {
    handleCroppedPicture: Function,
    handleShowCropPictureWindow: Function,
}

// Configuração das cores do Slider do zoom e da rotação da imagem
const AppSlider = withStyles(() => ({
    thumb: {
        color: "#79acf8"
    },
    track: {
        color: "#79acf8"
    },
}))(Slider);



const ChangePictureSystem: React.FC<Props> = (props: Props) => {



    const _handleShowCrop = () => props.handleShowCropPictureWindow();

    var [picture, setPicture] = useState<Object | null>(null);
    var [showEasyCrop, setShowEasyCrop] = useState<boolean>(false);
    var [crop, setCrop] = useState<any>({ x: 0, y: 0 });
    var [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    var [rotation, setRotation] = useState<number>(0);
    var [zoom, setZoom] = useState<number>(1);


    const uploadPicture = (e: any) => {
        if (e.target.files[0] !== undefined) {
            setPicture(e.target.files[0])
            setShowEasyCrop(!showEasyCrop);
        }
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

    const exportCroppedPicture = useCallback(async () => {
        if (picture === null) return;
        var _cropped;


        try {
            _cropped = await getCroppedPic(
                picture,
                croppedAreaPixels,
                rotation
            )
        } catch (e) {
            throw (e);
        }
        props.handleCroppedPicture(_cropped.croppedPicture, _cropped.encodedCroppedPicture);
        props.handleShowCropPictureWindow();

    }, [props, picture, croppedAreaPixels, rotation])


    const onCropChange = (newCrop: Object) => setCrop(newCrop);
    const onZoomChange = (newZoom: number) => setZoom(newZoom);
    const onSlideZoomChange = (e: any, value: number) => { setZoom(value) };
    const onSlideRotationChange = (e: any, value: number) => { setRotation(value) };



    return (
        <div className={style.Container}>
            <div className={style.changePictureWindowBackground} onClick={_handleShowCrop} />
            <div className={style.changePictureContentContainer}>
                <div className={style.changePicturePositionContainer}>
                    <div className={style.changePictureContainer}>
                        <div className={style.exitButtonContainer}>
                            <button type="button" onClick={_handleShowCrop}>
                                <GoX size={25} />
                            </button>
                        </div>
                        <div className={style.PictureField}>
                            {
                                showEasyCrop ?

                                    <Cropper
                                        image={URL.createObjectURL(picture!)}
                                        zoom={zoom}
                                        rotation={rotation}
                                        crop={crop}
                                        aspect={1}
                                        onZoomChange={onZoomChange}
                                        onCropChange={onCropChange}
                                        onCropComplete={onCropComplete}
                                        cropShape="round"
                                    /> : null
                            }

                        </div>

                        <div className={style.ZoomSliderContainer}>
                            <h3>Zoom</h3> <span>({zoom}x)</span>
                            <AppSlider
                                defaultValue={1}
                                min={1}
                                max={4}
                                step={.1}
                                onChange={() => onSlideZoomChange}
                                marks
                            />

                            <h3>Rotação</h3> <span>({rotation} °)</span>
                            <AppSlider
                                defaultValue={0}
                                min={-180}
                                max={180}
                                onChange={() => onSlideRotationChange}
                            />

                        </div>

                        <div className={style.cropPictureTools}>
                            <input
                                className={style.inputProfileImg}
                                id="inputProfileImgFile"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={(e) => uploadPicture(e)}
                                hidden />
                            <label htmlFor="inputProfileImgFile">Trocar a foto</label>

                            <button type="button" onClick={exportCroppedPicture}>Salvar mudanças</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}

export default ChangePictureSystem;