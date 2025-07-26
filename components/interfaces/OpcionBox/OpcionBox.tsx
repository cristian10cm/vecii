'use client'
import './index.css'
import {useState} from 'react';
import GoTo from '@/components/logics/GoTo';
const OpcionBox = ({nameBox1,nameBox2,path1,path2}:{nameBox1:string;nameBox2:string;path1:string,path2:string})=>{
    const [useColor ,setColor] = useState<boolean>()
    const goToPath = GoTo()
    const trueBox =()=>{
        setColor(true)
        goToPath({path:path1})
    }
    const falseBox =()=>{
        setColor(false)
        goToPath({path:path1})
    }
    return(
          <div className='typeMailbox'>
              
                <div className={ !useColor?`typeMailbox_option option_true`:'typeMailbox_option option_false'} onClick={falseBox}>
                    <p className='typeMailbox_paragraph'>{nameBox1}</p>
                </div>
                  <div className={ useColor?`typeMailbox_option option_true`:'typeMailbox_option option_false'} onClick={trueBox}>
                    <p className='typeMailbox_paragraph'>{nameBox2}</p>
                </div>
            </div> 
     )
}
export default OpcionBox