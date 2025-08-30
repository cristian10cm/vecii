'use client'
import React, { useEffect, useState } from 'react';
import './index.css'
import { useBtnEdit } from '@/components/stores/storeEditInput';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
type breedPet={
      createdAt: string,
      id: string,
      name: string,
      type: {
        createdAt: string
        id: string
        name: string
      }
}

const UpdateSelect =({label,refElement,numBtn,formName,breed}:{numBtn:number,label :string,refElement : React.RefObject<HTMLSelectElement | null>,formName:string,breed:breedPet[]})=>{
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
      
        <div className='container_patchSelect_Pet'>
          <label className='container_patchSelect_Pet_label'>{label}</label>
          <select ref={refElement} disabled>
          {
            breed.map((x,k)=>(
                
                <option key={k} value={x.id}>{x.name}</option>
            ))
          }
          </select>
          <button className='container_patchSelect_edit'  onClick={()=>actualizarDatos(refElement)}>
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
export default UpdateSelect