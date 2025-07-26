'use client';
import './index.css'
import GoTo from '@/components/logics/GoTo';
const PQRQuestions =({paragraphPQR,pathPQR, srcImg,imgIcon}:{paragraphPQR:string,pathPQR:string, srcImg:string,imgIcon:string})=>{
    const goToPath = GoTo()
    return(
        <div className='Pqr_question'>
            <img className='Pqr_question_questionIcon' src={imgIcon} alt="Icono PQR" />
            <p className='Pqr_question_paragraph'>{paragraphPQR}</p>
            <img className='Pqr_question_sendIcon' src="/assets/svg/arrowIcon.svg" alt="Icono de seguir" 
                onClick={()=>goToPath({path:pathPQR})}
            />
        </div>
    )
}
export default PQRQuestions