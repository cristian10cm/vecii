
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import './index.css';
import PQROption from '@/components/interfaces/PQROption/PQROption';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
const PQR = () =>{

    return(
        <>
            <VeciiHeaderImg 
                srcImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq8AnyLfZx3k_xAlg5BC8mmNdzQl3DlqhPOCDHeEtLN9zIE51pPQtg7xSeTNAkXJUQDN8&usqp=CAU'
                name='PQR'
                detail='Conjunto de madelena'
            />
            <div className='PQR_section'>
                <PQROption
                    bakground=''
                    title='Preguntas'
                    details='Encontrarás  un canal de información que te ayudará a responder tus inquietudes Vecii.'
                    pathUrl='/resident/PQR/PQR-vecii/'
                />
                <PQROption
                    bakground=''
                    title='Quejas'
                    details='Encontrarás  un canal de información que te ayudará a responder tus inquietudes Vecii.'
                    pathUrl='/resident/PQR/PQR-vecii/'
                />
                <PQROption
                    bakground=''
                    title='Reclamos'
                    details='Encontrarás  un canal de información que te ayudará a responder tus inquietudes Vecii.'
                    pathUrl='/resident/PQR/PQR-vecii/'
                />
            </div>
           <FooterFantasma/>
        </>
    )


}

export default PQR