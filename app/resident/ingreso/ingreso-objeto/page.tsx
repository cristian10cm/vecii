"use client";
import { useEffect, useState,useRef } from 'react';
import './index.css';
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import InputForm from '@/components/interfaces/InputForm/InputForm';
import { MdDriveFileRenameOutline, MdOutlinePhoneAndroid,MdOutlinePermIdentity,MdOutlinePermContactCalendar,MdAddBox  } from "react-icons/md";
const inComeObject = () => {
    const nameRef = useRef<HTMLInputElement>(null)
    const lasNameRef = useRef<HTMLInputElement>(null)
    const identificationRef = useRef<HTMLInputElement>(null)
    const fechaRef = useRef<HTMLInputElement>(null)
    const [date, setDate] = useState<string>("");
    const [unitType, setUnitType] = useState<string>("0")
    
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate);
    }, []);

    return (
        <>
            <VeciiHeader
                srcImg='/assets/svg/ingreso objeto.svg'
                name='Nuevo ingreso'
            />

            <div className='container_newObject'>

                <h2 className='container_newObject_title'>Ingreso de objetos</h2>

                <div className='separator_newObject'></div>

                <div className='container_newObject_inputs'>
                      <InputForm
                        nameInput='Nombre: '
                        placeHolder='Ejem. Juanita'
                        icon={MdOutlinePermIdentity}
                        refInput={nameRef}
                        typeInput = 'text' 
                    />
                      <InputForm
                        nameInput='Apellido: '
                        placeHolder='Ejem. Perez'
                        icon={MdDriveFileRenameOutline}
                        refInput={lasNameRef}
                        typeInput = {'text'}
                    />
                    <InputForm
                        nameInput='Cedula: '
                        placeHolder='Ejem. 1234567890'
                        icon={MdOutlinePhoneAndroid}
                        refInput={identificationRef}
                        typeInput = {'text'}
                    /> 
                    <InputForm
                        nameInput='Fecha de ingreso: '
                        placeHolder=''
                        icon={MdOutlinePermContactCalendar}
                        refInput={fechaRef}
                        typeInput = {'date'}
                    /> 
                     <div className='newIncome_testArea'>
                        <span className='newIncome_testArea_icon'>
                            <MdAddBox/>
                        </span>
                        <textarea placeholder='Objetos a ingresar' name="" id=""></textarea>
                    </div>
                    <button className='container_newObject_inputs_btn'>Registrar ingreso</button>
                </div>
              

                {/* <div className='container_newObject_chooseDate'>
                    <p className='container_newObject_dateTitle'>Fecha Ingreso:</p>
                    <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='container_newObject_dateInput'
                    ></input>
                </div>

                <div className='container_newObject_descriptionArea'>
                    <MdAddBox/>
                    <textarea
                        id="description_newObject"
                        placeholder='Descripción del objeto'
                        className='container_newObject_textArea'
                    >
                    </textarea>
                </div> */}

                {/* <div className='separator_newObject'></div>

                <h2 className='container_newObject_title'>Unidad de entrega</h2>

                <div className='container_newObject_chooseDate'>
                    <p className='container_newObject_dateTitle'>Tipo de unidad:</p>
                    <select
                        className='container_newObject_selectType'
                        onChange={(e) => setUnitType(e.target.value)}
                    >
                        <option value="0">Sin elección</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
                    </select>
                </div> */}

                {/* {

                    unitType == 'apartamento' &&
                    <>
                        <div className='container_newObject_apartments'>
                            <select
                                className='container_newObject_selectType'

                            >
                                <option value="0">Torre:</option>
                                <option value="1">Apartamento</option>
                                <option value="2">Casa</option>
                            </select>

                            <select
                                className='container_newObject_selectType'

                            >
                                <option value="0">Unidad:</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                            </select>
                        </div>
                        <button className='container_newObject_btnSend'>Ingresar</button>
                    </>
                }

                {
                    unitType == 'casa' &&
                    <>
                        <div className='container_newObject_chooseDate'>

                            <p className='container_newObject_dateTitle'>Casa Número:</p>

                            <select
                                className='container_newObject_selectType'
                            >
                                <option value="0">Casa:</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                            </select>
                        </div>
                        <button className='container_newObject_btnSend'>Ingresar</button>
                    </>
                } */}

            </div>
            <FooterFantasma/>
        </>
    )

}

export default inComeObject;