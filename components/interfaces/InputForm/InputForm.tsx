import React from 'react'
import './index.css'
const InputForm = ({nameInput,placeHolder,icon:Icon,refInput,typeInput}:{
    nameInput:string,typeInput:string, placeHolder:string,icon:React.ElementType | any,refInput:React.RefObject<HTMLInputElement | null>
})=>{
        return(
              <div className='container_newRegister_input'>
                    <p className='container_newRegister_input-icon'><Icon/></p>
                    <div className='container_newRegister_input-items'>
                        <p >{nameInput}</p>
                        <input type={typeInput} placeholder={placeHolder} ref={refInput}/>
                    </div>  
                </div>

        )
}
export default InputForm