
import './index.css';
import StateComponent from '../StateComponent/StateComponent';
const Reservations = ({ title, hour ,  date , status }:{ 
    title:string, 
    hour:string, 
    date:string, 
    status:boolean 
}) => {

    return(
        <div className='containerReservation'>
            <h2 className='containerReservation_title'>{title}</h2>
            <p className='containerReservation_hour'>{hour}</p>
            <p className='containerReservation_date'>{date}</p>
            <StateComponent
                statusComp= {status}
                dataTrue= 'reservado'
                dataFalse= 'No reservado'
            />
        </div>
    );

};

export default Reservations;