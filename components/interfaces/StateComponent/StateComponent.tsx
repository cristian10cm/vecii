'use client'
import './index.css'
const StateComponent =  ({statusComp,dataTrue,dataFalse}:{statusComp:boolean | undefined;dataTrue:string,dataFalse:string})=>{
    const stateClass = statusComp ? 'containerServiceMailBox_trueState' : 'containerServiceMailBox_falseState';
    const statusClass = statusComp ? 'containerServiceMailBox_statusTrue' : 'containerServiceMailBox_statusFalse';
    const displayText = statusComp ? dataTrue : dataFalse;
        return (
            <div className={stateClass} >
                          {/* <span className={statusClass}></span> */}
                  <p>{displayText}</p>        
            </div>
        )
}
export default StateComponent