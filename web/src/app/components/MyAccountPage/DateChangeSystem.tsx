import React, { CSSProperties } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { GoPencil, GoCheck, GoX } from 'react-icons/go';
import { updateUserData } from '../../store/actions/userActions';
import style from '../../styles/components/MyAccount/ChangeButtonSystem.module.css';

const { useState, useEffect } = React;

interface Props {
    option: string,

    //Label a ser mostrada
    label?: string

    //Cor do botão de alterar e a lateral
    color?: string

    //Propriedade (Ex: username,firstname, etc)
    propertyValue: string,

    //showInput Status (Se true, aparece o input com a opção aceitar/recusar)
    showInput: boolean,

    //Tamanho dos ícones (padrão: 18 px)
    size?: number,

    //Erro a ser passado caso haja algum problema durante a execução da função
    errorMessage?: string
}


const ChangeButtonSystem: React.FC<Props> = (props: Props) => {

    const size = props.size === undefined ? 18 : props.size;
    const label = props.label === undefined ? "" : props.label;

    const { handleSubmit } = useForm();
    const dispatch = useDispatch();

    var [color, setColor] = useState("")
    var [fieldValue, setFieldValue] = useState<string>(props.propertyValue);
    var [formattedFieldValue, setFormattedFieldValue] = useState<Date>(new Date());
    var [oldDate, setOldDate] = useState<Date>(new Date());
    var [toggleOption, setToggleOption] = useState<boolean>(false);
    var [errorMessage, setErrorMessage] = useState<string>("");




    useEffect(() => {
        setColor(props.color === undefined ? "#5698fa" : props.color);
    }, [props.color])



    const styleBorder: CSSProperties = {
        borderLeftColor: color,
    }


    const onSubmit = handleSubmit(() => {
        if (formattedFieldValue < new Date(Date.now()) ) {
            setFieldValue(fieldValue);
            console.log(fieldValue);
            dispatch(updateUserData(fieldValue, props.option));
        } else {
            setErrorMessage("A data deve ser inferior à hoje.")
        }
    });

    const handleToggleField = () => {
        setToggleOption(!toggleOption);
    }

    useEffect(() => {
        const date = new Date(props.propertyValue);
        setToggleOption(false);
        setOldDate(date);
        setErrorMessage("");
    }, [props.propertyValue])


    return (
        <div>
            <div className={style.userData} style={styleBorder}>

                <span className={style.DataLabel}>{label}</span>

                <span>
                    {/* ON SUBMIT, CLICANDO EM GO CHECK -> handleChangeProperty */}
                    <form onSubmit={onSubmit}>

                        {/* Mostrar ?
                            true -> mostra o input juntamente com os botões de aceitar/recusar
                            false -> mostra o botão de alterar
                        */}

                        {toggleOption ?
                            <span className={style.changeButtonContainer}>

                                {/* Input */}
                                <input type="date" className={style.userDataInfoSelect}
                                    placeholder="Preencha este campo"
                                    minLength={10}
                                    maxLength={10}
                                    size={size}
                                    onChange={(e) => {
                                        setFieldValue(e.target.value);
                                        setFormattedFieldValue(new Date(fieldValue));
                                    }}
                                />



                                <span className={style.optionsGo}>

                                    {/* Botão aceitar - Verde = username diferente do atual, Cinza = username igual */}
                                    {oldDate === formattedFieldValue ?
                                        <button type="button" className={style.buttonInv}>
                                            <GoCheck fill="gray"
                                                className={style.goIcon}
                                                size={size}
                                            />
                                        </button> :

                                        <button type="submit" className={style.buttonInv}>
                                            <GoCheck fill="rgb(39, 202, 93)"
                                                className={style.goIcon}
                                                type="submit"
                                                size={size}
                                            />
                                        </button>

                                    }

                                    {/* Botão de cancelar a troca */}
                                    <button type="button" className={style.buttonInv}>
                                        <GoX fill="rgb(202, 39, 39)"
                                            className={style.goIcon}
                                            onClick={() => handleToggleField()}
                                            size={size}
                                        />
                                    </button>


                                </span>
                            </span>
                            :
                            <span className={style.changeButtonContainer}>
                                <span className={style.userDataInfo}>
                                    {`${oldDate?.getUTCDate()}/${oldDate?.getUTCMonth()}/${oldDate?.getUTCFullYear()}`}
                                </span>

                                {/* Botão para selecionar troca */}
                                <button type="button" className={style.buttonInv}>
                                    <GoPencil fill={color}
                                        className={style.goIcon}
                                        onClick={() => handleToggleField()}
                                        size={size}
                                    />
                                </button>
                            </span>
                        }
                    </form>
                </span>
            </div>

            <div className={style.errorContainer}>
                <h2>{errorMessage}</h2>
            </div>

        </div>


    )
}

export default ChangeButtonSystem;