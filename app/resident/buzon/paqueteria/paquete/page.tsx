'use client'
import './index.css'
import {useInvoiceStore} from '@/components/stores/storeFactura';
import StateComponent from '@/components/interfaces/StateComponent/StateComponent';
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
const Paquete = ()=>{
    const dataPackage = useInvoiceStore();
    const classLetter = dataPackage.invoice?.status ? 'container_package_info-true':'container_package_info-false'
    return(
        <>
            <VeciiHeader
                srcImg='/assets/png/packageIcono.png'
                name='Paquete'
            />
            <div className='container_package'>
                    <p className='container_package_title'>
                        {dataPackage.invoice?.monthService}
                    </p>
                    <img className='container_package_img' src="/assets/png/escritorioPackage.jpg" alt="imagen del paquete" />
                    <div className='container_package_info'>
                        <div className='container_package_info-state'>
                            <p>Torre 3-103</p>
                            <StateComponent
                                statusComp= {dataPackage.invoice?.status ? true : false}
                                dataTrue  = 'Recibido'
                                dataFalse = 'Sin recibir'
                            
                            />
                        </div>
                        <div className='container_package_info-precie'>
                            <p>Valor del paquete:</p>
                            <p className={classLetter}>{dataPackage.invoice?.precieService}</p>
                        </div>
                        <div className='container_package_info-date'>
                            <p>Fecha de entrega:</p>
                            <p className={classLetter}>{dataPackage.invoice?.dateService}</p>
                        </div>
                    </div>
            </div>
            <FooterFantasma/>
        </>
    )
}
export default Paquete