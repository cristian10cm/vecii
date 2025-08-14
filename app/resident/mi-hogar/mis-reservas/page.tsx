'use client'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import './index.css';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import PlacesComponents from '@/components/interfaces/PlacesComponents/PlacesComponents';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useEffect, useState } from 'react';
import { setHousing } from '@/components/stores/StoreHousing';
import { apiDataFilter } from '@/components/stores/apiDataFilter';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
import Cookies from 'js-cookie';
import GoTo from '@/components/logics/GoTo';
import axios from 'axios';
type reservedAreas = {
    id: string,
    startTime: Date | string,
    endTime: Date | string,
    status: "pending",
    totalCost: string,
    commonArea: {
        name: string
    }
}

const MisReservas = () => {
    const [seeMore,setSeeMore] = useState<boolean>(false)
    const goToPath = GoTo()
    const {setInformation,barInformation} =  useSearchBar();

    const {information} = setHousing();
    const [usePlace,setPlace] = useState<reservedAreas[]>([])
    const places = apiDataFilter(usePlace,'commonArea',seeMore,barInformation?.inputValue || '')
     const peticionReservedAreas =async ()=>{
        try{
            const peticion = await axios.get('https://api.vecii.com.co/api/v1/common-areas-reservations',
                {headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }}
            )
            
            setPlace(peticion.data.results)
        }catch(err){
             console.log(err)
        }
      } 
    useEffect(()=>{
        if(!information) return
        setInformation({
            inputValue : ''
        })
       
        peticionReservedAreas()
       
    },[information])
    return(
        <>
            <VeciiHeader
                srcImg='/assets/svg/mis reservas.svg'
                name='Mis reservas'
                transparent={false}
            />
            <SearchBar placeholder='Nombre de la reserva'/>

            <div className='container_reservePlaces'>
              { 
              usePlace.length>0 ?
              places.filterData.length>0 ?
              <>  
              { 
                places.filterData.map((e,k)=>(
                    <PlacesComponents
                    stateOpcion={false}
                    idPlace={e.id}
                    namePlace={e.commonArea.name}
                     datePlace={e.startTime.toString()}
                    pathPlace='/resident/zonas-comunes/reserva-zona-comun/'
                    key={k}
                 />
                    ))
                    
                    
                    }
                {places.stateSeeMore ? <BtnSeeMore enable={()=>setSeeMore(true)} />:'' } 
                 </>
            
                 : 
                 
                <PlacesComponents                    
                    idPlace=''
                    pathPlace='' 
                    namePlace='No encontrado'
                    stateOpcion= {false}
                    
                />:
                <div className='container_reservePlaces_noReserved'>
                    <NoApiData  message='¡No tienes ningún registro de reserva Vecii!'/>
                    <button onClick={()=>goToPath({path:'/resident/zonas-comunes/'})} className='container_reservePlaces_noReserved_btn'>¡Ver reservas!</button> 
                </div>
              
               }
            </div>
            <FooterFantasma/>
        </>
    )

};

export default MisReservas;