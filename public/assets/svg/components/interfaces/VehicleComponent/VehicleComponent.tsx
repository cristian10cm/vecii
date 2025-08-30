'use client'
import './index.css';
import UpdateData from '../updateData/updateData';
import React, { useRef } from 'react';

type VehicleComponentProps = {
    placa: string,
    bahia: string,
    srcImg: string,
    refPlaca: React.RefObject<HTMLInputElement | null>,
    refBahia: React.RefObject<HTMLInputElement | null>
}

const VehicleComponent = ({ placa, bahia, srcImg,refPlaca,refBahia }: VehicleComponentProps) => {

    return (

        <div className='VehicleComponent_container'>
            <img src={srcImg} className='VehicleComponent_imgVehicle'></img>
            <div className='VehicleComponent_containerInfo'>
               <UpdateData
                label = 'Placa: ' 
                type = 'text'
                refElement = {refPlaca}
                information=  {placa}
               />
                <UpdateData
                label = 'Bahia: ' 
                type = 'text'
                refElement = {refBahia}
                information=  {bahia}
               />
            </div>
        </div>
        

    )
}

export default VehicleComponent