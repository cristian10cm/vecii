'use client'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import './index.css';
import SearchBar from '@/components/interfaces/SearchBar/SearchBar';
import Reservations from '@/components/interfaces/Reservation/Reservation';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import PlacesComponents from '@/components/interfaces/PlacesComponents/PlacesComponents';
import apiFalsa from '@/app/resident/mi-hogar/mis-reservas/apiFalsa.json'
import { useSearchBar } from '@/components/stores/storeSearch';
import {setOpcionBox} from '@/components/stores/storeOpcionBox'
import { useEffect } from 'react';
const MisReservas = () => {
    const {setInformation} =  useSearchBar();
    const information = useSearchBar();
    const dataState = setOpcionBox();
    const {setStateOpcion} = setOpcionBox()
    const buscarData = apiFalsa.filter((a)=>a.name.toLocaleLowerCase().trim().includes((information.information?.inputValue || '').toLocaleLowerCase().trim()))
    useEffect(()=>{
        setInformation({
            inputValue : ''
        });
        setStateOpcion({
            state:null
        })
    },[])
    return(
        <>
            <VeciiHeader
                srcImg='/assets/svg/mis reservas.svg'
                name='Mis reservas'
            />
            <SearchBar placeholder='Nombre de la reserva'/>
            <OpcionBox
                  nameBox1= 'Reservado'
                  nameBox2= 'Sin reserva'
                  path1=''
                  path2=''
            />

            <div className='container_reservePlaces'>
                {   buscarData.length >0 ?
                    buscarData.map((e,k)=>
                      
                         <PlacesComponents
                           namePlace = {e.name}
                           statePlace = {e.state}
                           reservationTime = {e.time}
                           date = {e.datePlace}
                           pathPlace = '/resident/zonas-comunes/reserva-zona-comun/'
                           key={k}
                        />
                    ):
                      <PlacesComponents
                           namePlace = 'No encontrado'
                           statePlace = {false}
                           reservationTime = {'00:00'}
                           date = {'00/00/00'}
                           pathPlace = ''
                        />
                }
            </div>
            <FooterFantasma/>
        </>
    )

};

export default MisReservas;