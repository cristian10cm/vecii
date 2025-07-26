'use client'
import './index.css'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import PQRQuestionsS from '@/components/interfaces/PQRQuestions/PQRQuestions';
const PreguntasVecii = ({nameSection}:{nameSection:string})=>{
    return(
        <>
            <VeciiHeaderImg 
                srcImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq8AnyLfZx3k_xAlg5BC8mmNdzQl3DlqhPOCDHeEtLN9zIE51pPQtg7xSeTNAkXJUQDN8&usqp=CAU'
                name='PQR'
                detail='Conjunto de madelena'
            />
            <SearchBar
                placeholder=''
            />
            <div className='container_pqr'>
                <div className='container_pqr_sectionTitle'>
                        <div className='container_pqr_sectionTitle-line'></div>
                        <h2 className='container_pqr_sectionTitle_title'>Preguntas</h2>
                        <div className='container_pqr_sectionTitle-line'></div>
                </div>
                <div className='container_pqr_questions'>
                        <PQRQuestionsS
                               paragraphPQR = '¿Donde puedo pagar la administración?'
                               pathPQR = ''
                               srcImg = ''
                               imgIcon  = '/assets/svg/PreguntaIcono.svg'
                        />
                        <PQRQuestionsS
                               paragraphPQR = '¿Donde puedo pagar la administración?'
                               pathPQR = ''
                               srcImg = ''
                               imgIcon  = '/assets/svg/PreguntaIcono.svg'
                        />
                        <PQRQuestionsS
                               paragraphPQR = '¿Donde puedo pagar la administración?'
                               pathPQR = ''
                               srcImg = ''
                               imgIcon  = '/assets/svg/PreguntaIcono.svg'
                        />
                        <PQRQuestionsS
                               paragraphPQR = '¿Donde puedo pagar la administración?'
                               pathPQR = ''
                               srcImg = ''
                               imgIcon  = '/assets/svg/PreguntaIcono.svg'
                        />
                </div>
            </div>
            <FooterFantasma></FooterFantasma>
        </>
    )
}
export default PreguntasVecii