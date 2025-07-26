"use client";
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import './index.css';
import { useEffect, useState } from 'react';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';

const outObjetc = () => {

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
                name='Registro de salida'
            />


            <div className='container_outObject'>

                <h2 className='container_outObject_title'>Salida de objetos</h2>

                <div className='separator_outObject'></div>

                <div className='container_outObject_inputContainer'>
                    <input
                        className='container_outObject_input'
                        type='text'
                        placeholder='Nombre del que autoriza'
                    ></input>
                </div>
                <div className='container_outObject_inputContainer'>
                    <input
                        className='container_outObject_input'
                        type='text'
                        placeholder='Apellido del que autoriza'
                    ></input>
                </div>
                <div className='container_outObject_inputContainer'>
                    <input
                        className='container_outObject_input'
                        type='number'
                        placeholder='Identificación del que autoriza'
                    ></input>
                </div>

                <div className='container_outObject_chooseDate'>
                    <p className='container_outObject_dateTitle'>Fecha Salida:</p>
                    <input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='container_outObject_dateInput'
                    ></input>
                </div>

                <div className='container_outObject_descriptionArea'>
                    <textarea
                        id="description_outObject"
                        placeholder='Descripción del objeto'
                        className='container_outObject_textArea'
                    >
                    </textarea>
                </div>

                <div className='separator_outObject'></div>

                <h2 className='container_outObject_title'>Unidad proveniente</h2>

                <div className='container_outObject_chooseDate'>
                    <p className='container_outObject_dateTitle'>Tipo de unidad:</p>
                    <select
                        className='container_outObject_selectType'
                        onChange={(e) => setUnitType(e.target.value)}
                    >
                        <option value="0">Sin elección</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
                    </select>
                </div>

                {
                    unitType == 'apartamento' &&
                    <>
                        <div className='container_outObject_apartments'>
                            <select
                                className='container_outObject_selectType'

                            >
                                <option value="0">Torre:</option>
                                <option value="1">Apartamento</option>
                                <option value="2">Casa</option>
                            </select>

                            <select
                                className='container_outObject_selectType'

                            >
                                <option value="0">Unidad:</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                            </select>
                        </div>
                        <button className='container_outObject_btnSend'>Registrar</button>
                    </>
                }

                {
                    unitType == 'casa' &&
                    <>
                        <div className='container_outObject_chooseDate'>

                            <p className='container_outObject_dateTitle'>Casa Número:</p>

                            <select
                                className='container_outObject_selectType'
                            >
                                <option value="0">Casa:</option>
                                <option value="1">01</option>
                                <option value="2">02</option>
                            </select>
                        </div>
                        <button className='container_outObject_btnSend'>Registrar</button>
                    </>
                }

            </div>
            <FooterFantasma/>
        </>
    )

}

export default outObjetc;