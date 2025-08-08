import './index.css'
import InputForm from "../InputForm/InputForm"
type datos = {
  typeInput: string;
  refInput?: React.RefObject<HTMLInputElement | null>;
  defaultInput?:string;
  nameOnsubmit?:string
  nameLabel:string
};
const InputDate =({typeInput,refInput,nameOnsubmit,defaultInput,nameLabel}:datos)=>{
    return(
        <div className='container_inputDate'>
            <label htmlFor="">{nameLabel}</label>
            <InputForm
                refInput={refInput}
                typeInput = {typeInput}
                nameOnsubmit = {nameOnsubmit}
            /> 
        </div> 
    )
}
export default InputDate