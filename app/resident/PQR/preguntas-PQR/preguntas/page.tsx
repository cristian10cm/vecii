'use client'
import './index.css'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import { BsPatchQuestion } from "react-icons/bs";
import axios from 'axios';
import { useEffect,useState } from 'react';

const Preguntas = ()=>{
    const [useAnswer,setAnswer] = useState<string>()
    const [useQuestion,setQuestion] = useState<string>()
    useEffect(()=>{
           const answer = localStorage.getItem('answerPQR')
           const question = localStorage.getItem('questionPQR')
           if(!answer && !question) return
           setQuestion(question || 'Cargando..')
           setAnswer(answer || 'Cargando..')
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
                <p className='container_questionPQR_title'>{useQuestion}</p>
                <div className='container_questionPQR_lineSeparator'></div>
                <li className='container_questionPQR_paragraphe'>{useAnswer}</li>
            </div>

            <FooterFantasma/>
        </>
    )
}
export default Preguntas