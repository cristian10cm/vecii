'use client';
import './index.css'
import { GrNext } from "react-icons/gr";
import GoTo from '@/components/logics/GoTo';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
import {  useEffect, useState } from 'react';
const PQRQuestions =({paragraphPQR,pathPQR,idQuestions,statusPQR,iconName,answer,question}:
    {paragraphPQR:string,pathPQR:string,idQuestions:string,statusPQR?:string,iconName:string,answer?:string,question?:string })=>{
    const [useIcon,setIcon] = useState<string>()
    const goToPath = GoTo()
    const irPQR = ()=>{
            goToPath({path:pathPQR});
            localStorage.setItem('idPQRselected',idQuestions)
            if(statusPQR)localStorage.setItem('statusPQR',statusPQR)
            if(iconName == 'Preguntas'){
                if(question && answer)
                {
                    localStorage.setItem('questionPQR',question)
                    localStorage.setItem('answerPQR',answer)
                }
            }
    }
    
  useEffect(()=>{
  if(iconName == 'Quejas'){
        setIcon('/assets/svg/chat-centered-text.svg')
    }else if(iconName == 'Preguntas'){
        setIcon('/assets/svg/question.svg')
    }else if(iconName == 'Reclamos'){
        setIcon('/assets/svg/warning-circle.svg')
    }
  },[])
     
    return(
        <div className='Pqr_question'>
            {
                useIcon?
                <IconSvgGradient
                urlImage={useIcon}
                widthImg={'9vw'}
                />:
                <IconSvgGradient
                urlImage={'assets/svg/exclamation-mark.svg'}
                widthImg={'9vw'}
                />
            }
            <p className='Pqr_question_paragraph'>{paragraphPQR}</p>

            <button className='Pqr_question_sendIcon' onClick={irPQR}><span><GrNext/></span></button>
            
        </div>
    )
}
export default PQRQuestions