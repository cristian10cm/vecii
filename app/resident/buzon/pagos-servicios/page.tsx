'use client'
import './index.css';
import UserHeader  from '@/components/interfaces/UserHeader/UserHeader';
import VeciiHeader from '@/components/interfaces/VeciiHeader/VeciiHeader';
import {useServiceAuth} from '@/components/stores/storeServicios';
import PaymentService from '@/components/interfaces/PaymentService/PaymentService';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
const PagosServicios = ()=>{
    const service = useServiceAuth();
    return(
        <>
        <VeciiHeader
                srcImg={service.services?.imgSrcServices || 'Imagen no encontrada'}
                 name={service.services?.servicio || 'No existe el servicio'}

        />
        <div className='containerPayServices'>
            <PaymentService
                month='Septiembre'
                precie='75.000'
                statePayment={false}
                date='07/09/2025'
                contentTextFalse = 'Sin pagar'
                contentTextTrue =  'Pagado'
                pathName='/resident/buzon/pagos-servicios/factura-servicios/'
            
            />
             <PaymentService
                month='Agosto'
                precie='80.000'
                statePayment={false}
                date='07/08/2025'
                contentTextFalse = 'Sin pagar'
                contentTextTrue =  'Pagado'
                pathName='/resident/buzon/pagos-servicios/factura-servicios/'
            />
            <PaymentService
                month='Julio'
                precie='120.000'
                statePayment={true}
                pathName='/resident/buzon/pagos-servicios/factura-servicios/'
                date='08/07/2025'
                contentTextFalse = 'Sin pagar'
                contentTextTrue =  'Pagado'
            
            />
            <PaymentService
                month='Mayo'
                pathName='/resident/buzon/pagos-servicios/factura-servicios/'
                precie='78.000'
                statePayment={false}
                date='07/06/2025'
                contentTextFalse = 'Sin pagar'
                contentTextTrue =  'Pagado'
            
            />
            <PaymentService
                month='Junio'
                pathName='/resident/buzon/pagos-servicios/factura-servicios/'
                precie='52.000'
                statePayment={true}
                date='07/06/2025'
                contentTextFalse = 'Sin pagar'
                contentTextTrue =  'Pagado'
            
            />   
        </div>
        <FooterFantasma/>
        </>
    )
}
export default PagosServicios