"use client";
import './index.css';

import GoTo from '@/components/logics/GoTo';


const OptionInterface = ({srcImg , name , pathUrl, idImg,} : {srcImg:string , name:string , pathUrl:string,idImg:string,}) =>{
    const goToPath = GoTo()
    return(
        <div className='option_interface'  onClick={()=>goToPath({path:pathUrl})}>
            <img  className={`option_interface_img option_interface_img_${idImg}`}  src={srcImg}></img>
            <p className='option_interface_name'>{name}</p>
        </div>
    );
};

export default OptionInterface;