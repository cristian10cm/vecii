"use client";
import './index.css';
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import ObjectEntryExit from '@/components/interfaces/ObjectEntryExit/ObjectEntryExit';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
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
          <FooterFantasma/>  
        </>
        
    )

}

export default inComeObject;