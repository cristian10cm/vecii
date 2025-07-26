"use client";

import GoTo from '@/components/logics/GoTo';
import './index.css';

const PQROption = ({bakground,title,details,pathUrl}:{
    bakground:string,
    title:string,
    details:string,
    pathUrl:string
}) =>{

    const goToPath = GoTo()

    return(
        <div className='PQR_vecii' 
         
        >
            <h2 className='PQR_vecii_title'>{title}</h2>
            <p className='PQR_vecii_details'>{details}</p>
            <button className='PQR_vecii_btn' onClick={()=>goToPath({path:pathUrl})}>Ver</button>
        </div>
    );

};

export default PQROption;