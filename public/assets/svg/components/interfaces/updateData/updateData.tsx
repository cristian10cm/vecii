'use client'
import React, { useEffect, useState } from 'react';
import './index.css'
import { useBtnEdit } from '@/components/stores/storeEditInput';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
const UpdateData =({label,type,refElement,information,numBtn,formName}:{numBtn:number,label :string,type : string,refElement : React.RefObject<HTMLInputElement | null>,information: string,formName:string})=>{
    const [useEdit,setEdit] = useState<boolean>(false)
    const state = useBtnEdit().state.form[formName]?.btnEdit[numBtn]
    const {updateBtn} = useBtnEdit()
    useEffect(()=>{

      updateBtn(formName,{key:numBtn,value:useEdit})
    },[])
    const actualizarDatos =(ref : React.RefObject<HTMLInputElement | null >)=>{
            console.log(state)     
            updateBtn(formName,{key:numBtn,value:!useEdit})
            setEdit(!state)
            if(ref.current){
                ref.current.disabled = useEdit
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
          <button className='container_infoUser_patch_edit'  onClick={()=>actualizarDatos(refElement)}>
              {
                !useEdit?
                <IconSvgGradient
                urlImage='/assets/svg/pencil.svg'
                widthImg='6vw'
                />:
                <IconSvgGradient
                urlImage='/assets/svg/pencil-slash.svg'
                widthImg='6vw'/>
              }
          </button>
        </div>
    )
}
export default UpdateData