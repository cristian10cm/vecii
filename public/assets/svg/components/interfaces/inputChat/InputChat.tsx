'use client'
import './index.css'
import { VscSend } from "react-icons/vsc";
const InputChat = ()=>{
    return(
        <div className='container_inpuChat'>
            <button className='container_inpuChat_send'><VscSend/></button>
            <input className='container_inpuChat_chat' placeholder='Pide acá' type="text" />
        </div>
    )
}
export default InputChat