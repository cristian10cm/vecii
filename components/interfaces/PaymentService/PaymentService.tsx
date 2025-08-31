import { verify } from 'crypto';
import './index.css';
import { toast } from 'react-toastify';
import GoTo from '@/components/logics/GoTo';
import {useInvoiceStore} from '@/components/stores/storeFactura'
import StateComponent from '@/components/interfaces/StateComponent/StateComponent'
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
const PaymentService =({month,precie,statePayment,date,contentTextTrue,contentTextFalse,pathName}:{month:string,precie:string,statePayment:boolean,date:string,contentTextTrue:string,contentTextFalse:string,pathName:string})=>{
    const goToPath = GoTo()
    const {setInvoice} = useInvoiceStore();
    const goToPayment = ()=>{
            setInvoice({
                status: statePayment,
                monthService:month,
                precieService: precie,
                dateService: date
            })
            goToPath({path:pathName})
    }
    
    const toMonth = (date:string):string | undefined=>{
   const month  = Number(date.split('-')[1]) 
    return meses.meses[month]
    }
    return(
        <div className='ContainerPaymentsServices'>
            <div className='ContainerPaymentServices_items'>
                <div className='ContainerPaymentServices_info'>
                        <p className='ContainerPaymentServices_month'>{toMonth(month) || 'Factura no encontrada'}</p>
                        <p className={statePayment?'ContainerPaymentServices_precie':'ContainerPaymentServices_precieFalse'}>${precie}</p>
                </div>
                <div className='ContainerPaymentServices_paymentState'>
                         <StateComponent
                            statusComp={statePayment}  
                            dataTrue={contentTextTrue}
                            dataFalse={contentTextFalse}
                        />
                        <p className='containerServiceMailBox_date'>{date}</p>
                </div>
            </div>
            <img src='/assets/svg/arrowIcon.svg' className='ContainerPaymentsServices_continue' onClick={goToPayment}/>
        </div>
    )
}
export default PaymentService