'use client'
import React from 'react';
import './index.css'
import { FaRegEdit } from "react-icons/fa";

const UpdateData =({label,type,refElement,information}:{label :string,type : string,refElement : React.RefObject<HTMLInputElement | null>,information: string})=>{

    const actualizarDatos =(ref : React.RefObject<HTMLInputElement | null>)=>{
            if(ref.current){
                ref.current.disabled = false
                // ref.current.defaultValue = information
                ref.current.focus()
            }
    }
    return(
        <div className='container_infoUser_patch_info'>
          <label className='container_infoUser_patch_label'>{label}</label>
          <input
            type={type}
            ref={refElement}
            disabled
            defaultValue={information}
          />
          <button className='container_infoUser_patch_edit'  onClick={()=>actualizarDatos(refElement)}><FaRegEdit /></button>
        </div>
    )
}
export default UpdateData