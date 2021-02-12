import React, { CSSProperties } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { updateUserData } from '../../store/actions/userActions';
import { GoPencil, GoCheck, GoX } from 'react-icons/go';
import style from '../../styles/components/MyAccount/ChangeButtonSystem.module.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
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

const PhoneInputContainer = styled.div`
    width: 380px;

    
    .PhoneInput {
        padding-bottom: 4px;
        border-bottom: 1px solid rgb(221, 221, 221);
        width: 90%;

        display: flex;
        align-items: center;

        .PhoneInputCountry {
            display: flex;
            align-items: center;

            select {
                width: 75px;
                color: gray;
                margin-right: 9px;
                color: gray;
                background-color: rgb(251, 251, 251);
                border: none;
                height: 35px;
                font-family: 'Dosis', sans-serif;

                &:focus {
                    outline: none;
                }
            }

            div img {
                width: 25px;
            }
        }

        input {
            margin-left: 4px;
            width: 210px;
            color: gray;
            background-color: rgb(251, 251, 251);
            border: none;
            height: 35px;
            font-family: 'Dosis', sans-serif;

            &:focus {
                outline: none;
            }
        }
    }
`

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

        console.log(props.propertyValue !== fieldValue && fieldValue.length >= 8);
        if (props.propertyValue !== fieldValue && isValidPhoneNumber(fieldValue)) {
            dispatch(updateUserData(fieldValue, props.option));
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
    }, [props.propertyValue]);


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
                                <PhoneInputContainer>
                                    <PhoneInput
                                        placeholder={"Preencha com o seu número"}
                                        value={fieldValue}
                                        onChange={setFieldValue}
                                        defaultCountry={"BR"}
                                    />
                                </PhoneInputContainer>


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
                                <span className={style.userDataInfo}>
                                    {`${props.propertyValue.slice(0, 3)} ${props.propertyValue.slice(3, 5)} ${props.propertyValue.slice(5)}`}
                                </span>

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