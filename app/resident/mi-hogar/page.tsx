'use client'
import './index.css'
import UserHeader from "@/components/interfaces/UserHeader/UserHeader";
import OptionInterface from "@/components/interfaces/OptionInterface/OptionsInterface";
import OptionPayAdmin from '@/components/interfaces/OptionPayAdmin/OptionPayAdmin';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import { useRef } from 'react';
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

            <UserHeader
                srcImg="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                userName="Jose Manuel Rodriguez"
                complexName="Pimentos de madelena"
                deatilsComplex="Casa 38"
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
                </div>
            </div>
            <FooterFantasma/>
        </>
    )

};

export default MiHogar;