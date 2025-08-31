'use client'
import './index.css';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import {useServiceAuth} from '@/components/stores/storeServicios';
import { setHousing } from '@/components/stores/StoreHousing';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import StateComponent from '@/components/interfaces/StateComponent/StateComponent';
import IconSvgGradient from '@/components/interfaces/IconSvgGradient/IconSvgGradient';
const PagosServicios = ()=>{
    const service = useServiceAuth().services;
    const housingName = setHousing().information?.location
    const stateService = service?.state ? `containerPayServices_state_true`: `containerPayServices_state_false`
    return(
        <>
            <VeciiHeaderImg
                srcImg='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvNZVE68kVo2kW_kB5LIeZyRFGUneucdFPCg&s'
                name='Buzón'
                detail={`${housingName?.unit.name} ${housingName?.housing.name}`}
            />
        <div className='containerPayServices'>
            <h2 className='containerPayServices_title'>{service?.servicio || 'Cargando..'}</h2>
            <div className='containerPayServices_line'> </div>
            <img className='containerPayServices_img' src={service?.imgSrcServices} alt="Imagen del servicios" />
            <div className='containerPayServices_info'>
                <p className='containerPayServices_info_date'>Fecha de registro: <span>{service?.date}</span></p>
                <StateComponent  dataTrue='Recogido' dataFalse='No recogido' statusComp={service?.pickUp}/>
            </div>
            <div className='containerPayServices_line'></div>
            <div className='containerPayServices_state'>
                <p>Estado: <span className={stateService}>{service?.state? 'Pagado':'Sin pagar'}</span></p>
            </div>
            {
                !service?.state ?
                    <div className='containerPayServices_btn'>
                        <div className='containerPayServices_option'>
                                <IconSvgGradient
                                    urlImage='/assets/svg/hand-coins.svg'
                                    widthImg='clamp(28px,9.5vw,45px)'
                                />
                                <button >
                                    <a href="https://pagos.acueducto.com.co/" target='blank'>Pagar recibo</a>
                                </button>
                        </div>
                        <div className='containerPayServices_option'>
                                <IconSvgGradient
                                    urlImage='/assets/svg/box-arrow-up.svg'
                                     widthImg='clamp(28px,9.5vw,45px)'
                                />
                            <button className='containerPayServices_option_pay'>
                                Guardar recibo
                            </button>
                        </div>
                    </div> 
                :
                    <div className='containerPayServices_btn'>
                        <div className='containerPayServices_option'>
                                <IconSvgGradient
                                    urlImage='/assets/svg/receipt.svg'
                                     widthImg='clamp(28px,9.5vw,45px)'
                                />
                            <button>
                                Ver recibo
                            </button>
                        </div>
                    </div> 
            }
            </div>
        <FooterFantasma/>
        </>
    )
}
export default PagosServicios