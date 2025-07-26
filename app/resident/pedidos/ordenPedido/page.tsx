'use client'
import './index.css';
import { useOrderFood } from '@/components/stores/storePedido';
import BackArrow from '@/components/interfaces/VeciiHeader/subComponents/BackArrow/BackArrow';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import InputChat from '@/components/interfaces/inputChat/InputChat';
const ordenPedido = ()=>{
    const dataOrder = useOrderFood()
    return(
        <>
            <div className='container_orderFood_Head'>
                <BackArrow></BackArrow>
                <img src={dataOrder.information?.imgStoreFood} className='container_orderFood_Head_img' alt="Icono store" />
                <div className='container_orderFood_Head_info'>
                    <p className='container_orderFood_Head_title'>
                        {dataOrder.information?.nameFoodStore}
                    </p>
                    <p className='container_orderFood_Head_grade'>
                       <span>⭐</span>{dataOrder.information?.gradeStoreFood}
                    </p>
                </div>
            </div>
            <div className='container_orderFood_chat'>
                <div className='container_orderFood_chat_conversation'></div>
                <InputChat></InputChat>
            </div>
            <FooterFantasma></FooterFantasma>
        </>
    )

}
export default ordenPedido