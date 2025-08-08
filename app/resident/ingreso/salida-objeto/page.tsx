"use client";
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import './index.css';
import ObjectEntryExit from '@/components/interfaces/ObjectEntryExit/ObjectEntryExit';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';

const outObjetc = () => {


    return (
        <>
            <VeciiHeader
                srcImg='/assets/svg/ingreso objeto.svg'
                name='Registro de salida'
                transparent={true}
            />
            <ObjectEntryExit
                typeRegister='Salida'
            
            />

            <FooterFantasma/>
        </>
    )

}

export default outObjetc;