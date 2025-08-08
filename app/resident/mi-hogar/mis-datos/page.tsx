'use client'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import './index.css';
import UserInfo from '@/components/interfaces/UserInfo/UserInfo';
import VehicleComponent from '@/components/interfaces/VehicleComponent/VehicleComponent';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import PetsInfo from '@/components/interfaces/PetsInfo/PetsInfo';
import { useRef } from 'react';

const MisDatos = () => {
    const PlacaAuto = useRef<HTMLInputElement>(null)
    const bahia = useRef<HTMLInputElement>(null)
     const motoPlaca = useRef<HTMLInputElement>(null)
    const motobahia = useRef<HTMLInputElement>(null)
    return (
        <>
            <VeciiHeader
                srcImg='/assets/svg/Mis datos.svg'
                name='Mis Datos'
                transparent={false}
            />
            <UserInfo/>
            <div className='container_vehicles_grid'>
                <div className='container_vehicles_grid_separator'>
                    <div className='container_vehicles_grid_separator_line'></div>
                    <p className='container_vehicles_grid_separator_nameText'> Vehículos </p>
                    <div className='container_vehicles_grid_separator_line'></div>
                </div>
                <VehicleComponent
                   placa= 'HTMLA' 
                   bahia= '103'
                   refPlaca= {PlacaAuto}
                   refBahia= {bahia}
                   srcImg='https://img.icons8.com/3d-fluency/94/blue-car.png'
                />
                  <VehicleComponent
                   placa= 'ASDAS' 
                   bahia= '203'
                   refPlaca= {motoPlaca}
                   refBahia= {motobahia}
                   srcImg='https://cdn-icons-png.flaticon.com/512/15474/15474969.png'
                />
            </div>
            <PetsInfo/>
           
            <FooterFantasma/>
        </>
    )
};

export default MisDatos;