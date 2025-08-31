
'use client'
import './index.css';
import {AdvertaisingSwipper} from "@/components/interfaces/AdvertaisingSwipper/AdvertaisingSwiper";
import OptionInterface from "@/components/interfaces/OptionInterface/OptionsInterface";
import UserHeader from "@/components/interfaces/UserHeader/UserHeader";
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import {gsap} from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
const Inicio = () =>{
    const divRef = useRef<HTMLDivElement>(null)
    useGSAP(()=>{
            for(let i = 1;i<=6;i++){
                let res = '0.'+i.toString() 
                gsap.fromTo(`.option_interface_img_${i}`, { x: -20, opacity: 0, scale:0.2 }, { x: 0, opacity: 1,scale:1, delay:parseFloat(res) ,duration:0.7,ease: "elastic.inOut"});

            }
    },{scope:divRef})
    return(
        <>
            <UserHeader 
                srcImg="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                userName="Jose Manuel Rodriguez"
                complexName="Pimentos de madelena"
                deatilsComplex="Casa 38"
            />
            <AdvertaisingSwipper />
            <div className="grid_options_homeVecii" ref={divRef}>
                 {/* <OptionInterface
                    idImg = '1'
                    srcImg="/assets/svg/Buzon.svg"
                    name='Mi Hogar'
                    pathUrl="/resident/chatfalso"
                /> */}
                <OptionInterface
                    idImg = '1'
                    srcImg="/assets/svg/home.svg"
                    name='Mi Hogar'
                    pathUrl="/resident/mi-hogar"
                />
                 <OptionInterface
                    idImg = '2'
                    srcImg="/assets/svg/Buzon.svg"
                    name='Buzón'
                    pathUrl="/resident/buzon"
                />
                <OptionInterface
                    idImg = '3'
                    srcImg="/assets/svg/Ingreso.svg"
                    name='Ingreso'
                    pathUrl="/resident/ingreso"
                />
                <OptionInterface
                    idImg = '4'
                    srcImg="/assets/svg/zonas comunes.svg"
                    name='Zonas Comunes'
                    pathUrl="/resident/zonas-comunes"
                />
                 <OptionInterface
                    idImg = '5'
                    srcImg="/assets/svg/Pedidos.svg"
                    name='Pedidos'
                    pathUrl="/resident/pedidos"
                />
                <OptionInterface
                    idImg = '6'
                    srcImg="/assets/svg/PQR.svg"
                    name='PQR'
                    pathUrl="/resident/PQR"
                />
            </div>
            <FooterFantasma/>
        </>
    )
}

export default Inicio;