"use client";
import './index.css';
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import ObjectEntryExit from '@/components/interfaces/ObjectEntryExit/ObjectEntryExit';

const inComeObject = () => {
   
    return (
        <>
            <VeciiHeader
                srcImg='/assets/svg/ingreso objeto.svg'
                name='Nuevo ingreso'
                transparent={true}
            />
            <ObjectEntryExit
                typeRegister='Entrada'
            />
            
        </>
    )

}

export default inComeObject;