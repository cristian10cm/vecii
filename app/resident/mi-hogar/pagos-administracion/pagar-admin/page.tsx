'use client'
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import './index.css';
import { useInvoiceStore } from '@/components/stores/storeFactura';
import StateComponent from '@/components/interfaces/StateComponent/StateComponent';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
interface months  {
    meses: Partial<Record <number,string>>
}
const meses:months ={
meses : {      
  1: 'Enero',
  2: 'Febrero',
  3: 'Marzo',
  4: 'Abril',
  5: 'Mayo',
  6: 'Junio',
  7: 'Julio',
  8: 'Agosto',
  9: 'Septiembre',
  10: 'Octubre',
  11: 'Noviembre',
  12: 'Diciembre'
}};
const PagarAdministracion = () => {
    const factura = useInvoiceStore()
    const precio = factura.invoice?.status ?'container_payAdmin_info-precieTrue':'container_payAdmin_info-precieFalse';
    const fechaVencimiento = factura.invoice?.status ? 'Fecha de pago':'Fecha de vencimiento';
    const fecha = factura.invoice?.status ? 'container_payAdmin_info-dateTrue':'container_payAdmin_info-dateFalse'
     const toMonth = (date:string):string | undefined=>{
            const month  = Number(date.split('-')[1]) 
            return meses.meses[month]
    }
    const monthPaid = toMonth(factura.invoice?.monthService || '')
    return(
        <>
            <VeciiHeader
                srcImg='/assets/svg/pago admin.svg'
                name='Pago Administración'
                transparent={false}
            />
            <div className='container_payAdmin'>
                <p className='container_payAdmin_month'>{monthPaid}</p>
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