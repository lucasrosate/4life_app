import React, { CSSProperties } from 'react';
import { GoPencil, GoCheck , GoX} from 'react-icons/go';
import ChangeButtonStyle from '../../styles/components/MyAccount/ChangeButtonSystem.module.css';
import 'dotenv/config';


interface Props {
    PropertyValue: string,
    showInput: Boolean,
    handleFunction: Function,
    handleAcceptChange: Function,
    size?: number
}

export default function ChangeButtonSystem(props: Props) {

    const size = props.size === undefined ? 18 : props.size;

    return (
        <span>
            { props.showInput ?
                <span className={ChangeButtonStyle.changeButtonContainer}>
                    <input type="text" className={ChangeButtonStyle.userDataInfoInput}
                        placeholder="Preencha o campo"
                        size = {size}
                    />
                    
                    <span className={ChangeButtonStyle.optionsGo}>
                        <GoCheck fill="rgb(39, 202, 93)"
                        className={ChangeButtonStyle.goIcon}
                        onClick={() => props.handleFunction()}
                        size = {size}
                        />

                        <GoX fill="rgb(202, 39, 39)"
                        className={ChangeButtonStyle.goIcon}
                        onClick={() => props.handleFunction()}
                        size = {size}
                        />
                    </span>

                </span> :

                <span className={ChangeButtonStyle.changeButtonContainer}>
                    <span className={ChangeButtonStyle.userDataInfo}>{props.PropertyValue}</span>
                        <GoPencil fill="#2F4EF0"
                        className={ChangeButtonStyle.goIcon}
                        onClick={() => props.handleFunction()}
                        size = {size}
                        />
                </span>
            }
        </span>
    )
}