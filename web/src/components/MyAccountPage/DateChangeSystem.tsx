import React, { CSSProperties } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { GoPencil, GoCheck, GoX } from 'react-icons/go';
import ChangeButtonStyle from '../../styles/components/MyAccount/ChangeButtonSystemStyle.module.css';

const {useState, useEffect} = React;

interface Props {
    //Label a ser mostrada
    label?: string

    //Cor do botão de alterar e a lateral
    color?: string

    //Propriedade (Ex: username,firstname, etc)
    PropertyValue: string,

    //showInput Status (Se true, aparece o input com a opção aceitar/recusar)
    showInput: boolean,

    //Função a ser chamada do parent caso seja recusado a mudança
    handleExitChange: Function,

    //Função a ser chamada do parent caso seja aceito a mudança
    handleAcceptChange: Function,

    //Tamanho dos ícones (padrão: 18 px)
    size?: number,

    //Erro a ser passado caso haja algum problema durante a execução da função
    errorMessage?: string

}


export default function ChangeButtonSystem(props: Props) {


    const { handleSubmit } = useForm();


    const size = props.size === undefined ? 18 : props.size;
    const label = props.label === undefined ? "" : props.label;


    var [color, setColor] = useState("")
    var [newPropertyParentValue, setNewPropertyParentValue] = useState("");
    var [errorMessages, setErrorMessages] = useState<string[]>([]);




    useEffect(() => {
        setColor(props.color === undefined ? "#2F4EF0" : props.color);
    }, [])



    const styleBorder: CSSProperties = {
        borderLeftColor: color,
    }

    const handleChangeProperty = async () => {

        if (newPropertyParentValue.length > 0) {
            props.handleAcceptChange(newPropertyParentValue);
        }

        props.handleExitChange();
    }



    return (
        <div>
            <div className={ChangeButtonStyle.userData} style={styleBorder}>

                <span className={ChangeButtonStyle.DataLabel}>{label}</span>

                <span>
                    {/* ON SUBMIT, CLICANDO EM GO CHECK -> handleChangeProperty */}
                    <form onSubmit={handleSubmit(handleChangeProperty)}>

                        {/* Mostrar ?
                            true -> mostra o input juntamente com os botões de aceitar/recusar
                            false -> mostra o botão de alterar
                        */}

                        {props.showInput ?
                            <span className={ChangeButtonStyle.changeButtonContainer}>

                                {/* Input */}
                                <input type="date" className={ChangeButtonStyle.userDataInfoSelect}
                                    placeholder="Preencha este campo"
                                    minLength={10}
                                    maxLength={10}
                                    value={newPropertyParentValue}
                                    size={size}
                                    onChange={(e) => setNewPropertyParentValue(e.target.value)}
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
                                            onClick={() => props.handleExitChange()}
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
                                        onClick={() => props.handleExitChange()}
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