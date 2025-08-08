import React,{ComponentType } from 'react'
import './index.css';
import { UseFormRegisterReturn } from "react-hook-form";
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
type datos = {
  nameLabel?: string;
  placeHolder?: string;
  typeInput: string;
  icon?:ComponentType<any>;
  imgIcon?:string 
  refInput?: React.RefObject<HTMLInputElement | null>;
  defaultInput?:string;
  nameOnsubmit?:string
  inputDate?:boolean
};
const InputForm = ({nameOnsubmit,nameLabel,refInput,placeHolder,icon:Icon,typeInput,defaultInput,inputDate,imgIcon}:datos)=>{
        return(
              <div className='container_newRegister_input'>
                  {imgIcon ?  
                      <div className='container_newRegister_input-imgIcon'>
                        <IconSvgGradient
                          urlImage={imgIcon }
                          widthImg='8vw'
                        />
                      </div>
                    :''
                  }
                  { inputDate ? <p className='container_newRegister_dateLabel'>{nameLabel}</p> : ''}
                    <div className='container_newRegister_input-items'>
                       
                        <input 
                        defaultValue={defaultInput} 
                        type={typeInput} 
                        placeholder={placeHolder} 
                
                        ref={refInput}
                        name={nameOnsubmit}
                        />
                    </div>  
                </div>

        )
}
export default InputForm