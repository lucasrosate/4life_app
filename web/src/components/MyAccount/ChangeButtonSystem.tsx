import React, { CSSProperties, useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { GoPencil, GoCheck, GoX } from 'react-icons/go';
import ChangeButtonStyle from '../../styles/components/MyAccount/ChangeButtonSystem.module.css';


interface Props {
    label?: string
    color?: string
    PropertyValue: string,
    showInput: Boolean,
    handleFunction: Function,
    handleAcceptChange: Function,
    size?: number,
    trim?: boolean,
    errorMessage?: string

}


export default function ChangeButtonSystem(props: Props) {


    const { handleSubmit } = useForm();


    const size = props.size === undefined ? 18 : props.size;
    const label = props.label === undefined ? "" : props.label;
    
    const error1 = "Campo vazio."
    

    var [color, setColor] = useState("")
    var [newPropertyParentValue, setNewPropertyParentValue] = useState("");
    var [errorMessages, setErrorMessages] = useState<string[]>([]);



    
    useEffect(()=> {
        setColor(props.color === undefined ? "#2F4EF0" : props.color);
        setNewPropertyParentValue(props.PropertyValue);
    }, [])



    const styleBorder: CSSProperties = {
        borderLeftColor: color,
    }

    const handleChangeProperty = async () => {

        if(newPropertyParentValue.length > 0 ) {
            props.handleAcceptChange(newPropertyParentValue);
        } else {
            if (!(errorMessages.includes(error1)))  
                setErrorMessages(errorMessages.concat(error1));
                console.log(errorMessages.includes(error1))
        }

        props.handleFunction();
    }


    return (
        <div>
            <div className={ChangeButtonStyle.userData} style={styleBorder}>
                <span className={ChangeButtonStyle.DataLabel}>{label}</span>
                <span>
                    <form onSubmit={handleSubmit(handleChangeProperty)}>

                        {/* Mostrar ?
                            true -> mostra o input juntamente com os botões de aceitar/recusar
                            false -> mostra o botão de alterar
                        */}

                        {props.showInput ?
                            <span className={ChangeButtonStyle.changeButtonContainer}>

                                {/* Input */}
                                <input type="text" className={ChangeButtonStyle.userDataInfoInput}
                                    placeholder="Preencha este campo"
                                    minLength={3}
                                    maxLength={24}

                                    value={newPropertyParentValue}
                                    onChange={e => props.trim ? setNewPropertyParentValue(e.target.value.trim())
                                        : setNewPropertyParentValue(e.target.value)}
                                    size={size}
                                />



                                <span className={ChangeButtonStyle.optionsGo}>

                                    {/* Botão aceitar - Verde = username diferente do atual, Cinza = username igual */}
                                    {props.PropertyValue === newPropertyParentValue ?
                                        <button type="button" className={ChangeButtonStyle.buttonInv}>
                                            <GoCheck fill="gray"
                                                className={ChangeButtonStyle.goIcon}
                                                size={size}
                                            />
                                        </button> :

                                        <button type="submit" className={ChangeButtonStyle.buttonInv}>
                                            <GoCheck fill="rgb(39, 202, 93)"
                                                className={ChangeButtonStyle.goIcon}
                                                type="submit"
                                                size={size}
                                            />
                                        </button>

                                    }

                                    {/* Botão de cancelar a troca */}
                                    <button type="button" className={ChangeButtonStyle.buttonInv}>
                                        <GoX fill="rgb(202, 39, 39)"
                                            className={ChangeButtonStyle.goIcon}
                                            onClick={() => props.handleFunction()}
                                            size={size}
                                        />
                                    </button>


                                </span>

                            </span> :


                            <span className={ChangeButtonStyle.changeButtonContainer}>
                                <span className={ChangeButtonStyle.userDataInfo}>{props.PropertyValue}</span>

                                {/* Botão para selecionar troca */}
                                <button type="button" className={ChangeButtonStyle.buttonInv}>
                                    <GoPencil fill={color}
                                        className={ChangeButtonStyle.goIcon}
                                        onClick={() => props.handleFunction()}
                                        size={size}
                                    />
                                </button>
                            </span>
                        }
                    </form>
                </span>
            </div>

            <div className={ChangeButtonStyle.errorContainer}>
                <h2>{errorMessages}</h2>
            </div>

        </div>


    )
}


ChangeButtonSystem.propTypes = {
    size: PropTypes.string
}