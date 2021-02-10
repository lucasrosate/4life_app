import React, { CSSProperties } from 'react';
import { useForm } from 'react-hook-form';
import { GoPencil, GoCheck, GoX } from 'react-icons/go';
import style from '../../styles/components/MyAccount/ChangeButtonSystem.module.css';

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

    //Tamanho dos ícones (padrão: 18 px)
    size?: number,

    //Erro a ser passado caso haja algum problema durante a execução da função
    errorMessage?: string
}


const ChangeButtonSystem: React.FC<Props> = (props: Props) => {


    const { handleSubmit } = useForm();

    


    const size = props.size === undefined ? 18 : props.size;
    const label = props.label === undefined ? "" : props.label;


    var [color, setColor] = useState("")
    var [newPropertyParentValue, setNewPropertyParentValue] = useState("");
    var [toggleOption, setToggleOption] = useState<boolean>(false);




    useEffect(() => {
        setColor(props.color === undefined ? "#5698fa" : props.color);
    }, [])



    const styleBorder: CSSProperties = {
        borderLeftColor: color,
    }

    const onSubmit = handleSubmit(({ field }) => {

    });

    const handleSubmitChange = () => {

    }

    const handleExitChange = () => {

    }


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
                                    value={newPropertyParentValue}
                                    size={size}
                                    onChange={(e) => setNewPropertyParentValue(e.target.value)}
                                />



                                <span className={style.optionsGo}>

                                    {/* Botão aceitar - Verde = username diferente do atual, Cinza = username igual */}
                                    {props.PropertyValue === newPropertyParentValue ?
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
                                            onClick={() => handleExitChange()}
                                            size={size}
                                        />
                                    </button>


                                </span>

                            </span> :


                            <span className={style.changeButtonContainer}>
                                <span className={style.userDataInfo}>{props.PropertyValue}</span>

                                {/* Botão para selecionar troca */}
                                <button type="button" className={style.buttonInv}>
                                    <GoPencil fill={color}
                                        className={style.goIcon}
                                        onClick={() => handleExitChange()}
                                        size={size}
                                    />
                                </button>
                            </span>
                        }
                    </form>
                </span>
            </div>

            <div className={style.errorContainer}>

            </div>

        </div>


    )
}

export default ChangeButtonSystem;