import React, { CSSProperties, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { GoPencil, GoCheck, GoX } from 'react-icons/go';
import ChangeButtonStyle from '../../styles/components/MyAccount/ChangeButtonSystem.module.css';


interface Props {
    PropertyValue: string,
    showInput: Boolean,
    handleFunction: Function,
    handleAcceptChange: Function,
    size?: number
}

export default function ChangeButtonSystem(props: Props) {

    const size = props.size === undefined ? 18 : props.size;

    var [newPropertyParentValue, setNewPropertyParentValue] = useState(props.PropertyValue);

    const handleChangeProperty = () => {
        props.handleAcceptChange(newPropertyParentValue);
        props.handleFunction();
    }

    return (
        <span>
            { props.showInput ?
                <span className={ChangeButtonStyle.changeButtonContainer}>
                    <input type="text" className={ChangeButtonStyle.userDataInfoInput}
                        placeholder="Preencha este campo"
                        minLength={8}
                        maxLength={24}
                        
                        value={newPropertyParentValue}
                        onChange={e => setNewPropertyParentValue(e.target.value)}
                        size={size}
                    />

                    <span className={ChangeButtonStyle.optionsGo}>
                        {props.PropertyValue === newPropertyParentValue ?
                            <GoCheck fill="gray"
                                className={ChangeButtonStyle.goIcon}
                                size={size}
                            /> :

                            <GoCheck fill="rgb(39, 202, 93)"
                                className={ChangeButtonStyle.goIcon}
                                onClick={() => handleChangeProperty()}
                                size={size}
                            />
                        }

                        <GoX fill="rgb(202, 39, 39)"
                            className={ChangeButtonStyle.goIcon}
                            onClick={() => props.handleFunction()}
                            size={size}
                        />
                    </span>

                </span> :

                <span className={ChangeButtonStyle.changeButtonContainer}>
                    <span className={ChangeButtonStyle.userDataInfo}>{props.PropertyValue}</span>
                    <GoPencil fill="#2F4EF0"
                        className={ChangeButtonStyle.goIcon}
                        onClick={() => props.handleFunction()}
                        size={size}
                    />
                </span>
            }
        </span>
    )
}


ChangeButtonSystem.propTypes = {
    size: PropTypes.string
}