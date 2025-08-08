'use client'
import './index.css'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import PQRQuestionsS from '@/components/interfaces/PQRQuestions/PQRQuestions';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setHousing } from '@/components/stores/StoreHousing';
import { useSearchBar } from '@/components/stores/storeSearch';
interface PreguntaPQR {
  id: string;
  createdAt: string;
  question: string;
  answer: string;
}

const PreguntasVecii = ({nameSection}:{nameSection:string})=>{
    const {setInformation} = useSearchBar()
    const [useInfo, setInfo] = useState<PreguntaPQR[]>([])
    const {information} = setHousing() ;
    const searchInfo = useSearchBar()
    useEffect(()=>{
        if (!information) return
        setInformation({
            inputValue:''
        })
        const peticionPreguntas = async()=>{
            try{
                const peticion = await axios.get('https://api.vecii.com.co/api/v1/common-questions',
                {   headers:
                        {
                            Authorization: `Bearer ${Cookies.get('token')}`
                        },
                    params:{
                        complexId: information?.location.complex.id

                    }
                }
            )
            const {data} = peticion 
            setInfo(data.results)
            console.log(data)
            
            }catch(error){
                console.log(error)
            }
        }
        peticionPreguntas();
    },[information])
    const datos = useInfo.filter((x)=>x.question.toLowerCase().trim().includes((searchInfo.information?.inputValue.toLowerCase().trim()) || ''))
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
                       { datos.length>0 ? 
                            datos.map((x,k)=>(
                                   <PQRQuestionsS
                                        iconName='Preguntas'
                                        paragraphPQR = {x.question}
                                        pathPQR = {'/resident/PQR/preguntas-PQR/preguntas/'}     
                                        idQuestions={x.id}  
                                        // imgIcon  = '/assets/svg/PreguntaIcono.svg'
                                        key={k}
                                    />
                        ))
                        
                       :
                       <PQRQuestionsS
                                iconName='Preguntas'
                               idQuestions=''
                               paragraphPQR = 'No encontrada'
                               pathPQR = ''
                            //    imgIcon  = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                        />}
                       
                </div>
            </div>
            <FooterFantasma></FooterFantasma>
        </>
    )
}
export default PreguntasVecii