'use client'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import './index.css';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import { useInvoiceStore } from '@/components/stores/storeFactura';
import StateComponent from '@/components/interfaces/StateComponent/StateComponent';
const PagarAdministracion = () => {
    const factura = useInvoiceStore()
    const precio = factura.invoice?.status ?'container_payAdmin_info-precieTrue':'container_payAdmin_info-precieFalse';
    const fechaVencimiento = factura.invoice?.status ? 'Fecha de pago':'Fecha de vencimiento';
    const fecha = factura.invoice?.status ? 'container_payAdmin_info-dateTrue':'container_payAdmin_info-dateFalse'
    return(
        <>
            <VeciiHeader
                srcImg='/assets/svg/pago admin.svg'
                name='Pago Administración'
            />
            <div className='container_payAdmin'>
                <p className='container_payAdmin_month'>{factura.invoice?.monthService}</p>
                <div className='container_payAdmin_invoice'>
                   <div className='container_payAdmin_info'>
                        <div className='container_payAdmin_info-state'>
                            <p className='container_payAdmin_info-apto'>Torre 3 - 103</p>
                              <StateComponent
                            statusComp={factura.invoice?.status ? true : false}  
                            dataTrue="Pagado"
                            dataFalse="Sin pagar"
                        />
                        </div>
                        <div className='container_payAdmin_info-precie'>
                            <p>Valor de la deuda:</p>
                            <p className={precio}>{factura.invoice?.precieService}</p>
                        </div>
                        <div className='container_payAdmin_info-date'>
                            <p>{fechaVencimiento}</p>
                            <p className={fecha}>{factura.invoice?.dateService}</p>
                        </div>    
                   </div>
                </div>
            </div>
            <FooterFantasma/>
        </>
    )

}

export default PagarAdministracion;