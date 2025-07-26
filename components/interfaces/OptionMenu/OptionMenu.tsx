"use client"

import './index.css'
import GoTo from "@/components/logics/GoTo"

const OptionMenu = ({name, srcImg,pathUrl}: {name:string, srcImg:string,pathUrl:string}) =>{

    const goToPath = GoTo();
    
    return(
        <div className="optionMenu_header" onClick={()=>goToPath({path:pathUrl})}>
            <img src={srcImg}></img>
            <p>{name}</p>
        </div>
    )

};

export {OptionMenu};