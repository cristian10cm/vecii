
import './index.css';

const PaymentAdmin = ({month, value, date, status , path}:{
    month:string, 
    value:string, 
    date:string,
    status:string
    path:string
}) => {

    return(
        <div className='container_paymentAdmin'>
            <div className='container_paymentAdmin_month'>
                <p className='paymentAdmin_month'>{month}</p>
                <p className='paymentAdmin_value'>{value}</p>
            </div>
            <div className='container_paymentAdmin_status'>
                <div className='paymentAdmin_status'>
                    <div className='paymentAdmin_status_div'></div>
                    <p className='paymentAdmin_status_description'>{status}</p>
                </div>
                <p className='paymentAdmin_date'>{date}</p>
            </div>
            <div className='container_paymentAdmin_arrow'>
                <img src="/assets/png/arrowPay.png"></img>
            </div>
        </div>
    )


}

export default PaymentAdmin