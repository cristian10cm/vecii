'use client'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import PlacesComponents from '@/components/interfaces/PlacesComponents/PlacesComponents';
import './index.css';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { setHousing } from '@/components/stores/StoreHousing';
import { places,reservedAreas } from '.';
import { apiDataFilter } from '@/components/stores/apiDataFilter';
import NoApiData from '@/components/interfaces/NoApiData/NoApiData';
import BtnSeeMore from '@/components/interfaces/BtnSeeMore/BtnSeeMore';
const ZonaComun = () =>{
    const {setInformation,barInformation} = useSearchBar();
    const [seeMore1,setMore1 ]= useState<boolean>(false) 
     const [seeMore2,setMore2 ]= useState<boolean>(false) 
    const {information} = setHousing();
    const [usePlaces,setPlaces] = useState<places[]>([])
    const [useReservedAreas,setReservedAreas] = useState<reservedAreas[]>([]);
    const [useStateOpcion,setStateOpcion] = useState<boolean>(false)
    const viewOpcion = (data:boolean)=>{
        setStateOpcion(data)
        setMore1(false)
        setMore2(false)
    }
    const peticionReservedAreas =async ()=>{
        try{
            const peticion = await axios.get('https://api.vecii.com.co/api/v1/common-areas-reservations',
                {headers:{
                    Authorization:`Bearer ${Cookies.get('token')}`
                }}
            )
            
            setReservedAreas(peticion.data.results)
        }catch(err){
             console.log(err)
        }
      } 
      const peticionPlace = async()=>{
            try{
                const peticion = await axios.get('https://api.vecii.com.co/api/v1/common-areas',
                    {headers:{
                        Authorization:`Bearer ${Cookies.get('token')}`},
                    params:{
                        complexId: information?.location.complex.id
                    }}
                );
                const {data} = peticion
                setPlaces(data.results)
            }catch(error){
                console.log(error)
            }
        }
    useEffect(()=>{
        if(!information) return
        setInformation({
            inputValue : ''
        })
        peticionReservedAreas()
        peticionPlace()  
    },[information])
    //   const dataAreas  = usePlaces.filter((e)=>e.name.toLocaleLowerCase().trim().includes((searchBarInfo.information?.inputValue || '').toLocaleLowerCase().trim()))
    //   const dataReseved = useReservedAreas.filter((e)=>e.commonArea.name.toLocaleLowerCase().trim().includes((searchBarInfo.information?.inputValue || '').toLocaleLowerCase().trim()))
    const places = apiDataFilter(usePlaces,'name',seeMore1,barInformation?.inputValue || '')
    const reservedPlaces = apiDataFilter(useReservedAreas,'commonArea',seeMore2,barInformation?.inputValue || '')

    return(
        <>
            <VeciiHeader 
                srcImg='/assets/svg/zonas comunes.svg'
                name='Zonas comunes'
                transparent={false}
            />
            
            <SearchBar placeholder=''></SearchBar>
            <OpcionBox
                nameBox1='Registros'
                nameBox2='Reservar'
                onClickDato = {viewOpcion}
            />
            <div className='container_places-main'>
               {
                useStateOpcion ? 
                usePlaces.length>0?
                places.filterData.length>0 ?
                <>
                {places.filterData.map((e,k)=>(
                    <PlacesComponents
                    stateOpcion = {true}
                    namePlace={e.name}
                     idPlace={e.id}

                    pathPlace='/resident/zonas-comunes/reserva-zona-comun/'
                    key={k}
                />
                ))}
                {places.stateSeeMore ? <BtnSeeMore enable={()=>setMore1(true)}/> : ''}
                </>
               :<PlacesComponents
                    stateOpcion = {false}
                    idPlace={'No encontrado'}
                    pathPlace=''
                    datePlace={'00-00-00'}
                    namePlace={'No encontrado'}
                />: 
               <NoApiData message='Sin reservas comunes.'/>
                :
                useReservedAreas.length >0 ?
                    reservedPlaces.filterData.length>0?  
                    <>
                    {
                        reservedPlaces.filterData.map((x,k)=>(
                        <PlacesComponents
                            stateOpcion = {false}
                            idPlace={x.id}
                            pathPlace=''
                            key={k}
                            datePlace={x.startTime.toString()}
                            namePlace={x.commonArea.name}
                        />))
                    }
                    {
                       reservedPlaces.stateSeeMore ? <BtnSeeMore enable={()=>setMore2(true)}/> : '' 
                    }
                    </>    
                    
                    :
                       
                         <PlacesComponents
                    stateOpcion = {false}
                    idPlace={'No encontrado'}
                    pathPlace=''
                    datePlace={'00-00-00'}
                    namePlace={'No encontrado'}
                />

                :
                <div className='container_places_noReserved'>
                <NoApiData message='No tienes ningún registro de reserva.'/>
                    <button onClick={()=>setStateOpcion(true)} className='container_places_noReserved_btn'>¡Ver reservas!</button> 
                </div>
                
               }
               
            </div>
            <FooterFantasma/>
        </>
    )


}

export default ZonaComun;