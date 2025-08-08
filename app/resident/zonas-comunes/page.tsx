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
const ZonaComun = () =>{
    const {setInformation} = useSearchBar();
    const searchBarInfo =  useSearchBar();
    const {information} = setHousing();
    const [usePlaces,setPlaces] = useState<places[]>([])
    const [useReservedAreas,setReservedAreas] = useState<reservedAreas[]>([]);
    const [useStateOpcion,setStateOpcion] = useState<boolean>(false)
    const viewOpcion = (data:boolean)=>{
        setStateOpcion(data)
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
      const dataAreas  = usePlaces.filter((e)=>e.name.toLocaleLowerCase().trim().includes((searchBarInfo.information?.inputValue || '').toLocaleLowerCase().trim()))
      const dataReseved = useReservedAreas.filter((e)=>e.commonArea.name.toLocaleLowerCase().trim().includes((searchBarInfo.information?.inputValue || '').toLocaleLowerCase().trim()))
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
               {/* { data.length>0 ?
                data.map((e,k)=>(
                    <PlacesComponents
                    stateOpcion = {true}
                     idPlace={e.id}
                    pathPlace='/resident/zonas-comunes/reserva-zona-comun/'
                    key={k}
                />
                )):
                <PlacesComponents 
                    stateOpcion = {true}
                    idPlace=''
                    pathPlace='' 
                />
               } */}
               {
                useStateOpcion ? 
                usePlaces.length>0?
                dataAreas.length>0 ?
                dataAreas.map((e,k)=>(
                    <PlacesComponents
                    stateOpcion = {true}
                     idPlace={e.id}
                    pathPlace='/resident/zonas-comunes/reserva-zona-comun/'
                    key={k}
                />
                )):
               <PlacesComponents
                    stateOpcion = {false}
                    idPlace={'No encontrado'}
                    pathPlace=''
                    
                    datePlace={'00-00-00'}
                    namePlace={'No encontrado'}
                />: 
                <div className='container_places_noReserved'>
                    <p className='container_places_noReserved_paragraphe'>Sin reservas comunes.</p>    
                </div> 
               
                :
                useReservedAreas.length >0 ?
                    dataReseved.length>0?  
                        dataReseved.map((x,k)=>(
                        <PlacesComponents
                            stateOpcion = {false}
                            idPlace={x.id}
                            pathPlace=''
                            key={k}
                            datePlace={x.startTime.toString()}
                            namePlace={x.commonArea.name}
                        />)):
                       
                         <PlacesComponents
                    stateOpcion = {false}
                    idPlace={'No encontrado'}
                    pathPlace=''
                    datePlace={'00-00-00'}
                    namePlace={'No encontrado'}
                />

                :
                <div className='container_places_noReserved'>
                    <p className='container_places_noReserved_paragraphe'>No tienes ningún registro de reserva.</p>
                    <button onClick={()=>setStateOpcion(true)} className='container_places_noReserved_btn'>¡Ver reservas!</button> 
                </div>
                
               }
               
            </div>
            <FooterFantasma/>
        </>
    )


}

export default ZonaComun;