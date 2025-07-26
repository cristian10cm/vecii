'use client'
import PaymentAdmin from '@/components/interfaces/PaymentAdmin/PaymentAdmin';
import './index.css';
import VeciiHeaderImg from '@/components/interfaces/VeciiHeaderImg/VeciiHeaderImg';
import FooterFantasma from '@/components/interfaces/footerFantasma/FooterFantasma';
import OpcionBox from '@/components/interfaces/OpcionBox/OpcionBox';
import PaymentService from '@/components/interfaces/PaymentService/PaymentService';
const PagosAdministracion = () => {

    return(
        <>
            <VeciiHeaderImg
                srcImg='https://www.visa.com.sv/dam/VCOM/regional/lac/SPA/argentina/run-your-business/pymes/botones-links-pago-800x450.jpg'
                name="Pago administración"
                detail='Conjuntos pimientos de castilla'
            />
            <OpcionBox
                  nameBox1= 'Pagado'
                  nameBox2= 'Sin Pagar'
                  path1= '/resident/mi-hogar/pagos-administracion'
                  path2= '/resident/mi-hogar/pagos-administracion'
            
            />
            <div className='grid_admin_payment'>
            
            <PaymentService
                month='Junio'
                pathName='/resident/mi-hogar/pagos-administracion/pagar-admin'
                precie='52.000'
                statePayment={true}
                date='07/06/2025'
                contentTextFalse = 'Sin pagar'
                contentTextTrue =  'Pagado'
            
            /> 
                <PaymentService
                    month='Julio'
                    pathName='/resident/mi-hogar/pagos-administracion/pagar-admin'
                    precie='52.000'
                    statePayment={false}
                    date='07/06/2025'
                    contentTextFalse = 'Sin pagar'
                    contentTextTrue =  'Pagado'
                /> 
                  <PaymentService
                    month='Junio'
                     pathName='/resident/mi-hogar/pagos-administracion/pagar-admin'
                    precie='52.000'
                    statePayment={false}
                    date='07/06/2025'
                    contentTextFalse = 'Sin pagar'
                    contentTextTrue =  'Pagado'
                />
                  <PaymentService
                    month='Mayo'
                    pathName='/resident/mi-hogar/pagos-administracion/pagar-admin'
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

};

export default PagosAdministracion;