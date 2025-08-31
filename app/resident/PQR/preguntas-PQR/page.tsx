'use client'
import './index.css'
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import PQRQuestionsS from '@/components/interfaces/PQRQuestions/PQRQuestions';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
import { apiDataFilter } from '@/components/stores/apiDataFilter';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
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
     const nameComplex = setHousing().information?.location.complex.name || ''
    const [seeMore,setMore ]= useState<boolean>(false) 
    const {setInformation,barInformation} = useSearchBar()
    const [useInfo, setInfo] = useState<PreguntaPQR[]>([])
    const {information} = setHousing() ;
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

    const questions = apiDataFilter(useInfo,'question',seeMore,barInformation?.inputValue || '')
    return(
        <>
            <VeciiHeaderImg 
                srcImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq8AnyLfZx3k_xAlg5BC8mmNdzQl3DlqhPOCDHeEtLN9zIE51pPQtg7xSeTNAkXJUQDN8&usqp=CAU'
                name='PQR'
                detail={nameComplex}
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
                       { useInfo.length>0 ? 
                            questions.filterData.length>0 ? 
                           <>
                           {
                             questions.filterData.map((x,k)=>(
                                   <PQRQuestionsS
                                        question={x.question}
                                        answer={x.answer}
                                        iconName='Preguntas'
                                        paragraphPQR = {x.question}
                                        pathPQR = {'/resident/PQR/preguntas-PQR/preguntas/'}     
                                        idQuestions={x.id}  
                                        // imgIcon  = '/assets/svg/PreguntaIcono.svg'
                                        key={k}
                                    />
                             ))
                           }
                           {questions.stateSeeMore ? <BtnSeeMore enable={()=>setMore(true)}/>:''}
                           </>
                        
                       :
                       <PQRQuestionsS
                                iconName='Preguntas'
                               idQuestions=''
                               paragraphPQR = 'No encontrada'
                               pathPQR = ''
                            //    imgIcon  = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                        />:
                           <NoApiData message='¡No hay preguntas disponibles en este momento Vecii!'></NoApiData>
                    }
                       
                </div>
            </div>
            <FooterFantasma></FooterFantasma>
        </>
    )
}
export default PreguntasVecii