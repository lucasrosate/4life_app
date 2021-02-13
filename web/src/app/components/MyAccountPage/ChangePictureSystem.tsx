import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { uploadUserPicture } from '../../store/actions/userActions';

import getCroppedPic from '../../scripts/getCroppedPic';
import { withStyles } from '@material-ui/core/styles';

import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider'
import { GoX } from "react-icons/go";

import CSSTransition from 'react-transition-group/CSSTransition';
import style from '../../styles/components/MyAccount/ChangePictureSystem.module.css';
import '../../styles/components/MyAccount/ReactEasyCropContainer.css';

interface ICoord {
    x: number,
    y: number
}


const { useState, useCallback } = React;

interface Props {
    handleShowCropPictureWindow: Function,
    showCropPictureWindow: boolean
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

    var dispatch = useDispatch();

    var [picture, setPicture] = useState<string>("");
    var [pictureFile, setPictureFile] = useState<File | null>(null);
    var [showEasyCrop, setShowEasyCrop] = useState<boolean>(false);
    var [crop, setCrop] = useState<ICoord>({ x: 0, y: 0 });
    var [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    var [rotation, setRotation] = useState<number>(0);
    var [zoom, setZoom] = useState<number>(1);

    const uploadPicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPicture(URL.createObjectURL(e.target.files ? e.target.files[0] : ""));
        setPictureFile(e.target.files ? e.target.files[0] : null);
        setShowEasyCrop(true);
    }
    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, [])

    const exportCroppedPicture = async () => {
        if (pictureFile === null) return;

        var cropped;

        try {
            cropped = await getCroppedPic(
                pictureFile,
                croppedAreaPixels,
                rotation
            )
        } catch (e) {
            throw (e);
        }

        await dispatch(uploadUserPicture(cropped));
        props.handleShowCropPictureWindow();

    }

    const onCropChange = (newCrop: ICoord) => setCrop(newCrop);
    const onZoomChange = (newZoom: number) => { console.log(zoom); setZoom(newZoom) };
    const onSlideZoomChange = (e: any, value: any) => { console.log(value); setZoom(value) };
    const onSlideRotationChange = (e: any, value: any) => { setRotation(value) };

    return (
        <div className={style.Container}>
            <div className={style.changePictureWindowBackground} onClick={_handleShowCrop} />
            <div className={style.changePictureContentContainer}>
                <div className={style.changePicturePositionContainer}>

                    <CSSTransition
                        in={props.showCropPictureWindow}
                        timeout={400}
                        classNames="fade-window"
                        mountOnEnter
                        unmountOnExit
                    >
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
                                            image={picture!}
                                            zoom={zoom}
                                            restrictPosition={true}
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
                                    onChange={(e, value) => onSlideZoomChange(e, value)}
                                    marks
                                />

                                <h3>Rotação</h3> <span>({rotation} °)</span>
                                <AppSlider
                                    defaultValue={0}
                                    min={-180}
                                    max={180}
                                    onChange={(e, value) => onSlideRotationChange(e, value)}
                                />

                            </div>

                            <div className={style.cropPictureTools}>
                                <input
                                    className={style.inputProfileImg}
                                    id="inputProfileImgFile"
                                    type="file"
                                    accept=".jpg, .jpeg, .png"
                                    onChange={uploadPicture}
                                    hidden />
                                <label htmlFor="inputProfileImgFile">Trocar a foto</label>

                                <button type="button" onClick={exportCroppedPicture}>Salvar mudanças</button>
                            </div>
                        </div>
                    </CSSTransition>

                </div>

            </div>
        </div>


    )
}

export default ChangePictureSystem;