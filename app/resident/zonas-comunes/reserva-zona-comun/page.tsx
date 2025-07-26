'use client'
import './index.css';
import { useState,useEffect } from 'react';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';

const reserveArea = ()=>{
    const [date,setDate] = useState<string>('')
    useEffect(()=>{
        const today = new Date()
        const formattedDate = today.toISOString().split('T')[0];
        setDate(formattedDate)
    },[])
    return(
        <>
            <VeciiHeaderImg
                srcImg = 'https://coasa.org/wp-content/uploads/2022/04/construir-piscina-consejos.jpg'
                name = 'Piscina'
                detail = 'Conjunto Pimientos de Madelena'
            />
            <div className='container_reserveRegister'>
                <h2 className='container_reserveRegister_title'>Registro</h2>
                <form className='container_reserveRegister_form' action="">
           {/* <label htmlFor="">Nombre</label> */}
                   <input type="text" className='container_reserveRegister_form-input' placeholder="Ingrese su nombre completo"/>
                   {/* <label htmlFor="">Correo</label> */}
                   <input type="email" name="" id="" className='container_reserveRegister_form-input'  placeholder="ejemplo@correo.com"/>
                   {/* <label htmlFor="">Cedula</label> */}
                   <input type='number' className='container_reserveRegister_form-input' placeholder="Número de cédula"/>
                   {/* <label htmlFor="">Numero de telefono</label> */}
                   {/* <input type='number' className='container_reserveRegister_form-input' placeholder="Ej: 3001234567"/> */}
                   {/* <label htmlFor="">Apto</label> */}
                   {/* <input type="text" className='container_reserveRegister_form-input' placeholder="Número de apartamento"/> */}
                   {/* <label htmlFor="">Comentarios</label> */}
                    <label htmlFor="">Fecha de ingreso</label>
                   <input type="date" className='container_reserveRegister_form-input' name="" id="" onChange={(e)=>{setDate(e.target.value)}}/>
                    <label htmlFor="">Comentarios</label>
                   <textarea name="" className='container_reserveRegister_form-input' id="" placeholder="Escriba aquí sus comentarios adicionales"></textarea>
                   <input type="submit" value='Reservar' className='container_reserveRegister_form-send'/>
                       
                </form>
            </div>
            <FooterFantasma/>
        </>
    )
}
export default reserveArea