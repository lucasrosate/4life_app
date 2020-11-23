import React, { useRef } from 'react';
import { GoX } from "react-icons/go";
import Cropper from 'react-cropper';
import Slider from '@material-ui/core/Slider'
import ChangePictureSystemStyle from '../../styles/components/MyAccount/ChangePictureSystemStyle.module.css';

const { useState, useEffect } = React;

interface Props {
    handleCroppedPicture: Function,
    handleShowCropPictureWindow: Function,

}

const ChangePictureSystem: React.FC<Props> = (props: Props) => {

    const _handleShowCrop = () => props.handleShowCropPictureWindow();

    const [picture, setPicture] = useState<string | null>(null);
    const [cropData, setCropData] = useState('#');
    const [cropper, setCropper] = useState<Cropper>();
    const pictureRef = useRef<HTMLImageElement>(null);


    const uploadPicture = (e: any) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setPicture(reader.result as any);
        };
        reader.readAsDataURL(files[0]);
    };

    return (
        <>
            <div className={ChangePictureSystemStyle.changePictureWindowBackground} onClick={_handleShowCrop} />
            <div className={ChangePictureSystemStyle.changePictureContentContainer}>
                <div className={ChangePictureSystemStyle.changePicturePositionContainer}>
                    <div className={ChangePictureSystemStyle.changePictureContainer}>
                        <div className={ChangePictureSystemStyle.exitButtonContainer}>
                            <button type="button" onClick={_handleShowCrop}>
                                <GoX size={32} />
                            </button>
                        </div>
                        <div className={ChangePictureSystemStyle.PictureField}>
                            <Cropper
                                style={{ height: 400, width: "100%" }}
                                initialAspectRatio={1}
                                src={picture!}
                                ref={pictureRef}
                                viewMode={1}
                                guides={true}
                                minCropBoxHeight={50}
                                minCropBoxWidth={50}
                                background={false}
                                responsive={true}
                                checkOrientation={false}
                                onInitialized={(instance: any) => setCropper(instance)} />
                        </div>

                        <div className={ChangePictureSystemStyle.cropPictureTools}>
                            <input
                                className={ChangePictureSystemStyle.inputProfileImg}
                                id="inputProfileImgFile"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                onChange={(e) => uploadPicture(e)}
                                hidden />
                            <label htmlFor="inputProfileImgFile">Trocar a foto</label>

                            <button>Salvar mudanças</button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ChangePictureSystem;