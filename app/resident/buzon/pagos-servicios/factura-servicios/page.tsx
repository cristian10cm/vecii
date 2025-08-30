'use client'
import './index.css'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import {useServiceAuth} from '@/components/stores/storeServicios';
import { useInvoiceStore } from '@/components/stores/storeFactura';
import StateComponent from '@/components/interfaces/StateComponent/StateComponent';
const facturaServicios = ()=>{
    const service = useServiceAuth()
    const invoices = useInvoiceStore()
    return(
        <>
            <VeciiHeader 
             name= {service.services?.servicio || 'servicio no encontrado'}
             srcImg={service.services?.imgSrcServices || 'Imagen no encontrada'}
             transparent = {false}
            />
            <div className='ContainerInvoicePayment'>
                  <p className='InvoiceMonth'>{invoices.invoice?.monthService}</p>
            <div className='ContainerInvoice'>
                   <div className='ContainerInvoice_items'>
                        <div className='ContainerInvoice_Info'>
                            <p className='ContainerInvoice_apto'>Torre 3 - 103</p>
                              <StateComponent
                            statusComp={invoices.invoice?.status ? true : false}  
                            dataTrue="Pagado"
                            dataFalse="Sin pagar"
                        />
                        </div>
                        <div className='ContainerInvoice_precie'>
                            <p>Valor de la deuda:</p>
                            <p className={invoices.invoice?.status ?'ContainerInvoice_valueInvoice':'ContainerInvoice_valueInvoiceFalse'}>{invoices.invoice?.precieService}</p>
                        </div>
                        <div className='ContainerInvoice_infoDate'>
                            <p>{invoices.invoice?.status ? 'Fecha de pago':'Fecha de vencimiento'}</p>
                            <p className={invoices.invoice?.status ? 'ContainerInvoice_date':'ContainerInvoice_dateFalse'}>{invoices.invoice?.dateService}</p>
                        </div>    
                   </div>
            </div>
            </div>
        </>
    )
}
export default facturaServicios