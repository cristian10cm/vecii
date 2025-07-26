'use client'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import PlacesComponents from '@/components/interfaces/PlacesComponents/PlacesComponents';
import './index.css';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useEffect } from 'react';
import apiFalsa from '@/app/resident/zonas-comunes/apiFalsa.json'
const ZonaComun = () =>{
    const {setInformation} = useSearchBar()
    const information =  useSearchBar()
    const data  = apiFalsa.filter((e)=>e.name.toLocaleLowerCase().trim().includes((information.information?.inputValue || '').toLocaleLowerCase().trim()))
    useEffect(()=>{
        setInformation({
            inputValue : ''
        })
    },[])
    return(
        <>
            <VeciiHeader 
                srcImg='/assets/svg/zonas comunes.svg'
                name='Zonas comunes'
            />
            <SearchBar placeholder=''></SearchBar>
            <OpcionBox
                nameBox1='Reservado'
                nameBox2='Sin reservar'
                path1=''
                path2=''
            />
            <div className='container_places-main'>
               { data.length>0 ?
                data.map((e,k)=>(
                    <PlacesComponents
                    namePlace={e.name}
                    reservationTime={e.time}
                    statePlace = {e.state}
                    date={e.datePlace}
                    pathPlace='/resident/zonas-comunes/reserva-zona-comun/'
                    key={k}
                />
                )):
                <PlacesComponents
                    namePlace={'No encontrado'}
                    reservationTime={'00:00:00'}
                    statePlace = {false}
                    date={'00/00/00'}
                    pathPlace=''
                    
                />
               }
            </div>
            <FooterFantasma/>
        </>
    )


}

export default ZonaComun;