import './index.css'
import InputForm from "../InputForm/InputForm"
import IconSvgGradient from '../IconSvgGradient/IconSvgGradient';
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

            <label className='container_inputDate_label'>{nameLabel}</label>
            <InputForm
                refInput={refInput}
                typeInput = {typeInput}
                nameOnsubmit = {nameOnsubmit}
            /> 
                    <span>
                        <IconSvgGradient
                            urlImage='/assets/svg/paw-print.svg'
                            widthImg='7vw'
                        />
                    </span> 
        </div> 
    )
}
export default InputDate