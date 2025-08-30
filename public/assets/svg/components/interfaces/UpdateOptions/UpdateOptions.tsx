'use client'
import React, { useEffect, useState } from 'react';
import './index.css'
import { useBtnEdit } from '@/components/stores/storeEditInput';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';


const UpdateOptions =({label,refElement,numBtn,formName,option}:{numBtn:number,label :string,refElement : React.RefObject<HTMLSelectElement | null>,formName:string,option:string[]})=>{
    const [useEdit,setEdit] = useState<boolean>(false)
    const state = useBtnEdit().state.form[formName]?.btnEdit[numBtn]
    const {updateBtn} = useBtnEdit()
    useEffect(()=>{
      updateBtn(formName,{key:numBtn,value:useEdit})

    },[])
    const actualizarDatos =(ref : React.RefObject<HTMLSelectElement | null>)=>{
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
      
        <div className='container_patch_selectOption'>
          <label className='container_patch_selectOption_label'>{label}</label>
          <select ref={refElement} disabled>
                {option.map((x,k)=>(
                    <option value={x} key={k}>{x}</option>
                ))}
          </select>
          <button className='container_patch_selectOption_edit'  onClick={()=>actualizarDatos(refElement)}>
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
export default UpdateOptions
