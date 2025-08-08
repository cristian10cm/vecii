"use client";

import GoTo from '@/components/logics/GoTo';
import './index.css';

const PQROption = ({bakground,title,details,pathUrl,idPQR}:{
    bakground:string,
    title:string,
    details:string,
    pathUrl:string,
    idPQR?: string
}) =>{

    const goToPath = GoTo()
    const goToPQR = ()=>{
         goToPath({path:pathUrl})
         localStorage.setItem('idPQR',idPQR || '')
         localStorage.setItem('idNamePQR',title || '')
    }
    return(
        <div className='PQR_vecii' 
         
        >
            <h2 className='PQR_vecii_title'>{title}</h2>
            <p className='PQR_vecii_details'>{details}</p>
            <button className='PQR_vecii_btn' onClick={goToPQR}>Ver</button>
        </div>
    );

};

export default PQROption;