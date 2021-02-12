import React, { CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateUserData } from '../../store/actions/userActions';
import { GoPencil, GoCheck, GoX } from 'react-icons/go';
import style from '../../styles/components/MyAccount/ChangeButtonSystem.module.css';
import { Store } from 'redux';
import { StoreState } from '../../../../interfaces';

const { useState, useEffect } = React;

interface Props {
    //Propriedade (Ex: username,firstname, etc)
    propertyValue: string,

    //option
    option: string,

    //showInput Status (Se true, aparece o input com a opção aceitar/recusar)
    showInput: boolean,

    //Label a ser mostrada
    label?: string,

    //Cor do botão de alterar e a lateral
    color?: string,

    //Tamanho dos ícones (padrão: 18 px)
    size?: number,

    //Trim = true, bloqueia o usuário de por espaços no input
    trim?: boolean,

    //Somente números
    onlyNumber?: boolean,

    //Erro a ser passado caso haja algum problema durante a execução da função
    errorMessage?: string,

    //Default: 3
    minLength?: number,

    //Default: 24
    maxLength?: number,

}

const ChangeButtonSystem: React.FC<Props> = (props: Props) => {


    const { handleSubmit } = useForm<any>();


    const size = props.size === undefined ? 18 : props.size;
    const label = props.label === undefined ? "" : props.label;
    const minLength = props.minLength === undefined ? 3 : props.minLength;
    const maxLength = props.maxLength === undefined ? 24 : props.maxLength;

    const dispatch = useDispatch();


    var [color, setColor] = useState("")
    var [fieldValue, setFieldValue] = useState<string>(props.propertyValue);
    var [toggleOption, setToggleOption] = useState<boolean>(false);
    var responseErrorMessage = useSelector((state: StoreState) => {
        const option = props.option;

        switch (option) {
            case "EDIT_USERNAME":
                return state.userReducer.responseError.username;

            case "EDIT_FIRSTNAME":
                return state.userReducer.responseError.firstname;

            case "EDIT_LASTNAME":
                return state.userReducer.responseError.firstname;

            case "EDIT_EMAIL":
                return state.userReducer.responseError.email;

            case "EDIT_PHONE":
                return state.userReducer.responseError.phone;

            case "EDIT_STATE":
                return state.userReducer.responseError.state;

            case "EDIT_BIRTH":
                return state.userReducer.responseError.birth;
        }
    });
    
    const styleBorder: CSSProperties = {
        borderLeftColor: color,
    }

    const onSubmit = handleSubmit(async () => {
        if (props.propertyValue !== fieldValue && fieldValue.length > 4) {
            setFieldValue(fieldValue);

            Promise.all([
                dispatch(updateUserData(fieldValue, props.option)),
                () => {
                    console.log(fieldValue, props.propertyValue)
                }
            ]);

        }
    });


    const handleToggleField = () => {
        setToggleOption(!toggleOption);
    }

    useEffect(() => {
        setColor(props.color === undefined ? "#5698fa" : props.color);
    }, [props.color]);

    useEffect(() => {
        setToggleOption(false);
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
                                <input type="text" className={style.userDataInfoInput}
                                    name="fieldNewValue"
                                    placeholder="Preencha este campo"
                                    minLength={minLength}
                                    maxLength={maxLength}
                                    value={fieldValue}
                                    onChange={e => {
                                        let s = e.target.value;
                                        if (props.trim) s = s.trim();
                                        if (props.onlyNumber) s = s.replace(/\D/g, '');

                                        return setFieldValue(s);
                                    }
                                    }
                                />

                                <span className={style.optionsGo}>

                                    {/* Botão aceitar - Verde = username diferente do atual, Cinza = username igual */}
                                    {props.propertyValue === fieldValue ?
                                        <button type="button" className={style.buttonInv}>
                                            <GoCheck
                                                fill="gray"
                                                className={style.goIcon}
                                                size={size}
                                            />
                                        </button> :

                                        <button type="submit" className={style.buttonInv}>
                                            <GoCheck
                                                fill="rgb(39, 202, 93)"
                                                className={style.goIcon}
                                                type="submit"
                                                size={size}
                                            />
                                        </button>

                                    }

                                    {/* Botão de cancelar a troca */}
                                    <button type="button" className={style.buttonInv}>
                                        <GoX
                                            fill="rgb(202, 39, 39)"
                                            className={style.goIcon}
                                            onClick={() => handleToggleField()}
                                            size={size}
                                        />
                                    </button>


                                </span>

                            </span> :


                            <span className={style.changeButtonContainer}>
                                <span className={style.userDataInfo}>{props.propertyValue}</span>

                                {/* Botão para selecionar troca */}
                                <button type="button" className={style.buttonInv}>
                                    <GoPencil
                                        fill={color}
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
                <h2>{responseErrorMessage}</h2>
            </div>

        </div>


    )
}


export default ChangeButtonSystem;