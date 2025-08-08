'use client'
import './index.css'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import { BsPatchQuestion } from "react-icons/bs";
import axios from 'axios';
import { useEffect } from 'react';

const Preguntas = ()=>{
    useEffect(()=>{
            const peticionPregunta = async()=>{
                const peticion = await axios.get('')
            }
    },[])
    return(
        <>
          <VeciiHeaderImg 
                srcImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq8AnyLfZx3k_xAlg5BC8mmNdzQl3DlqhPOCDHeEtLN9zIE51pPQtg7xSeTNAkXJUQDN8&usqp=CAU'
                name='PQR (Preguntas Vecii)'
                detail='Conjunto de madelena'
            />

            <div className='container_questionPQR'>
                <span><BsPatchQuestion/></span>
                <p className='container_questionPQR_title'>¿Cómo puedo reservar el salón comunal para una reunión familiar?</p>
                <div className='container_questionPQR_lineSeparator'></div>
                <li className='container_questionPQR_paragraphe'>Puedes reservar el salón comunal directamente desde la aplicación. Ve a la sección Reservas, selecciona Salón comunal, elige la fecha y horario que deseas, y sigue las instrucciones para confirmar la reserva. Recibirás una notificación una vez sea aprobada por la administración.</li>
            </div>

            <FooterFantasma/>
        </>
    )
}
export default Preguntas