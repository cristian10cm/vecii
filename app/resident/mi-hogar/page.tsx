'use client'
import './index.css'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import OptionInterface from "@/components/interfaces/OptionInterface/OptionsInterface";
import OptionPayAdmin from '@/components/interfaces/OptionPayAdmin/OptionPayAdmin';
import { useRef } from 'react';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import {gsap} from 'gsap';
import { useGSAP } from '@gsap/react';
const MiHogar = () => {
    const divSection = useRef<HTMLDivElement>(null)
    useGSAP(()=>{
           for(let i = 1;i<=4;i++){
             let res = '0.'+(i.toString())
             gsap.fromTo(`.option_interface_img_${i}`,{x: -20, opacity: 0, scale:0.2},{x: 0, opacity: 1,scale:1, delay:parseFloat(res) ,duration:0.7,ease: "elastic.inOut"})
           }
    },{scope:divSection}
    )
    return (
        <>

            <VeciiHeader 
                srcImg='/assets/svg/home.svg'
                name='Mi hogar'
                transparent = {false}
            />
            <div className='homeVecii_option_payAdmin' >
                <OptionPayAdmin />
            </div>
            <div className="grid_options_homeVecii-miHogar" ref = {divSection}>

                <OptionInterface
                    idImg='1'
                    srcImg="/assets/svg/Mis datos.svg"
                    name='Mis Datos'
                    pathUrl="/resident/mi-hogar/mis-datos"
                />
                <OptionInterface
                    idImg='2'
                    srcImg="/assets/svg/mis servicios.svg"
                    name='Mis servicios'
                    pathUrl="/resident/mi-hogar/mis-servicios"
                />
                <OptionInterface
                    idImg='3'
                    srcImg="/assets/svg/mis reservas.svg"
                    name='Mis Reservas'
                    pathUrl="/resident/mi-hogar/mis-reservas"
                />
                <div className='grid_option'>
                      <OptionInterface
                        idImg='4'
                         srcImg="/assets/svg/Ingreso.svg"
                        name='Mis visitas'
                        pathUrl="/resident/mi-hogar/mis-visitas"
                    />
                        <OptionInterface
                        idImg='4'
                         srcImg="/assets/svg/Pedidos.svg"
                        name='Mis pedidos'
                        pathUrl=""
                    />
                </div>
            </div>
            <FooterFantasma></FooterFantasma>
        </>
    )

};

export default MiHogar;