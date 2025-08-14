'use client'
import React, { useEffect, useState } from 'react';
import './index.css'
import { useBtnEdit } from '@/components/stores/storeEditInput';
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
const UpdateTextArea =({label,refElement,information,numBtn,formName}:{numBtn:number,label : string,refElement : React.RefObject<HTMLTextAreaElement | null>,information: string,formName:string})=>{
    const [useEdit,setEdit] = useState<boolean>(false)
    const state = useBtnEdit().state.form[formName]?.btnEdit[numBtn]
    const {updateBtn} = useBtnEdit()
    useEffect(()=>{

      updateBtn(formName,{key:numBtn,value:useEdit})
    },[])
    const actualizarDatos =(ref : React.RefObject<HTMLTextAreaElement | null >)=>{
            console.log(state)     
            updateBtn(formName,{key:numBtn,value:!useEdit})
            setEdit(!state)
            if(ref.current){
                ref.current.disabled = useEdit
                ref.current.focus()
                // ref.current.defaultValue = information
                
            }
    }
    return(
        <div className='container_updateTextArea'>
            <div className='container_updateTextArea_edit'>
                    <label className='container_updateTextArea_label'>{label}</label>
             <button className='container_updateTextArea_btn'  onClick={()=>actualizarDatos(refElement)}>
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
                <textarea rows={1} className='container_updateTextArea_textarea'
                    ref={refElement}
                    disabled
                    defaultValue={information}
                />
      
        </div>
    )
}
export default UpdateTextArea