"use client"

import './index.css'
import GoTo from "@/components/logics/GoTo"
import Cookies from 'js-cookie';
const OptionMenu = ({name, srcImg,pathUrl,signOut}: {name:string, srcImg:string,pathUrl:string,signOut?:boolean}) =>{

    const goToPath = GoTo();
    const goToBack = ()=>{
        localStorage.clear()
        goToPath({path:'/'})
        Cookies.remove('id');
        Cookies.remove('userInfo');
        Cookies.remove('token')
        sessionStorage.clear()
    }
    return(
        <div className="optionMenu_header" onClick={!signOut ? ()=>goToPath({path:pathUrl}): goToBack}>
            <img src={srcImg}></img>
            <p>{name}</p>
        </div>
    )

};

export {OptionMenu};