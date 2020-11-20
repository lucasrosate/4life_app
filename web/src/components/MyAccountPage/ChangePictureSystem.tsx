import React from 'react';
import { GoX } from "react-icons/go";
import Slider from '@material-ui/core/Slider'
import ChangePictureSystemStyle from '../../styles/components/MyAccount/ChangePictureSystemStyle.module.css';


interface Props {
    Picture: string,
    handleCroppedPicture: Function,
    handleShowCropPictureWindow: Function,

}

export default function ChangePictureSystem(props: Props) {

    const _handleShowCrop = () => props.handleShowCropPictureWindow();


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
                            <img src={props.Picture} alt="" />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}