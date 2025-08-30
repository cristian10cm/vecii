'use client'
import './index.css'
import {useRef, useState} from 'react';
import GoTo from '@/components/logics/GoTo';
import { useSearchBar } from '@/components/stores/storeSearch';
import { useFilterDate } from '@/components/stores/storeFilterDate';
import SearchBar from '../SearchBar/SearchBar';
const OpcionBox = ({nameBox1,nameBox2,path1,path2, onClickDato,gradients}:{
    onClickDato:(dato:boolean)=>void
    nameBox1:string;nameBox2:string;path1?:string,path2?:string,gradients?:boolean})=>{
    const {setInformation} = useSearchBar()
    const refDiv = useRef<HTMLDivElement>(null)
    const [useColor ,setColor] = useState<boolean>()
    const trueBox =()=>{
        setColor(true)
        onClickDato(true)
        setInformation({
            inputValue:''
        })

    }
    const falseBox =()=>{
        setColor(false)
        onClickDato(false)
    }
    const classTrue = !useColor?`typeMailbox_option option_true_gradient`:'typeMailbox_option option_false_gradient'
    const classFalse = useColor?`typeMailbox_option option_true_gradient`:'typeMailbox_option option_false_gradient'
    return(
          <div className='typeMailbox' ref={refDiv}>
              
                <div  className={ classTrue} onClick={falseBox}>
                    <p className='typeMailbox_paragraph'>{nameBox1}</p>
                </div>
                  <div className={ classFalse} onClick={trueBox}>
                    <p className='typeMailbox_paragraph'>{nameBox2}</p>
                </div>
            </div> 
     )
}
export default OpcionBox